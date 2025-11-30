import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import s from "./Breadcrumbs.module.scss";
import { Link } from "react-router-dom";
import type { FC } from "react";

interface Crumb {
    label: string;
    path?: string;
}

interface BreadcrumbsProps {
    className?: string;
    breadcrumbs: Crumb[];
}

export const BasicBreadcrumbs: FC<BreadcrumbsProps> = ({ className, breadcrumbs }) => {
    return (
        <div className={s.wrapper}>
            <Breadcrumbs aria-label="breadcrumb">
                {breadcrumbs.map((crumb, index) =>
                    crumb.path ? (
                        <Link key={index} to={crumb.path}>
                            {crumb.label}
                        </Link>
                    ) : (
                        <Typography key={index} color="text.primary">
                            {crumb.label}
                        </Typography>
                    )
                )}
            </Breadcrumbs>
        </div>
    );
};
