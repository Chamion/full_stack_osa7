import React from 'react'
import { Panel } from 'react-bootstrap'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <Panel>
        <Panel.Body>
            <div style={hideWhenVisible}>
              <button onClick={this.toggleVisibility} className='btn btn-primary'>{this.props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
              {this.props.children}
              <button onClick={this.toggleVisibility} className='btn btn-default'>peru</button>
            </div>
        </Panel.Body>
      </Panel>
    )
  }
}

export default Togglable