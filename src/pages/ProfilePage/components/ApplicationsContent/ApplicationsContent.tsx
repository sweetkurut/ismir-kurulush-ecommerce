import s from "./style.module.scss";

export const ApplicationsContent = () => {
    return (
        <div className={s.tabContentApplications}>
            <div className={s.applicationHeader}>
                <h3>Мои заявки на услуги или консультации</h3>
                <button className={s.newApplicationBtn}>+ Создать новую заявку</button>
            </div>

            <div className={s.applicationCard}>
                <div className={s.appDetails}>
                    <h4>Заявка #APP-003</h4>
                    <p className={s.appType}>Тип: Консультация по монтажу</p>
                    <p className={s.appDate}>Дата создания: 01 октября 2025</p>
                    <p className={s.appDescription}>
                        Требуется помощь в расчете материалов для системы отопления.
                    </p>
                </div>
                <div className={s.appStatusTag}>
                    <span className={`${s.appStatus} ${s.statusPending}`}>На рассмотрении</span>
                </div>
            </div>

            <div className={s.applicationCard}>
                <div className={s.appDetails}>
                    <h4>Заявка #APP-002</h4>
                    <p className={s.appType}>Тип: Запрос на замер</p>
                    <p className={s.appDate}>Дата создания: 18 сентября 2025</p>
                    <p className={s.appDescription}>Замер помещения для установки сантехники.</p>
                </div>
                <div className={s.appStatusTag}>
                    <span className={`${s.appStatus} ${s.statusCompleted}`}>Выполнена</span>
                </div>
            </div>
        </div>
    );
};
