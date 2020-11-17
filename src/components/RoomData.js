import ScrollableFeed from "react-scrollable-feed";
import React, {Fragment} from "react";
import {useChat} from "./FirebaseComponent";
import moment from "moment";

export default function RoomData(roomID) {
    return (
        <Fragment>
            <div style={{height: '600px'}}>
                <ScrollableFeed forceScroll={true}>
                    <div className="chat-history">
                        <ul>
                            {useChat(roomID.roomID).map((chat) => {
                                return (
                                    <li key={chat.id} className="clearfix">
                                        {chat.user === localStorage.getItem('user') ?
                                            <div className="message-data">
                                                    <span className="message-data-name">
                                                    <i className="fa fa-circle online"/>You</span>
                                                <span className="message-data-time">{moment.unix(chat.datetime).format('D MMM, LT')}</span>
                                            </div>
                                            :
                                            <div className="message-data">
                                                    <span className="message-data-name float-right">
                                                    <i className="fa fa-circle online"/>Anonymous</span>
                                                <span className="message-data-time">{moment.unix(chat.datetime).format('D MMM, LT')}</span>
                                            </div>
                                        }
                                        {chat.user === localStorage.getItem('user') ?
                                            <div className="message my-message">
                                                {chat.text}
                                            </div>
                                            :
                                            <div className="message other-message float-right">
                                                {chat.text}
                                            </div>
                                        }

                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </ScrollableFeed>
            </div>
        </Fragment>
    );
}