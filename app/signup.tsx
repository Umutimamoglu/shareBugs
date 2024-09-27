import { Pressable, View } from 'react-native';
import React from 'react';
import { registerUser } from '@/service/api';
import axios from 'axios';
import Button from '@/src/shared/button';
import Input from '@/src/shared/input';
import { Text } from '@/utils/theme';
import { Controller, useForm } from 'react-hook-form';
import { router } from 'expo-router';

interface IUser {
    name: string;
    email: string;
    password: string;
}

const SingUpScreen = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<IUser>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: IUser) => {
        try {
            const { email, name, password } = data;
            console.log('Registering user:', { email, name, password });
            await registerUser({ email, name, password });
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error in onSubmit:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error in onSubmit:', error);
            }
        }
    }

    return (

        <View style={{ flex: 1, paddingHorizontal: 22, backgroundColor: "#D8D0D0" }}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ marginLeft: 52, justifyContent: "center" }}>
                    <Text fontSize={17} fontWeight="500">
                        Set Up your account
                    </Text>
                </View>
            </View>

            <View style={{ marginBottom: 24 }} />

            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                rules={{ required: 'Name is required' }}
            />

            <View style={{ marginBottom: 24 }} />

            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Email"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                rules={{ required: 'Email is required' }}
            />

            <View style={{ marginBottom: 24 }} />

            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                    />
                )}
                rules={{ required: 'Password is required' }}
            />

            <View style={{ marginTop: 22 }} />

            <Pressable onPress={() => router.push('/login')}>
                <Text textAlign='right' color="red500">
                    Zaten bir hesabınız var mı?
                </Text>
            </Pressable>

            <View style={{ marginTop: 48, marginLeft: 40 }}>
                <Button label='Kayıt Ol' onPress={handleSubmit(onSubmit)} uppercase />
            </View>
        </View>

    );
};

export default SingUpScreen;
