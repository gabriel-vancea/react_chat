import React from 'react';
import {createRoom, setUser} from "./FirebaseComponent";
import ScrollableFeed from "react-scrollable-feed";
import {useRoom} from './FirebaseComponent';
import RoomChatComponent from "./RoomChatComponent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const MainComponent = () => {
    const rooms = useRoom();
    const [state, setState] = React.useState({
        inputText: '',
        inputRoomText: '',
        inputSearch: '',
        submittedText: '',
        submittedRoomText: '',
        rooms: [],
        roomIdClicked: '',
        defaultRoom: '',
        activeRoom: null
    });

    React.useEffect(() => {
        setUser();
        if (rooms[0]) {
            setState({
                ...state,
                defaultRoom: rooms[0].id
            })
        }
    }, [rooms])

    function handleRoomChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handleCreateRoom = e => {
        e.preventDefault();

        createRoom(state.inputRoomText)
            .then((r) => {
                setState({
                    ...state,
                    inputText: '',
                    roomIdClicked: r.id,
                    inputRoomText: '',
                    activeRoom: r.id,
                    defaultRoom: ''
                })
            })

    };
    /*
     * Pass data to child component
     */
    function showChat(e) {
        const roomId = e.currentTarget.dataset.id;

        setState({
            ...state,
            roomIdClicked: roomId,
            activeRoom: roomId,
            defaultRoom: ''
        });
    }

    const handleSearch = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    /*
     * Get filtered and unfiltered rooms
     */
    function getRooms(room) {
        return (
            <li className={state.activeRoom === room.id || state.defaultRoom === room.id ? 'clearfix active' : 'clearfix'}
                onClick={showChat} data-id={room.id} key={room.id}>
                <div>
                    <div className="name">{room.name}</div>
                </div>
            </li>
        )
    }
    return (
        <div className="container clearfix">
            <div className="people-list" id="people-list">
                <div className="search">
                    <input value={state.inputSearch} onChange={handleSearch} name="inputSearch" type="text"
                           placeholder="Search"/>
                </div>

                <div className={'rooms'}>
                    <ScrollableFeed>
                        <ul className="list">
                            {state.inputSearch ?
                                rooms.filter(room => room.name.includes(state.inputSearch)).map(filteredRoom => {
                                    return (
                                        getRooms(filteredRoom)
                                    )
                                })
                                :
                                rooms.map((room) => {
                                    return (
                                        getRooms(room)
                                    )
                                })
                            }
                        </ul>

                    </ScrollableFeed>
                </div>
                <form noValidate autoComplete="off"
                      style={{display: "flex", marginLeft: "10px", marginTop: "10px", marginRight: "10px",}}>
                    <TextField
                        value={state.inputRoomText}
                        name="inputRoomText"
                        onChange={handleRoomChange}
                        id="outlined-basic"
                        placeholder="Create Room"
                        size="small"
                        variant="filled"
                        style={{borderRadius: "0 0 0 0"}}
                    />
                    <Button onClick={handleCreateRoom} variant="contained" type={"submit"} color="primary" size="small">
                        Create
                    </Button>
                </form>
            </div>

            <div className="chat">
                <RoomChatComponent {...state}/>
            </div>
        </div>
    );
}

export default MainComponent;