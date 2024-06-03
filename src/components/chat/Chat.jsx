import React, { useContext, useEffect, useRef, useState } from 'react';
import "../chat/chat.scss";
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { format } from "timeago.js";
import { SocketContext } from '../../context/SocketContext';
import { useNotificationStore } from '../../lib/notificationStore';

export default function Chat({ chats }) {
    const [chat, setChat] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const messageEndRef = useRef();

    const decrease = useNotificationStore(state => state.decrease);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    const handleOpenChat = async (id, receiver) => {
        try {
            const res = await apiRequest("/chats/" + id);
            if (!res.data.seenBy.includes(currentUser.id)) {
                decrease();
            }
            setChat({ ...res.data, receiver })
        } catch (err) {
            console.log(err);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const text = formData.get("message");

        try {
            const res = await apiRequest.post("/messages/" + chat.id, { text });
            setChat(prev => ({ ...prev, message: [...prev.message, res.data] }));
            e.target.reset();
            socket.emit("sendMessage", {
                receiverId: chat.receiver.id,
                data: res.data
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const read = async () => {
            try {
                await apiRequest.put("/chats/read/" + chat.id);
            } catch (err) {
                console.log(err);
            }
        };

        if (chat && socket) {
            socket.on("getMessage", (data) => {
                if (chat.id === data.chatId) {
                    setChat(prev => ({ ...prev, message: [...prev.message, data] }));
                    read();
                }
            });
        }
    }, [chat, socket]);

    return (
        <div className="chat">
            <div className="messages">
                <h1>Messages</h1>
                {chats.map(c => (
                    <div
                        key={c.id}
                        className="message"
                        style={{ backgroundColor: c.seenBy.includes(currentUser.id) || chat?.id === c.id ? "white" : "#fecd514e" }}
                        onClick={() => handleOpenChat(c.id, c.receiver)}
                    >
                        <img src={c.receiver.avatar || "/images/noavatar.png"} alt="" />
                        <span>{c.receiver.username}</span>
                        <p>{c.lastMessage} ...</p>
                    </div>
                ))}
            </div>
            {chat && <div className="chatBox">
                <div className="top">
                    <div className="user">
                        <img src={chat.receiver.avatar || "/images/noavatar.png"} alt="" />
                        {chat.receiver.username}
                    </div>
                    <span className='close' onClick={() => setChat(null)}>X</span>
                </div>
                <div className="center">
                    {chat.message.map((m) => (
                        <div
                            className="chatMessage"
                            key={m.id}
                            style={{
                                alignSelf: m.userId === currentUser.id ? "flex-end" : 'flex-start',
                                textAlign: m.userId === currentUser.id ? "right" : "left"
                            }}
                        >
                            <p>{m.text} ....</p>
                            <span>{format(m.createdAt)}</span>
                        </div>
                    ))}
                    <div ref={messageEndRef}></div>
                </div>
                <form onSubmit={handleSendMessage} className="bottom">
                    <textarea name="message" id="message"></textarea>
                    <button>Send</button>
                </form>
            </div>}
        </div>
    )
};
