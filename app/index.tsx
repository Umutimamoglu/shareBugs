import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { useGlobalStore } from '@/store/useUserGlobalStore';
import { Text } from '@/utils/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
    const { isLoggedIn, user, updateUser, logout } = useGlobalStore();
    const [redirectPath, setRedirectPath] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkUserLogin = async () => {
            try {
                console.log("Kullanıcı bilgileri kontrol ediliyor...");

                const storedUser = await AsyncStorage.getItem('user');
                console.log("Depolanan kullanıcı verisi:", storedUser);

                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    console.log("Çözümlenmiş kullanıcı verisi:", parsedUser);

                    updateUser(parsedUser); // Kullanıcıyı güncelle
                    setRedirectPath('/auth/(tabs)/home'); // Yönlendirme yap
                } else {
                    console.log("Kullanıcı depolanmamış, welcome sayfasına yönlendiriliyor.");
                    logout();
                    setRedirectPath('/welcome');
                }
            } catch (error) {
                console.error('Kullanıcı bilgileri yüklenirken bir hata oluştu:', error);
                setRedirectPath('/welcome');
            } finally {
                setIsLoading(false);
            }
        };

        checkUserLogin();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            console.log("isLoggedIn durumu:", isLoggedIn);
            console.log("Kullanıcı verisi:", user);

            if (isLoggedIn && user) {
                console.log('Giriş yapan kullanıcı:', user);
                setRedirectPath('/auth/(tabs)/home');
            } else {
                console.log("Kullanıcı giriş yapmamış, welcome sayfasına yönlendiriliyor.");
                setRedirectPath('/welcome');
            }
        }
    }, [isLoggedIn, user, isLoading]);

    if (isLoading) {
        return <Text>Yükleniyor...</Text>;
    }

    // redirectPath'e göre yönlendirme yap
    if (redirectPath) {
        return <Redirect href={redirectPath as any} />;
    }

    return null;
};

export default Index;
