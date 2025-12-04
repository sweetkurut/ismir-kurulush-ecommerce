import { ServiceCard } from "@/widgets/ServiceCard/ServiceCard";
import s from "./style.module.scss";
import settings from "@/shared/assets/icons/settings.svg";
import { Consultation } from "@/widgets/Consultation/Consultation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchGetServices } from "@/store/slices/serviceSlice";
import { SkeletonServiceCard } from "@/components/SkeletonServiceCard/SkeletonServiceCard";

export const ServicesPage = () => {
    const dispatch = useAppDispatch();
    const { service, loading } = useAppSelector((state) => state.service);

    useEffect(() => {
        dispatch(fetchGetServices());
    }, [dispatch]);

    return (
        <div className={s.main_wrapper}>
            <div className={s.wrapper}>
                <div className={s.container}>
                    <div className={s.icon_wrap}>
                        <img src={settings} alt="icon service" loading="lazy" decoding="async" />
                    </div>

                    <h2 className={s.title}>Наши услуги</h2>
                    <p className={s.sub_title}>
                        Полный спектр услуг по обработке металла и производству металлоконструкций
                    </p>
                </div>
            </div>
            <div className={s.content}>
                <div className={s.grid}>
                    {loading
                        ? Array.from({ length: service?.length || 3 }).map((_, i) => (
                              <SkeletonServiceCard key={i} />
                          ))
                        : service?.map((item, i) => <ServiceCard key={i} {...item} />)}
                </div>
            </div>

            <Consultation />
        </div>
    );
};

export default ServicesPage;
