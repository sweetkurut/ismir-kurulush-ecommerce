import s from "./style.module.scss";
import check from "@/shared/assets/icons/checkicon.svg";
import dollar from "@/shared/assets/icons/dollar.svg";
import time from "@/shared/assets/icons/time.svg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCreateOrdersReq } from "@/store/slices/orderRequestSlice";
import { fetchGetServiceDetail } from "@/store/slices/serviceSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const DetailService = () => {
    const { id } = useParams();

    console.log("Service ID:", id);
    const dispatch = useAppDispatch();
    const { detail } = useAppSelector((s) => s.service);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        comment: "",
        agree: false,
        request_type: "service",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.agree) {
            toast.warn("Подтвердите согласие.");
            return;
        }

        const body = {
            name: form.name,
            request_type: "Услуга",
            email: form.email,
            phone: form.phone,
            comment: form.comment,
            cart: null,
            service: Number(id),
        };

        try {
            await dispatch(fetchCreateOrdersReq(body));
            toast.success("Заявка отправлена!");
            setForm({
                name: "",
                phone: "",
                email: "",
                comment: "",
                agree: false,
                request_type: "Услуга",
            });
        } catch (e) {
            toast.error("Ошибка при отправке");
        }
    };

    useEffect(() => {
        if (id) dispatch(fetchGetServiceDetail(Number(id)));
    }, [id, dispatch]);

    return (
        <>
            <div className={s.banner}>
                <h2 className={s.main_title}>{detail?.name}</h2>
                <p className={s.main_desc}>{detail?.description}</p>
            </div>

            <div className={s.wrapper}>
                <div className={s.container}>
                    <div className={s.mainContent}>
                        <div className={s.section}>
                            <h2 className={s.sectionTitle}>Описание</h2>
                            <p className={s.descriptionText}>{detail?.description}</p>
                        </div>

                        <div className={s.section}>
                            <h2 className={s.sectionTitle}>Возможности</h2>
                            <ul className={s.list}>
                                {detail?.possibilities.map((item) => (
                                    <li key={item.id} className={s.listItem}>
                                        <img
                                            src={check}
                                            className={s.checkIcon}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={s.section}>
                            <h2 className={s.sectionTitle}>Преимущества</h2>
                            <ul className={s.list}>
                                {detail?.advantages.map((item) => (
                                    <li key={item.id} className={s.listItem}>
                                        <img
                                            src={check}
                                            className={s.checkIcon}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={s.section}>
                            <h2 className={s.sectionTitle}>Процесс работы</h2>
                            <ul className={s.processList}>
                                {detail?.work_process.map((item) => (
                                    <li key={item.id} className={s.processItem}>
                                        <span className={s.processStep}>{item.step_number}</span>
                                        {item.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={s.sidebar}>
                        <form className={s.consultationForm} onSubmit={handleSubmit}>
                            <div className={s.costBlock}>
                                <div className={s.costItem}>
                                    <img
                                        src={dollar}
                                        alt="Dollar Icon"
                                        className={s.costItemIcon}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    Стоимость <span className={s.value}>{detail?.price}</span>
                                </div>
                                <div className={s.costItem}>
                                    <img
                                        src={time}
                                        alt="Time Icon"
                                        className={s.costItemIcon}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    Срок выполнения <span className={s.value}>{detail?.term}</span>
                                </div>
                            </div>

                            <div className={s.formGroup}>
                                <label className={s.formLabel}>Имя *</label>
                                <input
                                    type="text"
                                    className={s.formInput}
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={s.formGroup}>
                                <label className={s.formLabel}>Телефон *</label>
                                <input
                                    type="tel"
                                    className={s.formInput}
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={s.formGroup}>
                                <label className={s.formLabel}>Email</label>
                                <input
                                    type="email"
                                    className={s.formInput}
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>

                            <div className={s.formGroup}>
                                <label className={s.formLabel}>Сообщение *</label>
                                <textarea
                                    className={s.formTextarea}
                                    value={form.comment}
                                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                                    required
                                />
                            </div>

                            <label className={s.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    className={s.checkboxInput}
                                    checked={form.agree}
                                    onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                                />
                                Я согласен на обработку персональных данных
                            </label>

                            <button type="submit" className={s.submitButton}>
                                Получить консультацию
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailService;
