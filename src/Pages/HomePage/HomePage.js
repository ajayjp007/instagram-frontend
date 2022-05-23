import React from "react"
import "./HomePage.css"
import StoryBox from "../../Components/StoryBox/StoryBox"
import Card from "../../Components/UI/Card"
import Navbar from "../../Components/Navbar/Navbar"
import UserProfile from "../../Components/UserProfile/UserProfile"
import { useState, useEffect } from "react"


//card should be rendered as many posts as the person has posted
//dont add post data to useEffect because itll cause an infinite loop useMemo or something later
const HomePage = () => {

    const [postsData, setPostsData] = useState([])

    useEffect(() => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const fetchData = async () => {
            await fetch("http://localhost:5000/api/posts/get-all-posts", requestOptions)
                .then(response => response.text())
                .then(result => {
                    result = JSON.parse(result)
                    console.log(result)
                    setPostsData(result.posts)
                })
                .catch(error => console.log('error', error));
        }

        console.log(postsData)
        
        fetchData().catch(console.error)
    }, [])


    return (
        <React.Fragment>
            <Navbar />

            <div className="main-content-container">
            
                <div className="story-posts-container">
                    {/* <StoryBox />     */}
                    {
                        postsData.map((items, index) => {
                            return (
                                <Card data={items} key={items + index} />
                            )
                        })
                    }
                </div>

                <UserProfile />

            </div>
        </React.Fragment>
    )
}

export default HomePage