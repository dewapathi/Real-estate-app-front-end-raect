import React, { useState } from 'react';
import "../slider/slider.scss";

export default function Slider({ images }) {
    // console.log('images', images);
    const [imageIndex, setImageIndex] = useState(null);

    // console.log('imageIndex', imageIndex);

    const changeSlide = (direction) => {
        setImageIndex(prev => {
            if (direction === "left") {
                return (prev === 0 ? images.length - 1 : prev - 1);
            } else {
                return (prev === images.length - 1 ? 0 : prev + 1);
            }
        })
    };

    return (
        <div className="slider">
            {imageIndex !== null && <div className="fullSlider">
                <div className="arrow">
                    <img src="/images/arrow.png" onClick={() => changeSlide("left")} alt="" />
                </div>
                <div className="imgContainer">
                    <img src={images[imageIndex]} alt="" />
                </div>
                <div className="arrow">
                    <img src="/images/arrow.png" className='right' onClick={() => changeSlide("right")} alt="" />
                </div>
                <div className="close" onClick={() => setImageIndex(null)}>X</div>
            </div>}
            <div className="bigImage">
                <img src={images[0]} onClick={() => setImageIndex(0)} alt="" />
            </div>
            <div className="smallImages">
                {images.slice(1).map((img, idx) => (
                    <img src={img} alt="" key={idx} onClick={() => setImageIndex(idx + 1)} />
                ))}
            </div>
        </div>
    )
};
