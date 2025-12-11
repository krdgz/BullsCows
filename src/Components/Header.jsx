import React from 'react'

export default function Header() {
    return (
        <header className="header">
            <h1 className="header__title">Toros y Vacas</h1>
            <div className='header__buttons'>
                <button className="header__button" aria-label="Rendirse">
                    X
                </button>
                <button className="header__button" aria-label="Show help">
                    ?
                </button>
            </div>
        </header>
    )
}
