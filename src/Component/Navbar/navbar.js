import { useState, useEffect } from 'react';
import './navbar.css';
import { Link } from 'react-scroll';

const Navbar = () => {
    const [navbarHeight, setNavbarHeight] = useState('5rem');
    const [navbarOpacity, setNavbarOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setNavbarHeight('6rem');
            } else {
                setNavbarHeight('5rem');
            }

            const scrollTop = window.scrollY;
            const maxScroll = 100;
            const minOpacity = 0.85;
            const maxOpacity = 1;

            let opacity = maxOpacity - (scrollTop / maxScroll) * (maxOpacity - minOpacity);
            opacity = Math.max(opacity, minOpacity);

            setNavbarOpacity(opacity);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav
            className="navbar"
            style={{
                height: navbarHeight,
                background: `rgba(216, 218, 186, ${navbarOpacity})`,
                transition: 'height 0.5s ease, background 0.5s ease'
            }}
        >
            <div className='desktopMenu'>
                <Link activeClass='active' to='banner' spy={true} smooth={true} offset={-100} duration={800} className='desktopMenuListItem'>Home</Link>
                <Link activeClass='active' to='about' spy={true} smooth={true} offset={-100} duration={800} className='desktopMenuListItem'>About</Link>
                <Link activeClass='active' to='works' spy={true} smooth={true} offset={100} duration={700} className='desktopMenuListItem'>Services</Link>
                <Link activeClass='active' to='works' spy={true} smooth={true} offset={100} duration={700} className='desktopMenuListItem'>Contact</Link>
            </div>
        </nav>
    );
};

export default Navbar;
