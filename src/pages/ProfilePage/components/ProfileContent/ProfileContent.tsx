import { SkeletonProfileContent } from "@/components/SkeletonProfileContent/SkeletonProfileContent";
import s from "./style.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUpdateProfile } from "@/store/slices/profileSlice";
import { useState, useEffect } from "react";

export const ProfileContent = () => {
    const dispatch = useAppDispatch();
    const { profile, loading } = useAppSelector((state) => state.profile);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || "",
                email: profile.email || "",
            });
        }
    }, [profile]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(
                fetchUpdateProfile({
                    name: formData.name,
                    email: formData.email,
                    avatar: profile?.avatar || "",
                    is_company: profile?.is_company || false,
                })
            ).unwrap();
            alert("Профиль успешно обновлен");
        } catch (error) {
            console.error("Ошибка при обновлении профиля:", error);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className={s.wrapper}>
            {loading ? (
                <SkeletonProfileContent />
            ) : (
                <div className={s.tabContent}>
                    <h2>Личная информация</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={s.formGroup}>
                            <label>Имя</label>
                            <input
                                type="text"
                                className={s.input}
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                            />
                        </div>
                        <div className={s.formGroup}>
                            <label>Email</label>
                            <input
                                type="email"
                                className={s.input}
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                        </div>
                        <button className={s.saveButton} type="submit" disabled={loading}>
                            {loading ? "Сохранение..." : "Сохранить изменения"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};
