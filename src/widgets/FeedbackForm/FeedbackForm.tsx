import { useEffect, useState } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import s from "./style.module.scss";
import phone from "@/shared/assets/icons/phone.svg";
import mail from "@/shared/assets/icons/mail.svg";
import message from "@/shared/assets/icons/messageicon.svg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCreateOrdersReq, fetchTypeReq } from "@/store/slices/orderRequestSlice";
import { FormGroup } from "@/components/FormGroup/FormGroup";
import { toast } from "react-toastify";

interface FormData {
    name: string;
    phone: string;
    comment: string;
    email: string;
    request_type?: string;
    cart: number | null;
    service?: number | null;
}

export const FeedbackForm = ({ cartId }: { cartId: number | null }) => {
    const dispatch = useAppDispatch();
    const { loading, error, type_req } = useAppSelector((state) => state.orderRequest);

    const [agreed, setAgreed] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        phone: "",
        comment: "",
        email: "",
        request_type: cartId ? "Заказ товара" : "Консультация",
        cart: cartId,
        service: null,
    });

    useEffect(() => {
        dispatch(fetchTypeReq());
    }, [dispatch]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "request_type" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!agreed) {
            toast.warn("Пожалуйста, согласитесь на обработку персональных данных.");
            return;
        }

        if (!formData.name.trim() || !formData.phone.trim() || !formData.comment.trim()) {
            toast.error("Пожалуйста, заполните все обязательные поля.");
            return;
        }

        try {
            await dispatch(
                fetchCreateOrdersReq({
                    name: formData.name.trim(),
                    phone: formData.phone.trim(),
                    comment: formData.comment.trim(),
                    email: formData.email.trim(),
                    request_type: formData.request_type,
                    cart: formData.cart,
                    service: formData.service,
                })
            ).unwrap();

            toast.success("Заявка успешно отправлена!");

            setFormData({
                name: "",
                phone: "",
                comment: "",
                email: "",
                request_type: "",
                cart: cartId,
                service: "",
            });

            setAgreed(false);
        } catch (error) {
            console.error("Ошибка при отправке заявки:", error);
            toast.error("Произошла ошибка при отправке заявки. Пожалуйста, попробуйте ещё раз.");
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
                    <div>
                        <FormGroup
                            label="Имя"
                            placeholder="Введите ваше имя"
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <FormGroup
                            label="Телефон"
                            placeholder="+996 XXX XX-XX-XX"
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={s.full_width}>
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
