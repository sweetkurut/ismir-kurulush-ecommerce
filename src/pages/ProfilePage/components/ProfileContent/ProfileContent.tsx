import s from "./style.module.scss";

export const ProfileContent = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.tabContent}>
                <h2>Личная информация</h2>
                <div className={s.formGroup}>
                    <label>Имя</label>
                    <input type="text" className={s.input} />
                </div>
                <div className={s.formGroup}>
                    <label>Email</label>
                    <input type="email" className={s.input} />
                </div>
                <div className={s.formGroup}>
                    <label>Телефон</label>
                    <input type="tel" className={s.input} />
                </div>
                <button className={s.saveButton}>Сохранить изменения</button>
            </div>
        </div>
    );
};
