import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './BookFormModal'
import Button from 'react-bootstrap/Button';
import UpdatedBook from './UpdateBook';




class BestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ownerEmail: this.props.auth0.user.email,
            books: [],
            displayAddModal: false,
            showUpdateModal: false,
            updateBookObj: {}
        };
    }

    componentDidMount() {
        this.fetchBooks();
    }

    handelDisplayModal = () => {
        this.setState({ displayAddModal: true });
    }

    handelUpdatedModal = (item) => {
        this.setState({ showUpdateModal: true, updateBookObj: item });
    }


    fetchBooks = async () => {
        await axios.get(
            `http://localhost:3011/books?email=${this.state.ownerEmail}`
        ).then(axiosResponse => {
            this.setState({
                books: axiosResponse.data
            });
        }).catch(error => alert(error));
    };

    addBook = (e) => {
        e.preventDefault();

        const body = {
            ownerEmail: this.props.auth0.user.email, // we are getting the email of the user from auth0
            title: e.target.title.value,
            description: e.target.description.value,
            status: e.target.status.value,
            img_url: e.target.img_url.value,
        };

        axios.post(`http://localhost:3011/book`, body).then(axiosResponse => {
            // console.log(axiosResponse.data);
            this.state.books.push(axiosResponse.data);
            this.setState({
                books: this.state.books

            });
            console.log(this.state.books);

        }).catch(error => alert(error));
        this.setState({ displayAddModal: false });
    }


    deleteBook = (index) => {
        axios.delete(
            `http://localhost:3011/book/${index}`
        ).then(axiosResponse => {
            if (axiosResponse) {
                const deletedBook = this.state.books.filter(book => book._id !== index);
                this.setState({
                    books: deletedBook
                });
            }
        }).catch(error => alert(error));
    }

    UpdateBook = ((e) => {
        e.preventDefault();
        const bookId = this.state.updateBookObj._id;
        const body = {
            title: e.target.title.value,
            description: e.target.description.value,
            status: e.target.status.value,
            img_url: e.target.img_url.value,
        };

        axios.put(`http://localhost:3011/book/${bookId}`, body).then((axiosResponse) => {
            console.log('updated Book Data:  ', axiosResponse.data);


            const updatedBookArr = this.state.books.map(book => {

                if (book._id === bookId) {
                    book.title = axiosResponse.data.title;
                    book.description = axiosResponse.data.description;
                    book.status = axiosResponse.data.status;
                    book.img_url = axiosResponse.data.img_url;

                    return book;
                }
                return book;

            });
            this.setState({ books: updatedBookArr })
            this.handelUpdatedModal({})
            this.setState({ showUpdateModal: false });


        }).catch(error => alert(error));
    });


    render() {
        return (
            <div>
                <>
                    <Button variant="secondary" onClick={() => this.handelDisplayModal()}>Add a Book</Button>

                    <BookFormModal
                        show={this.state.displayAddModal}
                        handelDisplayModal={this.handelDisplayModal}
                        addBook={this.addBook}
                    />

                    {this.state.showUpdateModal &&
                        <UpdatedBook
                            show={this.state.showUpdateModal}
                            close={this.handelUpdatedModal}
                            UpdateBook={this.UpdateBook}
                            updateBookObj={this.state.updateBookObj}
                        />
                    }
                    <Carousel>
                        {this.state.books.length > 0 &&
                            this.state.books.map((book, id) => (
                                <Carousel.Item key={id}>
                                    <img
                                        className="d-block w-30"
                                        style={{ height: '500px', width: '350px', marginLeft: "38%" }}
                                        src={book.img_url}
                                        alt="Book"
                                    />
                                    <Carousel.Caption>
                                        <h3 style={{ fontSize: '18px', backgroundColor: "#333", width: "34%", textAlign: 'center', marginLeft: "34%" }}>{book.title}</h3>
                                        <p style={{ fontSize: '12px', backgroundColor: "#333", width: "34%", textAlign: 'center', marginLeft: "34%" }}>{book.description}</p>
                                        <p style={{ fontSize: '12px', backgroundColor: "#333", width: "20%", textAlign: 'center', marginLeft: "34%" }}>{book.status}</p>
                                        <Button variant="outline-danger" onClick={() => this.deleteBook(book._id)}>Delete Book</Button>
                                        <Button variant="outline-danger" onClick={() => this.handelUpdatedModal(book)}>Update Book</Button>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                    </Carousel>
                </>
            </div>
        );
    }
}

export default withAuth0(BestBooks);
