import React from 'react'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'

class Notification extends React.Component {
    render() {
        var colour = 'black'
        if(this.props.type === 'info') {
            colour = '#76c442'
        } else if(this.props.colour === 'error') {
            colour = 'red'
        }
        const style = {
            borderColor: colour,
            display: this.props.display,
            width: '80%'
        }
        return (
            <div>
                <center>
                    <Panel style={style} className={this.props.type}>
                        <Panel.Body>
                            { this.props.content }
                        </Panel.Body>
                    </Panel>
                </center>
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