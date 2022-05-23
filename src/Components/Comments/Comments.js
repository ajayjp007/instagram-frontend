import "./Comments.css"
import { useState, useEffect } from "react"


const Comments = (props) => {
    console.log(props.comments)
    const [postsData, setPostsData] = useState(props.comments)

//comment has to be removed
    const [deleteComment, setDeleteComment] = useState(false)

    const deleteCommentHandler = () => {
        setDeleteComment(true)
    }

    

    return (
        <div className="comment-container">
            {
                postsData.map((items, index) => {
                    return (
                        <div className="comments-line"> {items.username}
                            <div className="comment-content-container">
                                <p className="comments-content">{items.Comment}</p><img onClick={deleteCommentHandler} src="https://img.icons8.com/external-anggara-flat-anggara-putra/344/external-delete-interface-anggara-flat-anggara-putra-2.png" alt="delete" className="delete-comment-icon" /></div>
                        </div>
                    )

                })
            }
        </div>
    )
}

export default Comments