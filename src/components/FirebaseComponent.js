import React, {useState} from 'react';
import firebase from 'firebase/app';
import {firestore} from '../firebase/firebase.utils'

export function useChat(roomID) {
    const [text, setText] = useState([])
    React.useEffect(() => {
            if (roomID) {
                firestore.collection('chat')
                    .where('roomId', '==', roomID)
                    .orderBy("datetime", "asc")
                    .onSnapshot((snapshot) => {
                        const newChat = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                        }))

                        setText(newChat);
                    })
            }
        },
        [roomID]
    )

    return text
}

export const createText = (text, roomID) => {
    return firestore.collection('chat')
        .add({
            text: text,
            roomId: roomID,
            datetime: new Date(),
            user: localStorage.getItem('user')
        });
};

export const createRoom = (text) => {
    return firestore.collection('rooms')
        .add({
            name: text,
            datetime: new Date(),
            user: localStorage.getItem('user')
        });
};

export function useRoom() {
    const [room, setRoom] = useState([])
    React.useEffect(() => {
            firestore.collection('rooms').orderBy("datetime", "asc").onSnapshot((snapshot) => {
                const newRoom = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setRoom(newRoom);
            })
        },
        []
    )
    return room;

}

export function setUser() {
    firebase.auth().signInAnonymously().catch(function (error) {
        if (error) {
            return error.message;
        }
    });
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            localStorage.setItem('user', user.uid);
        } else {
            localStorage.setItem('user', '');
        }
    });
}