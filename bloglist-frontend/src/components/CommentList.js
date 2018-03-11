import React from 'react'

const CommentList = (props) => {
    return (
        <div>
            {
                props.comments.map(comment => {
                    return (
                        <div key={comment}>
                            <p>{comment}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CommentList