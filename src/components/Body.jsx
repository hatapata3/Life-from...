import 'remixicon/fonts/remixicon.css'
import './body.css'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Canvas } from '@react-three/fiber'
import  ScrollReveal  from 'scrollreveal'
import gsap from 'gsap'
import 'swiper/css'
import useGame from './stores/useGame.jsx'
import img1 from '../assets/img/img1.jpg'
import img2 from '../assets/img/img2.jpg'
import img3 from '../assets/img/img3.jpg'
import bg1 from '../assets/img/bg_project.jpg'
import bg2 from '../assets/img/bg_news.jpg'
import bg3 from '../assets/img/bg_contact.jpg'
import news1 from '../assets/img/news1.jpg'
import news2 from '../assets/img/news2.jpg'
import news3 from '../assets/img/news3.jpg'
import news4 from '../assets/img/news4.jpg'

const Model = lazy(() => retry(() => import('./model.jsx')))

function retry(fn, retriesLeft = 5, interval = 1000) {
    return new Promise((resolve, reject) => {
        fn()
        .then(resolve)
        .catch((error) => {
            setTimeout(() => {
                if (retriesLeft === 1) {
                // reject('maximum retries exceeded');
                reject(error);
                return;
                }
            // Passing on "reject" is the important part
                retry(fn, retriesLeft - 1, interval).then(resolve, reject);
            }, interval);
        });
    });
}

function Bg(props)
{
    return <svg className="bg__img" viewBox="0 0 566 840" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0" style={{maskType: "alpha"}}>
            <path d="M342.407 73.6315C388.53 56.4007 394.378 17.3643 391.538 
            0H566V840H0C14.5385 834.991 100.266 804.436 77.2046 707.263C49.6393 
            591.11 115.306 518.927 176.468 488.873C363.385 397.026 156.98 302.824 
            167.945 179.32C173.46 117.209 284.755 95.1699 342.407 73.6315Z"/>
        </mask>
        
        <g mask="url(#mask0)">
            <path d="M342.407 73.6315C388.53 56.4007 394.378 17.3643 391.538 
            0H566V840H0C14.5385 834.991 100.266 804.436 77.2046 707.263C49.6393 
            591.11 115.306 518.927 176.468 488.873C363.385 397.026 156.98 302.824 
            167.945 179.32C173.46 117.209 284.755 95.1699 342.407 73.6315Z"/>
        
            <image href={props.img} />
        </g>
    </svg>
}

export default function Body()
{
    const setPage = useGame((state) => state.setPage)
    const main = useGame((state) => state.main)
    const imgRef = useRef()
    const mainRef = useRef()
    const [firstUpdate, setUpdate] = useState(true)

    const [images] = useState([
        img1, img2, img3
    ])

    function changePage(page)
    {
        setPage(page)
        var tl = gsap.timeline()
        
        tl.to(imgRef.current, {opacity: 0, duration: .5, ease: 'liner'}, 0)
        tl.to(imgRef.current, {opacity: .4, duration: 1, ease: 'liner'}, 1.5)
        setTimeout(() =>
        {
            imgRef.current.src = images[page]
        }, [1500])
    }

    useEffect(() =>
    {
        if(firstUpdate)
        {
            setUpdate(false)
        }
        else
        {
            for(const child of Array.from(mainRef.current.children))
            {
                child.className == main ? child.classList.add('active') : child.classList.remove('active')
                
            }
        }
    }, [main])

    return (
        <>
            <div ref={mainRef} className="main">
                <section className="home active">
                    <img ref={imgRef} src={img1} alt="image" className='home__img' />

                    <Swiper
                        className="home__swiper"
                        modules = {[Navigation, Pagination]}
                        loop = {true}
                        speed = {1800}
                        parallax = {true}
                        effect = 'fade'
                        pagination = {{
                            el: '.swiper-pagination',
                            type: 'fraction',
                            formatFractionCurrent: (number) => { return '0' + number },
                            formatFractionTotal: (number) => { return '0' + number }

                        }}
                        navigation ={{
                            prevEl: '.swiper-button-prev',
                            nextEl: '.swiper-button-next'
                        }}
                        onSlideChangeTransitionStart={(swiper) => {changePage(swiper.realIndex)}
                        }
                    >
                        <SwiperSlide className="home__article article">
                            <div className="home__data container">
                                <h1 className="home__title">Life from Space</h1>
                                <h3 className="home__subtitle">The Panspermia Hypothesis suggests that life came to Earth from space, carried by comets or asteroids that delivered organic molecules or microbes to our planet.</h3>

                                <a href="#" className="button">
                                    Learn more <i className="ri-arrow-right-s-line"></i>
                                </a>
                            </div>
                            <div className="home__shadow"></div>
                        </SwiperSlide>

                        <SwiperSlide className="home__article article">
                            <div className="home__data container">
                                <h1 className="home__title">Life from the Ocean's Depths</h1>
                                <h3 className="home__subtitle">The Hydrothermal Vent Hypothesis proposes that life originated around deep-sea hydrothermal vents, where superheated, mineral-rich water provided the energy needed to fuel the first simple life forms.</h3>

                                <a href="#" className="button">
                                    Learn more <i className="ri-arrow-right-s-line"></i>
                                </a>
                            </div>
                            <div className="home__shadow"></div>
                        </SwiperSlide>

                        <SwiperSlide className="home__article article">
                            <div className="home__data container">
                                <h1 className="home__title">Life from Earth's Early Oceans</h1>
                                <h3 className="home__subtitle">The Primordial Soup Hypothesis suggests that life began in Earth's early oceans, where volcanic gases and lightning sparked the formation of organic molecules, creating a "soup" that led to the first life forms.</h3>

                                <a href="#" className="button">
                                    Learn more <i className="ri-arrow-right-s-line"></i>
                                </a>
                            </div>
                            <div className="home__shadow"></div>
                        </SwiperSlide>

                    </Swiper>

                    <div className="home__content content">
                        <div className="home__social">
                            <a href="https://www.facebook.com/" target='_blank' className="home__social-link">
                                <i className="ri-facebook-circle-line"></i>
                            </a>
                            <a href="https://www.instagram.com/" target='_blank' className="home__social-link">
                                <i className="ri-instagram-line"></i>
                            </a>
                            <a href="https://twitter.com/" target='_blank' className="home__social-link">
                                <i className="ri-twitter-x-line"></i>
                            </a>
                        </div>
                        <div id='pagination' className="swiper-pagination"></div>

                        <div className="swiper-navigation">
                            <div className="swiper-button-prev">
                                <i className="ri-arrow-left-s-line"></i>
                            </div>
                            <div className="swiper-button-next">
                                <i className="ri-arrow-right-s-line"></i>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="project">
                    <div className="project__article article container">
                        <div className='project__text glass'>
                            <h1 className='project__title'>PROJECT</h1>
                            <i className='project__description'>
                                This project aims to investigate the main hypotheses regarding the origin of life, including the primordial soup, hydrothermal vent, and panspermia theories, while examining the scientific evidence and new discoveries for each.<br/> <br/>
                                Using advanced technologies and experiments, we aim to recreate early Earth environments and chemical reactions to better understand how life emerged.<br/>
                                Additionally, the project explores the evolution of life and the potential for extraterrestrial life through space and deep-sea exploration.
                            </i>
                            <a href="#" className = "button">
                                Learn more <i className="ri-arrow-right-s-line"></i>
                            </a>
                        </div>
                        <div className="project__social">
                            <h3>SOCIAL</h3>
                            <div className="project__socials">
                                <a href="https://www.facebook.com/" target='_blank' className="project__social-link">
                                    <i className="ri-facebook-circle-line"></i>
                                </a>
                                <a href="https://www.instagram.com/" target='_blank' className="project__social-link">
                                    <i className="ri-instagram-line"></i>
                                </a>
                                <a href="https://twitter.com/" target='_blank' className="project__social-link">
                                    <i className="ri-twitter-x-line"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <Bg img={bg1} />
                </section>

                <section className="news">
                    <div className="news__article article container">
                        <h1 className='news__title'>NEWS</h1>
                        <div className="news__wrapper">
                            <div className="news__box glass">
                                <img src={news1} alt="" className="news__img" />
                                <h3 className="news__text">New Light on the Origin of Life</h3>
                                <i className="news__description">
                                    Recent experimental techniques shed new light on the chemical reactions that may have led to the formation of life, providing fresh insights into the origins of life.
                                </i>
                                <a href="#" className = "button">
                                    Learn more
                                </a>
                            </div>

                            <div className="news__box glass">
                                <img src={news2} alt="" className="news__img" />
                                <h3 className="news__text">Discovery of Organic Molecules on Mars</h3>
                                <i className="news__description">
                                    The discovery of organic compounds on Mars suggests that the origin of life may extend beyond Earth, bringing renewed attention to the panspermia hypothesis.
                                </i>
                                <a href="#" className = "button">
                                    Learn more
                                </a>
                            </div>

                            <div className="news__box glass">
                                <img src={news3} alt="" className="news__img" />
                                <h3 className="news__text">New Deep-Sea Life Forms</h3>
                                <i className="news__description">
                                    Unknown microorganisms found in the deep sea show that life can thrive in extreme environments, offering new directions for the search for life on other planets.
                                </i>
                                <a href="#" className = "button">
                                    Learn more
                                </a>
                            </div>

                            <div className="news__box glass">
                                <img src={news4} alt="" className="news__img" />
                                <h3 className="news__text">New Research about RNA World</h3>
                                <i className="news__description">
                                    Recent studies provide further evidence for the role self-replicating RNA molecules played in the emergence of life, reinforcing the RNA World Hypothesis.
                                </i>
                                <a href="#" className = "button">
                                    Learn more
                                </a>
                            </div>
                        </div>
                        <a href="#" className = "button view">
                            View more <i className="ri-arrow-right-s-line"></i>
                        </a>
                    </div>
                    <Bg img={bg2} />
                </section>

                <section className="contact">
                    <div className="contact__article article container">
                    <h1 className='contact__title'>CONTACT</h1>
                        <form action="" className="contact__form">
                            <div className="contact__wrapper">
                                <div className="contact__box">
                                    <input type="text" id='text' required placeholder='' className='contact__input glass' />
                                    <label htmlFor="text" className="contact__label">Name</label>
                                    <i className="ri-user-line contact__icon"></i>
                                </div>
                                <div className="contact__box">
                                    <input type="text" id='email' required placeholder='' className='contact__input glass' />
                                    <label htmlFor="email" className="contact__label">Email</label>
                                    <i className="ri-mail-line contact__icon"></i>
                                </div>
                                <div className="contact__box">
                                    <textarea name="textarea" id="textarea" placeholder='' className='contact__input glass'></textarea>
                                    <label htmlFor="textarea" className="contact__label text__label">Message</label>
                                </div>
                            </div>
                            <button type='submit' className="contact__button glass">Send message</button>
                        </form>

                    </div>
                    <Bg img={bg3} />
                </section>

                <Canvas
                    className='canvas'
                    camera={{
                        fov: 35,
                        near: .1,
                        far: 100,
                        position: [0, 0, 16]
                    }}
                    style={{position: 'absolute', top: 0, left: 0, zIndex: 0, touchAction: 'none'}}
                >
                    <Suspense fallback={null}>
                        <Model />
                    </Suspense>
                </Canvas>
            </div>
        </>
    )
}