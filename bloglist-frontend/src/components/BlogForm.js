import React from 'react'
import PropTypes from 'prop-types'
import { Panel, Form, FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap'

const BlogForm = ({ title, author, url, handleChange, handleSubmit }) => {
  return (
    <Panel>
        <Panel.Heading>
            <h2>Luo uusi blogi</h2>
        </Panel.Heading>
        <Panel.Body>
            <Form horizontal onSubmit={handleSubmit}>
                <FormGroup>
                    <Col sm={1}>
                        <ControlLabel>
                            title
                        </ControlLabel>
                    </Col>
                    <Col sm={11}>
                        <FormControl
                            value={title}
                            name='title'
                            onChange={handleChange}
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={1}>
                        <ControlLabel>
                            author
                        </ControlLabel>
                    </Col>
                    <Col sm={11}>
                        <FormControl
                            value={author}
                            name='author'
                            onChange={handleChange}
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={1}>
                        <ControlLabel>
                            url
                        </ControlLabel>
                    </Col>
                    <Col sm={11}>
                        <FormControl
                            value={url}
                            name='url'
                            onChange={handleChange}
                        />
                    </Col>
                </FormGroup>        
                <FormGroup>
                    <Col sm={2}>
                        <FormControl type="submit" className='btn btn-primary' value='Luo' />
                    </Col>
                </FormGroup>
            </Form>
        </Panel.Body>
    </Panel>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  author: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}


export default BlogForm