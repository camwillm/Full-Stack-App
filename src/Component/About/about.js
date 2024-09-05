import './about.css';
import { useState } from 'react';

const About = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <section className='about'>
            <div className='about-image-container'>
                <img src='your-image-url.jpg' alt='Description' className='about-image' />
            </div>
            <div className='about-content'>
                <h1>About Our Legacy</h1>
                <h2>A Father-and-Son Partnership Operating out</h2>
                <p>
                    Cam - An entrepreneurship endeavor that was started in 2017 when at 13 I wanted to work. At the time
                    I could not work because I was so young. This was until I went to my parents about
                    this and my mother gave me the idea of cutting grass. I was very fortunate because
                    at 13 years old I had no way to make it to any jobs. That is when my Father stepped
                    in. From then to now going on 7 years we have been immersed in this world of Landscaping.
                    \n
                    Every lawn that was managed exceeds a standard that both me and my Father hold each
                    other to. We manage the lawn so the client does not have to. Landscaping jobs crafted
                    to a level near perfection. Created in the eyes of the client and transformed from
                    imagination to reality.
                </p>
                <button className='learn-more-button' onClick={handleToggle}>
                    {isExpanded ? 'SHOW LESS' : 'LEARN MORE'}
                </button>
                {isExpanded && (
                    <div className='about-additional-info'>
                        <h3>Why us?</h3>
                        <p> .. .. . .. . </p>
                        <h3>More about Father-Son duo</h3>
                        <p> .. .. . .. . </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default About;
