import { useState } from "react"
import "./Button.css"

const Button = (props) => {

    const [sendFriendRequest, setSendFriendRequest] = useState(false)


    const addFriendHandler = () => {
        setSendFriendRequest(!sendFriendRequest)
    }

    return (
        <button className={sendFriendRequest ? "follow-btn friendReqSent" : "follow-btn"} onClick={addFriendHandler}>{!sendFriendRequest ? props.content : "Requested"}</button>
    )
}


export default Button

