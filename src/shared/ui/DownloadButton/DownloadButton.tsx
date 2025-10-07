import React from 'react';
import s from './DownloadButton.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import DownloadIcon from '@/shared/assets/icons/download.svg';

interface DownloadButtonProps {
    onClick: () => void;
    className?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick, className }) => {
    return (
        <button
            className={classNames(s.download_button, {}, [className])}
            onClick={onClick}
            title="Скачать PDF"
        >
            <DownloadIcon className={s.icon} />
            <span>Скачать таблицу</span>
        </button>
    );
}; 