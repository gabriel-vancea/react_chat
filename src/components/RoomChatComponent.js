import React from 'react';
import {createText} from "./FirebaseComponent";
import RoomData from "./RoomData";

const RoomChatComponent = (props) => {
    const [state, setState] = React.useState({
        inputText: '',
        roomId: '',
        defaultRoom: ''
    });

    function handleChange(event) {
        setState({
            inputText: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault();

        if(props.roomIdClicked) {
            createText(event.target[0].value, props.roomIdClicked).then(() => setState({
                inputText: ''
            }));
        } else {
            createText(event.target[0].value, props.defaultRoom).then(() => setState({
                inputText: ''
            }));
        }

    }
    function handleEnter(e) {
        if(e.code === 'Enter' || e.code === 'NumpadEnter') {
            if(props.roomIdClicked) {
                createText(e.target.value, props.roomIdClicked).then(() => setState({
                    inputText: ''
                }));
            } else {
                createText(e.target.value, props.defaultRoom).then(() => setState({
                    inputText: ''
                }));
            }
        }
    }
    return (
        <div>
            <RoomData roomID={props.roomIdClicked ? props.roomIdClicked : props.defaultRoom}/>
            <form onSubmit={handleSubmit}>
                <div className="chat-message clearfix">
                        <textarea onChange={handleChange} value={state.inputText} name="message-to-send"
                                  id="message-to-send" placeholder="Type your message"
                                  rows="3"
                                  onKeyDown={(e) => handleEnter(e) }/>

                    <i className="fa fa-file-o"/> &nbsp;&nbsp;&nbsp;
                    <i className="fa fa-file-image-o"/>
                    <button>Send</button>
                </div>
            </form>

        </div>

    )
}

export default RoomChatComponent;