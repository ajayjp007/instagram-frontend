import { useEffect, useState } from "react"
import "./Posts.css"



//should api call and check posts and render as many cards as required
const Posts = () => {

    const [postsData, setPostsData] = useState([])
    const [openPost, setOpenPost] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [postURL, setPostURL] = useState("")

    useEffect(() => {
        var email = localStorage.getItem('emailId')


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": email
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const fetchData = async () => {
            await fetch("http://localhost:5000/api/posts/user-posts", requestOptions)
                .then(response => response.text())
                .then(result => {
                    result = JSON.parse(result)
                    console.log(result.posts)
                    setPostsData(result.posts)
                })
                .catch(error => console.log('error', error));
        }
        fetchData().catch(console.error)
    }, [])


    const deletePostHandler = () => {
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "id": deleteId
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:5000/api/posts//delete-post", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
          window.location.reload();
    }



    const openPostHandler = (event) => {
        setPostURL(event.target.src)
        setDeleteId(event.target.id)
        setOpenPost(true)
    }

    const closePostHandler = () => {
        setOpenPost(false)
    }


    return (
        <div className="user-posts-container">
            {

                postsData.map((element, index) => {
                    return (
                        <img src={element.imageURL} id={element._id} className="users-posts-profile" key={index} onClick={openPostHandler} />
                    )
                })
            }


            {
                openPost &&
                <div className="about-post-container">

                    <img src={postURL} alt="Your post" className="post-about-posts" />
                    <div className="options-container-about-post">
                        <p className="option-items-about" onClick={deletePostHandler}>Delete Post</p>
                        <p className="option-items-about">Archive Post</p>
                        <p className="option-items-about">Edit Post</p>
                        <p className="option-items-about" onClick={closePostHandler}>Close</p>
                    </div>

                </div>
            }
        </div>
    )
}

export default Posts