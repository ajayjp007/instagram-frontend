import "./StoryBox.css"

const StoryBox = () => {

    const count = 20

    return (
        <div className="Story-container"> {
            [...Array(count)].map((element, index) => {
                return (
                    <img src="https://www.svgrepo.com/show/20/user.svg" className="story-icons" alt="user-profile" key={index} />
                )
            })
        }
        </div>
    )

}

export default StoryBox