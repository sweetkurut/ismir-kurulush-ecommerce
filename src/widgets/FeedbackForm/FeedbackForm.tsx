import { useState } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import s from "./style.module.scss";
import phone from "@/shared/assets/icons/phone.svg";
import mail from "@/shared/assets/icons/mail.svg";
import message from "@/shared/assets/icons/messageicon.svg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCreateOrdersReq } from "@/store/slices/orderRequestSlice";
import { FormGroup } from "@/components/FormGroup/FormGroup";

interface FormData {
    name: string;
    phone: string;
    comment: string;
}

export const FeedbackForm = () => {
    const [agreed, setAgreed] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        phone: "",
        comment: "",
    });

    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.orderRequest);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!agreed) {
            alert("Пожалуйста, согласитесь на обработку персональных данных.");
            return;
        }

        if (!formData.name.trim() || !formData.phone.trim() || !formData.comment.trim()) {
            alert("Пожалуйста, заполните все обязательные поля.");
            return;
        }

        try {
            await dispatch(
                fetchCreateOrdersReq({
                    name: formData.name.trim(),
                    phone: formData.phone.trim(),
                    comment: formData.comment.trim(),
                })
            ).unwrap();

            alert("Заявка успешно отправлена!");

            setFormData({
                name: "",
                phone: "",
                comment: "",
            });
            setAgreed(false);
        } catch (error) {
            console.error("Ошибка при отправке заявки:", error);
            alert("Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.");
        }
    };

    return (
        <div className={s.feedback_form_wrapper}>
            <div className={s.cards}>
                <div className={s.card}>
                    <div className={s.icon_wrap}>
                        <img src={phone} alt="icon" className={s.img_icon} />
                    </div>
                    <div className={s.card_desc}>
                        <h4 className={s.card_title}>Телефон</h4>
                        <p className={s.card_text}>+996 500 123 456</p>
                    </div>
                </div>
                <div className={s.card}>
                    <div className={s.icon_wrap}>
                        <img src={mail} alt="icon" />
                    </div>
                    <div className={s.card_desc}>
                        <h4 className={s.card_title}>Email</h4>
                        <p className={s.card_text}>info@gmail.com</p>
                    </div>
                </div>
                <div className={s.card}>
                    <div className={s.icon_wrap}>
                        <img src={message} alt="icon" />
                    </div>
                    <div className={s.card_desc}>
                        <h4 className={s.card_title}>Время работы</h4>
                        <p className={s.card_text}>Пн-Сб: 9:00-18:00</p>
                    </div>
                </div>
            </div>

            <div className={s.form_block}>
                <h3 className={s.form_title}>Форма заявки</h3>

                {error && <div className={s.error_message}>Ошибка: {error}</div>}

                <form className={s.feedback_form} onSubmit={handleSubmit}>
                    <FormGroup
                        label="Имя"
                        placeholder="Введите ваше имя"
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />

                    <FormGroup
                        label="Телефон"
                        placeholder="+996 XXX XX-XX-XX"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />

                    {/* <div className={s.full_width}>
                        <FormGroup 
                            label="Email" 
                            placeholder="your@email.com" 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={s.full_width}>
                        <FormGroup
                            label="Тип заявки"
                            isSelect
                            required
                            options={["Консультация", "Запрос цены", "Техническая поддержка"]}
                            name="requestType"
                            onChange={handleInputChange}
                        />
                    </div> */}

                    <div className={s.full_width}>
                        <FormGroup
                            label="Сообщение"
                            placeholder="Опишите детали вашей заявки..."
                            type="textarea"
                            required
                            name="comment"
                            value={formData.comment}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={classNames(s.full_width)}>
                        <label className={s.privacy_checkbox}>
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                            />
                            Я согласен на обработку персональных данных
                        </label>

                        <button className={s.submit_button} type="submit" disabled={loading}>
                            {loading ? "Отправка..." : "Отправить заявку"}
                        </button>
                    </div>
                </form>
            </div>

            <div className={s.after_send_block}>
                <h4 className={s.after_send_title}>Что происходит после отправки?</h4>
                <ul className={s.after_send_list}>
                    <li>Ваша заявка поступает нашему менеджеру</li>
                    <li>В течение 1 часа мы свяжемся с вами для уточнения деталей</li>
                    <li>Подготовим индивидуальное коммерческое предложение</li>
                    <li>Договоримся о сроках и условиях доставки</li>
                </ul>
            </div>
        </div>
    );
};
