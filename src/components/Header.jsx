import { useRef } from 'react'
import './header.css'
import 'remixicon/fonts/remixicon.css'
import useGame from './stores/useGame'

export default function Header()
{
    const navRef = useRef(null)
    const setMain = useGame((state) => state.setMain)

    function navShow()
    {
        navRef.current.classList.add('show-menu')
    }
    function navClose()
    {
        navRef.current.classList.remove('show-menu')
    }
    function changePage(target, e)
    {

        for(const child of Array.from(navRef.current.children[0].children))
        {
            child.children[0].classList.remove('active')
            
        }
        e.target.classList.add('active')
        navClose()
        setMain(target)
        
    }
    return (
        <>
            <header className="header">
                <nav className="nav container">
                    <a href="#" className="nav__logo">Life From...</a>

                    <div ref={navRef} className="nav__menu">
                        <ul className="nav__list">
                            <li>
                                <a className="nav__link active" onClick={(e)=>changePage('home', e)}>Home</a>
                            </li>
                            <li>
                                <a className="nav__link" onClick={(e)=>changePage('project', e)}>Project</a>
                            </li>
                            <li>
                                <a className="nav__link" onClick={(e)=>changePage('news', e)}>News</a>
                            </li>
                            <li>
                                <a className="nav__link" onClick={(e)=>changePage('contact',e)}>Contact</a>
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