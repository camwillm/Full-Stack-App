import './banner.css'
import landscapingBg from './landscaping_bg.png';
const Banner = () => {
    return (
        <nav className="banner">
            <div className='bannerPhoto'>
            <img src={landscapingBg} alt="Landscaping photo" />
            </div>
        </nav>
    )
}

export default Banner