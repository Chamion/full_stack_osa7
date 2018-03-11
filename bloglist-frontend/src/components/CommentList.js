import React from 'react'
import { Table } from 'react-bootstrap'

const CommentList = (props) => {
    return (
        <div style={{marginTop: 10}}>
            <Table bordered>
                <tbody>
                    {
                        props.comments.map(comment => {
                            return (
                                <tr key={comment}>
                                    <td>{comment}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default CommentList