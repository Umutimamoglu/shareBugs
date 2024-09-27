
import { IUser } from "@/types";

import { AxiosError } from "axios";
import axiosInstance, { BLOSSOM_TOKEN_NAME, saveToken } from "./config";

type RegisterUserTypes = IUser;

export const registerUser = async ({
    email,
    name,
    password,
}: RegisterUserTypes) => {
    try {
        const response = await axiosInstance.post("/users/create", {
            email,
            password,
            name,
        });
        return response.data.user;
    } catch (error) {
        if (error instanceof AxiosError) {


        } else {
            console.log("unexpected error:", error);
        }
        throw error;
    }
};

type LoginUserTypes = Omit<IUser, "name">;
export const loginUser = async ({ email, password }: LoginUserTypes) => {
    console.log("Login data:", { email, password }); // E-postayı ve şifreyi kontrol edin
    try {
        const response = await axiosInstance.post("/users/login", {
            email,
            password,
        });

        const _token = response.data.token;
        axiosInstance.defaults.headers.common["Authorization"] = _token;
        await saveToken(BLOSSOM_TOKEN_NAME, _token);
        return response.data.user;
    } catch (error) {
        if (error instanceof AxiosError) {

        } else {
            console.log("unexpected error:", error);
        }
        throw error;
    }
};