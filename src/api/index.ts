import type {
    ILoginData,
    IProfileUpdate,
    IProfileUpdatePassword,
    IResetPassword,
    ISetPassword,
    ISignUpEmail,
    IVerifyCode,
} from "@/store/types";
import instance from "./axiosInstance";

export const storesApi = {
    login(data: ILoginData) {
        return instance.post(`/users/signin/`, data);
    },
    signUp(data: ISignUpEmail) {
        return instance.post(`/users/signup/`, data);
    },
    verifyCode(data: IVerifyCode) {
        return instance.patch(`/users/verify-email/`, data);
    },
    setPassword(data: ISetPassword) {
        return instance.patch(`/users/set-password/`, data);
    },

    forgotPassword(data: ISignUpEmail) {
        return instance.post(`/users/forgot-password/`, data);
    },
    resetPassword(data: IResetPassword) {
        return instance.post(`/users/reset-password/`, data);
    },
    refreshToken: (refreshToken: string) => {
        return instance.post("/users/token/refresh/", {
            refresh: refreshToken,
        });
    },
    getProfile() {
        return instance.get(`/users/profile/`);
    },
    updateProfile(data: IProfileUpdate | { email: string }) {
        return instance.patch(`/users/profile/`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    updateNewEmail(data: { code: string }) {
        return instance.post(`/users/confirm-new-email/`, data);
    },

    updateProfilePassword(data: IProfileUpdatePassword) {
        return instance.put(`/users/change-password/`, data);
    },

    deleteProfile() {
        return instance.delete(`/users/profile/`);
    },
};
