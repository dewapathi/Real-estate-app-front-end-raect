import React, { useContext } from 'react';
import "../homePage/homePage.scss";
import SearchBar from '../../components/searchBar/SearchBar';
import { AuthContext } from '../../context/AuthContext';

export default function HomePage() {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className='homePage'>
            <div className="textContainer">
                <div className="wrapper">
                    <h1 className='title'>Find Real Estate & Get Your Dream Place</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi illo dolorum consequuntur distinctio vero eos minus laudantium facere cumque amet eveniet, sed tempora dolore officiis, quod cupiditate iure minima nam?</p>
                    <SearchBar />
                    <div className="boxes">
                        <div className="box">
                            <h1>16+</h1>
                            <h2>Years of Experience</h2>
                        </div>
                        <div className="box">
                            <h1>200</h1>
                            <h2>Award Gained</h2>
                        </div>
                        <div className="box">
                            <h1>2000+</h1>
                            <h2>Property Ready</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="imgContainer">
                <img src="/images/bg.png" alt="" />
            </div>
        </div>
    )
};
