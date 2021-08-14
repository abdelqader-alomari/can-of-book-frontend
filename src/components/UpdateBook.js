import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { withAuth0 } from "@auth0/auth0-react";

export class UpdatedBook extends Component {
    render() {
        return (
            <div>

                <Modal show={this.props.show} onHide={this.props.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update a Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(e) => this.props.UpdateBook(e)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book Name</Form.Label>
                                <Form.Control
                                    type="text" name="title" defaultValue={this.props.updateBookObj.title} placeholder="Enter book name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book Description</Form.Label>
                                <Form.Control name="description" defaultValue={this.props.updateBookObj.description}
                                    type="text" placeholder="Book Description" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Status</Form.Label>
                                <Form.Control type="text" name="status" defaultValue={this.props.updateBookObj.status} placeholder="Book Status" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book Image</Form.Label>
                                <Form.Control type="text" name="img_url" defaultValue={this.props.updateBookObj.img_url} placeholder="Enter the image URL" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Update Book
                            </Button>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.props.close}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}


export default withAuth0(UpdatedBook);