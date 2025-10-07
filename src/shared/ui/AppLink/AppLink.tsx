import { NavLink, type NavLinkProps } from "react-router-dom";
import s from "./AppLink.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import type { FC, ReactNode } from "react";

interface AppLinkProps extends NavLinkProps {
    className?: string;
    children: ReactNode;
    activeClassName?: string;
}

export const AppLink: FC<AppLinkProps> = ({
    to,
    className,
    activeClassName = "",
    children,
    ...otherProps
}) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => classNames(className || s.item, { [activeClassName]: isActive })}
            {...otherProps}
        >
            {children}
        </NavLink>
    );
};
