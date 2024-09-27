import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAuthenticatedUser } from '@/types';

export interface GlobalState {
    isLoggedIn: boolean;
    user: IAuthenticatedUser | null;
    login: () => void;
    logout: () => void;
    updateUser: (user: IAuthenticatedUser) => void;
}

export const useGlobalStore = create<GlobalState>()(
    persist(
        (set) => ({
            // Kullanıcı giriş durumu
            isLoggedIn: false,
            user: null, // Kullanıcı bilgileri
            login: () => {
                set({ isLoggedIn: true });
            },
            logout: async () => {
                await AsyncStorage.removeItem('user'); // AsyncStorage'dan kullanıcıyı kaldır
                set({ isLoggedIn: false, user: null }); // Çıkış yaparken kullanıcı bilgilerini temizle
            },
            updateUser: async (user) => {
                await AsyncStorage.setItem('user', JSON.stringify(user)); // Kullanıcıyı AsyncStorage'a kaydet
                set({ user, isLoggedIn: true }); // Kullanıcı bilgilerini güncelle ve giriş yapıldı olarak ayarla
            },
        }),
        {
            name: 'global-store',
            storage: createJSONStorage(() => AsyncStorage), // AsyncStorage kullanımı
        }
    )
);
