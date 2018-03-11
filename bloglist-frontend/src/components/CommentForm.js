import React from 'react'
import { connect } from 'react-redux'
import { comment } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import {Form, FormGroup} from 'react-bootstrap'

class CommentForm extends React.Component {
    constructor() {
        super()
        this.state = {
            comment: ''
        }
    }
    
    handleChange(event) {
        this.setState({ comment: event.target.value })
    }
    
    handleSubmit = async (event) => {
        event.preventDefault()
        this.props.comment(this.props.id, this.state.comment)
        await this.props.showNotification(`comment '${this.state.comment}' added to blog '${this.props.title}'`, 'info', 5)
        this.setState({
            comment: ''
        })
    }
    
    render() {
        return (
            <div>
                <h4>Leave a comment</h4>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup>
                        <textarea name='content' value={this.state.comment} onChange={this.handleChange.bind(this)} className='form-control'></textarea>
                    </FormGroup>
                    <button type='submit' className='btn btn-default'>comment</button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.id,
        title: ownProps.title
    }
}

export default connect(
    mapStateToProps,
    {
        showNotification,
        comment
    }
)(CommentForm)