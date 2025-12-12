import React from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from '../i18n/useTranslation'

export default function Header() {
    const t = useTranslation()
    return (
        <header className="header">
            <h1 className="header__title">{t('title')}</h1>
            <LanguageSwitcher />
        </header>
    )
}
