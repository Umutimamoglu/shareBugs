
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import SafeAreaWraper from '@/src/shared/safe-area-wrapper';
import { Text } from '@/utils/theme';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import Button from '@/src/shared/button';

const WelcomeScreen = () => {
    const router = useRouter();

    return (
        <SafeAreaWraper>
            <View style={{ flex: 1 }}>


                <View style={{ flex: 1, backgroundColor: "#F34147" }}>
                    <View style={{ marginTop: 13, alignItems: 'center' }}>
                        <MaterialIcons align name="error-outline" size={120} color="white" />
                    </View>

                    <View
                        style={{
                            borderRadius: 30, // rounded-7xl yerine direkt 30 veriyorum
                            marginTop: 180,
                            width: 395,
                            height: 500,
                            backgroundColor: "#D8D0D0", // zinc400 renk koduna göre
                        }}
                    >
                        <View style={{ flex: 6, marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text fontSize={20} fontWeight="500">
                                Let Fix in Your
                            </Text>
                            <Text fontSize={20} fontWeight="500">
                                Bug’s
                            </Text>
                            <View>
                                <AntDesign name="check" size={30} color="green" />
                            </View>
                            <View>
                                <Button
                                    label='Go'
                                    onPress={() => router.push('/signup')}
                                />
                            </View>
                        </View>


                    </View>
                </View>
            </View>
        </SafeAreaWraper>
    );
};

export default WelcomeScreen;
