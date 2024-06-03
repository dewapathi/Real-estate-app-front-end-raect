import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const fetch = useNotificationStore(state => state.fetch);
    const number = useNotificationStore(state => state.number);

    fetch();

    return (
        <nav>
            <div className="left">
                <a href="/" className="logo">
                    <img src="/images/logo.png" alt="" />
                    <span>LakruwanEstate</span>
                </a>
                <a href="/">Home</a>
                <a href="/">About</a>
                <a href="/">Contact</a>
                <a href="/">Agents</a>
            </div>
            <div className="right">
                {currentUser ? (
                    <div className="user">
                        <img src={currentUser.avatar || "/images/noavatar.png"} alt="" />
                        <span>{currentUser.username}</span>
                        <Link to="/profile" className="profile">
                            {number > 0 && <div className="notification">{number}</div>}
                            <span>Profile</span>
                        </Link>
                    </div>
                ) :
                    <>
                        <a href="/login">Sign in</a>
                        <a href="/register" className="register">Sign up</a>
                    </>
                }
                <div className="menuIcon">
                    <img
                        src="/images/menu.png"
                        alt=""
                        // onClick={() => setOpen(!open)}
                        onClick={() => setOpen(prev => !prev)}
                    />
                </div>
                <div className={open ? "menu active" : "menu"}>
                    <a href="/">Home</a>
                    <a href="/">About</a>
                    <a href="/">Contact</a>
                    <a href="/">Agents</a>
                    <a href="/">Sign in</a>
                    <a href="/">Sign up</a>
                </div>
            </div>
        </nav>
    )
};
