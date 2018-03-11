import React from 'react'
import { connect } from 'react-redux'
import { like, remove } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import { Panel } from 'react-bootstrap'

class BlogInfo extends React.Component {
    
    likeBlog() {
        this.props.showNotification(`Tykkäsit blgista '${this.props.blog.title}' kirjoittajalta ${this.props.blog.author}`, 'info', 5)
        this.props.like(this.props.blog._id)
    }
    
    deleteBlog() {
        const ok = window.confirm(`Poistetaanko blogi '${this.props.blog.title}' kirjoittajalta ${this.props.blog.author}?`)
        if ( ok===false) {
            return
        }
        this.props.remove(this.props.blog._id)
        this.props.showNotification(`Blogi '${this.props.blog.title}' kirjoittajalta ${this.props.blog.author} poistettu.`, 'info', 5)
    }
    
    render() {
        if(this.props.blog === undefined) {
            return (
                <div>
                    <Link to='/'>takaisin blogilistaan</Link>
                </div>
            )
        }
        var deleteButton
        if(this.props.canDelete) {
            deleteButton = (
                <button onClick={() => this.deleteBlog()} className='btn btn-danger'>poista</button>
            )
        } else {
            var addedBy
            if(this.props.blog.user) {
                addedBy = (
                    <p>blogin lisäsi {this.props.blog.user.name}</p>
                )
            } else {
                addedBy = (
                    <p></p>
                )
            }
            deleteButton = addedBy
        }
        return (
            <Panel>
                <Panel.Heading>
                    <h2>{this.props.blog.title} {this.props.blog.author}</h2>
                </Panel.Heading>
                <Panel.Body>
                    <p><a href={this.props.blog.url}>{this.props.blog.url}</a></p>
                    <p>{this.props.blog.likes} tykkäystä <button onClick={() => this.likeBlog()} className='btn btn-primary'>tykkää <span className='glyphicon glyphicon-thumbs-up'></span></button></p>
                    {deleteButton}
                    <h3>kommentteja</h3>
                    <CommentForm id={this.props.blog._id} title={this.props.blog.title} />
                    <CommentList comments={this.props.blog.comments} />
                </Panel.Body>
            </Panel>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    var blog
    blog = state.blogs.find(b => b._id === ownProps.id)
    if(blog === undefined) {
        return {
            blog: undefined
        }
    }
    var canDelete = blog.user === undefined
    if(!canDelete) {
        if(blog.user.username && state.user) {
            if(blog.user.username === state.user.username) {
                canDelete = true
            }
        } else {
            canDelete = true
        }
    }
    return {
        blog,
        canDelete
    }
}

export default connect(
    mapStateToProps,
    {
        showNotification,
        like,
        remove
    }
)(BlogInfo)