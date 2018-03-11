import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
    render() {
        const style = {
            display: this.props.display
        }
        return (
            <div style={style} className={this.props.type}>
                { this.props.content }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        display: state.notification.display,
        content: state.notification.content,
        type: state.notification.type
    }
}

const connectedNotification = connect(
    mapStateToProps
)(Notification)

export default connectedNotification