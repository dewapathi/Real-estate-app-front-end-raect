import React, { useContext, useState } from 'react';
import "../singlePage/singlePage.scss";
import Slider from '../../components/slider/Slider';
import Map from '../../components/map/Map';
import { redirect, useLoaderData } from 'react-router-dom';
import DomPurify from "dompurify";
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';

export default function SinglePage() {
    const post = useLoaderData();
    const { currentUser } = useContext(AuthContext);
    const [saved, setSaved] = useState(post.isSaved);
    console.log('00', post);
    const handleSave = async () => {
        setSaved(prev => !prev);
        console.log('11111111');
        if (!currentUser) {
            redirect("/login");
        }

        try {
            await apiRequest.post("/users/save", { postId: post.id });
        } catch (err) {
            console.log(err);
            setSaved(prev => !prev);
        }
    };

    return (
        <div className="singlePage">
            <div className="details">
                <div className="wrapper">
                    <Slider images={post.images} />
                    <div className="info">
                        <div className="top">
                            <div className="post">
                                <h1>{post.title}</h1>
                                <div className="address">
                                    <img src="images/pin.png" alt="" />
                                    <span>{post.address}</span>
                                </div>
                                <div className="price">$ {post.price}</div>
                            </div>
                            <div className="user">
                                <img src={post.user.avatar || "/images/noavatar.png"} alt="" />
                                <span>{post.user.username}</span>
                            </div>
                        </div>
                        <div className="bottom" dangerouslySetInnerHTML={{ __html: DomPurify.sanitize(post.postDetail.desc) }}>
                            {/* {post.postDetail.desc} */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="features">
                <div className="wrapper">
                    <p className="title">General</p>
                    <div className="listVertical">
                        <div className="feature">
                            <img src="/images/utility.png" alt="" />
                            <div className="featureText">
                                <span>Utilities</span>
                                {post.postDetail.utilities === "owner" ?
                                    (
                                        <p>Owner is responsible</p>
                                    ) :
                                    (
                                        <p>Renter is responsible</p>
                                    )
                                }
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/images/pet.png" alt="" />
                            <div className="featureText">
                                <span>Pet Policy</span>
                                {post.postDetail.pet === "allowed" ?
                                    (
                                        <p>Pets Allowed</p>
                                    ) :
                                    (
                                        <p>Pets Not Allowed</p>
                                    )
                                }

                            </div>
                        </div>
                        <div className="feature">
                            <img src="/images/fee.png" alt="" />
                            <div className="featureText">
                                <span>Income Policy</span>
                                <p>{post.postDetail.income}</p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Sizes</p>
                    <div className="sizes">
                        <div className="size">
                            <img src="/images/size.png" alt="" />
                            <span>{post.postDetail.size} sqft</span>
                        </div>
                        <div className="size">
                            <img src="/images/bed.png" alt="" />
                            <span>{post.bedroom} beds</span>
                        </div>
                        <div className="size">
                            <img src="/images/bath.png" alt="" />
                            <span>{post.bathroom} bathroom</span>
                        </div>
                    </div>
                    <p className="title">Nearby Places</p>
                    <div className="listHorizontal">
                        <div className="feature">
                            <img src="/images/school.png" alt="" />
                            <div className="featureText">
                                <span>School</span>
                                <p>
                                    {post.postDetail.school > 999 ? post.postDetail.school / 1000 + "km" : post.postDetail.school + "m "}
                                    away
                                </p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/images/pet.png" alt="" />
                            <div className="featureText">
                                <span>Bus Stop</span>
                                <p>
                                    {post.postDetail.bus > 999 ? post.postDetail.bus / 1000 + "km" : post.postDetail.bus + "m "}
                                    away
                                </p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/images/fee.png" alt="" />
                            <div className="featureText">
                                <span>Restaurant</span>
                                <p>
                                    {post.postDetail.restaurant > 999 ? post.postDetail.restaurant / 1000 + "km" : post.postDetail.restaurant + "m "}
                                    away
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Location</p>
                    <div className="mapContainer">
                        <Map items={[post]} />
                    </div>
                    <div className="buttons">
                        <button>
                            <img src="/images/chat.png" alt="" />
                            Send a Message
                        </button>
                        <button onClick={handleSave} style={{ backgroundColor: saved ? "#fece51" : "white" }}>
                            <img src="/images/chat.png" alt="" />
                            {saved ? "Place Saved" : "Save the Place"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
