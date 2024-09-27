import React, { useState } from 'react';
import { Pressable, TextInput, StyleSheet, View, Text, Image } from 'react-native';
import useSWRMutation from 'swr/mutation';
import { MaterialIcons } from '@expo/vector-icons';
import axiosInstance, { BASE_URL } from '@/service/config';
import { CreateError, IColor } from '@/types';
import { CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Button from '@/src/shared/button';
import { useSWRConfig } from 'swr';
import { getColors } from '@/utils/heplers';

const COLORS = getColors();

const PROGRAMMING_LANGUAGES = [
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'Python' },
    { id: 3, name: 'Java' },
    { id: 4, name: 'C#' },
    { id: 5, name: 'C++' },
];

const ERROR_TYPES = [
    { id: 1, name: 'Compilation Errors' },
    { id: 2, name: 'Runtime Errors' },
    { id: 3, name: 'Arithmetic Errors' },
    { id: 4, name: 'Resource Errors' },
    { id: 5, name: 'Code Smells' },
    { id: 6, name: 'Golden Hammer' },
    { id: 7, name: 'Analysis Paralysis' }
];

const CreateErrorRequest = async (url: string, { arg }: { arg: FormData }) => {
    try {
        const response = await axiosInstance.post(url, arg, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

function HomeScreen() {
    const [selectedLanguage, setSelectedLanguage] = useState(PROGRAMMING_LANGUAGES[0].name);
    const [selectedErrorType, setSelectedErrorType] = useState(ERROR_TYPES[0].name);
    const [image, setImage] = useState<string>('');
    const { trigger } = useSWRMutation('api/errors/create', CreateErrorRequest);
    const { mutate } = useSWRConfig();
    const [newError, setNewError] = useState<CreateError>({
        name: '',
        color: COLORS[0].name,
        language: selectedLanguage,
        isFixed: false,
        image: undefined,
        type: selectedErrorType,
    });

    const createNewError = async () => {
        try {
            const formData = new FormData();
            formData.append('name', newError.name);
            formData.append('color', newError.color);
            formData.append('isFixed', newError.isFixed.toString());
            formData.append('language', newError.language);
            formData.append('type', newError.type);
            if (image) {
                formData.append('image', {
                    uri: image,
                    name: 'photo.jpg',
                    type: 'image/jpeg'
                } as any);
            }

            await trigger(formData);
            await mutate(BASE_URL + 'api/errors/create');
        } catch (error) {
            console.error('Error creating new error:', error);
        }
    };

    const selectImageFromLibrary = async () => {
        const options: ImageLibraryOptions = { mediaType: 'photo', quality: 1 };
        launchImageLibrary(options, (response) => {
            if (response.assets) {
                const source = response.assets[0]?.uri || '';
                setImage(source);
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Yeni hata ekle!!!</Text>

            <View style={styles.imagePickerContainer}>
                <Pressable onPress={selectImageFromLibrary} style={styles.imagePickerButton}>
                    <MaterialIcons name="photo-library" size={24} color="black" />
                    <Text style={styles.imagePickerText}>Galeri</Text>
                </Pressable>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={selectedLanguage}
                    editable={false}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={selectedErrorType}
                    editable={false}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Hatanıza isim verin"
                    placeholderTextColor="#a3a3a3"
                    value={newError.name}
                    onChangeText={(text) => setNewError((prev) => ({ ...prev, name: text }))}
                />
            </View>

            <View style={styles.colorPickerContainer}>
                <View style={styles.colorLabel}>
                    <Text style={styles.colorLabelText}>Colors</Text>
                </View>
                <View style={styles.colors}>
                    {COLORS.map((_color: IColor) => (
                        <Pressable key={_color.id} onPress={() => setNewError((prev) => ({ ...prev, color: _color.name }))}>
                            <View
                                style={[
                                    styles.colorCircle,
                                    { backgroundColor: _color.code }
                                ]}
                            />
                        </Pressable>
                    ))}
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Button label="Hata Ekle" onPress={createNewError} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 140,
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 16,
        fontWeight: 'bold',
    },
    imagePickerContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    imagePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#d3d3d3',
        borderRadius: 5,
    },
    imagePickerText: {
        marginLeft: 8,
    },
    inputContainer: {
        backgroundColor: '#f5f5f5',
        padding: 8,
        borderRadius: 8,
        marginBottom: 16,
    },
    input: {
        fontSize: 16,
        padding: 8,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        borderRadius: 5,
    },
    colorPickerContainer: {
        padding: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        marginBottom: 16,
    },
    colorLabel: {
        backgroundColor: '#34c759',
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 4,
        alignSelf: 'flex-start',
    },
    colorLabelText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    colors: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 8,
    },
    colorCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
});

export default HomeScreen;
