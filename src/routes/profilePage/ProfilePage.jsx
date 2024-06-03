import React, { Suspense, useContext } from 'react';
import "./profilePage.scss";
import List from '../../components/list/List';
import Chat from '../../components/chat/Chat';
import apiRequest from '../../lib/apiRequest';
import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function ProfilePage() {
    const { currentUser, updateUser } = useContext(AuthContext);
    // console.log('1111', currentUser);
    const list = useLoaderData();
    // console.log('111111111111', list);

    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await apiRequest.post("/auth/logout");
            updateUser(null);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className='profilePage'>
                <div className="details">
                    <div className="wrapper">
                        <div className="title">
                            <h1>User Information</h1>
                            <Link to="/profile/update">
                                <button>Update Profile</button>
                            </Link>
                        </div>
                        <div className="info">
                            <span>
                                Avatar: <img src={currentUser.avatar || "/images/noavatar.png"} alt="" />
                            </span>
                            <span>Username: <b>{currentUser.username}</b></span>
                            <span>E-mail : <b>{currentUser.email}</b></span>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                        <div className="title">
                            <h1>My List</h1>
                            <Link to="/add">
                                <button>Create New Post</button>
                            </Link>
                        </div>
                        <Suspense
                            fallback={<p>Loading...</p>}
                        >
                            <Await
                                resolve={list.postResponse}
                                errorElement={
                                    <p>Error loading!</p>
                                }
                            >
                                {(postResponse) => <List data={postResponse.data.userPosts} />}
                            </Await>
                        </Suspense>
                        <div className="title">
                            <h1>Saved List</h1>
                        </div>
                        <Suspense
                            fallback={<p>Loading...</p>}
                        >
                            <Await
                                resolve={list.postResponse}
                                errorElement={
                                    <p>Error loading!</p>
                                }
                            >
                                {(postResponse) => <List data={postResponse.data.savePosts} />}
                            </Await>
                        </Suspense>
                    </div>
                </div>
                <div className="chatContainer">
                    <div className="wrapper">
                    <Suspense
                            fallback={<p>Loading...</p>}
                        >
                            <Await
                                resolve={list.chatResponse}
                                errorElement={
                                    <p>Error loading!</p>
                                }
                            >
                                {(postResponse) => <Chat chats={postResponse.data} />}
                            </Await>
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    )
};
