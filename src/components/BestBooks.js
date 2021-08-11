import React from 'react'
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Carousel, Button } from 'react-bootstrap'
import FormModal from './FormModal';

export class BestBooks extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            numberOfBooks: 0,
            BooksData: [],
            displayAddModal: false
        }
    }
    componentDidMount = () => {
        const { user } = this.props.auth0;

        axios.get(`${process.env.REACT_APP_PORT}/books?email=${user.email}`).then((booksData) => {
            console.log(booksData);
            this.setState({
                numberOfBooks: booksData.data[0].books.length,
                BooksData: booksData.data[0].books
            })
        })
    }
    handleDisplayModal = () => {
        this.setState({ displayAddModal: !this.state.displayAddModal });
    }

    handleAddBookForm = (e) => {

        e.preventDefault();
        this.handleDisplayModal(); // hide the modal after form submission
        // console.log('name: ', e.target.catName.value);
        // console.log('breed: ', e.target.catBreed.value);
        // console.log('Image: ', e.target.catImage.value);

        const body = {
            email: this.props.auth0.user.email, // we are getting the email of the user from auth0
            title: e.target.title.value,
            description: e.target.description.value,
            status: e.target.status.value,
            img_url: e.target.img_url.value,
        };

        axios.post(`${process.env.REACT_APP_PORT}/book`, body).then(booksData => {

            this.state.booksData.push(booksData.data);
            this.setState({
                booksData: this.state.booksData
            });
        }).catch(error => alert(error));
    }
    handleDeleteBook = (bookId) => {
        axios.delete(`${process.env.REACT_APP_PORT}/book/${bookId}`).then(res => {

            if (res.data.ok === 1) {
                const tempBookObj = this.state.booksData.filter(book => book._id !== bookId);
                this.setState({
                    booksData: tempBookObj
                });
            }
        }).catch(error => alert(error))
    }


    render() {
        return (
            <div>
                <>
                    <Button variant="secondary" onClick={() => this.handleDisplayModal()}>Add a book</Button>
                    <FormModal
                        show={this.state.displayAddModal}
                        handleDisplayModal={this.handleDisplayModal}
                        handleSubmitForm={this.handleAddBookForm}
                    />

                    < Carousel >

                        {this.state.numberOfBooks > 0 &&
                            this.state.BooksData.map(value =>

                                <Carousel.Item>
                                    <img
                                        className="d-block w-30"
                                        style={{ height: '500px', width: '350px', marginLeft: "38%" }}
                                        src={value.img_url}
                                        alt="Book"
                                    />
                                    <Carousel.Caption  >
                                        <h3 style={{ fontSize: '18px', backgroundColor: "#333", width: "34%", textAlign: 'center', marginLeft: "34%" }}>{value.title}</h3>
                                        <p style={{ fontSize: '12px', backgroundColor: "#333", width: "34%", textAlign: 'center', marginLeft: "34%" }}>{value.description}</p>
                                        <p style={{ fontSize: '12px', backgroundColor: "#333", width: "20%", textAlign: 'center', marginLeft: "34%" }}>{value.status}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )}
                    </Carousel >
                </>
            </div>
        )
    }
}

export default withAuth0(BestBooks);
