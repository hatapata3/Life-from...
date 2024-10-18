import { useRef } from 'react'
import './header.css'
import 'remixicon/fonts/remixicon.css'

export default function Header()
{
    const navRef = useRef(null)

    const navShow = () => navRef.current.classList.add('show-menu')
    const navClose = () => navRef.current.classList.remove('show-menu')
    return (
        <>
            <header className="header">
                <nav className="nav container">
                    <a href="#" className="nav__logo">Life From...</a>

                    <div ref={navRef} className="nav__menu">
                        <ul className="nav__list">
                            <li>
                                <a href="#" className="nav__link" onClick={navClose}>Home</a>
                            </li>
                            <li>
                                <a href="#" className="nav__link" onClick={navClose}>Projects</a>
                            </li>
                            <li>
                                <a href="#" className="nav__link" onClick={navClose}>News</a>
                            </li>
                            <li>
                                <a href="#" className="nav__link" onClick={navClose}>Store</a>
                            </li>
                            <li>
                                <a href="#" className="nav__link" onClick={navClose}>Contact</a>
                            </li>
                        </ul>

                        <div className="nav__close" onClick={navClose}>
                            <i className="ri-close-large-line"></i>
                        </div>
                    </div>

                    <div className="nav__toggle" onClick={navShow}>
                        <i className="ri-menu-line"></i>
                    </div>
                </nav>
            </header>
        </>
    )
}