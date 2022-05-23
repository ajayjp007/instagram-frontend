import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Button from "../UI/Button"
import "./AddNewFriends.css"


const AddNewFriends = () => {

    const [otherActiveUsers, setOtherActiveUsers] = useState([])

    const [profileUserName, setProfileUsername] = useState("")
    const [viewOtherProfile, setViewOtherProfile] = useState(false)


    const viewOtherProfileHandler = () => {
        // setProfileUsername(props.target)
        setViewOtherProfile(true)
    }


    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const fetchData = async () => {
            await fetch("http://localhost:5000/api/profiles/get-all-users", requestOptions)
                .then(response => response.text())
                .then(result => {
                    result = JSON.parse(result)
                    setOtherActiveUsers(result.users)
                })
                .catch(error => console.log('error', error));
        }

        fetchData().catch(console.error)
    }, [])

    return (
        <div className="add-friends-container">

            {viewOtherProfile && <Navigate to="/other-profile"/>}

            {
                otherActiveUsers.map((element, index) => {
                    return (
                        <div key={index} className="new-friends-details-container" value={element.email}  >
                            <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile picture" className="profile-picture-add-friends" />
                            <p className="user-name-AddNewFriends" onClick={viewOtherProfileHandler}>{element.username}</p>
                            <Button content={"Follow"} />
                        </div>
                    )
                })
            }
        </div>

    )

}

export default AddNewFriends