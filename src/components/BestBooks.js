import React from 'react'

import axios from 'axios';
import { Carousel } from 'react-bootstrap'

export class BestBooks extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            numberOfBooks: 0,
            BooksData: ''
        }
    }
    componentDidMount = () => {
        axios.get(`http://localhost:3011/books?email=aboud.coding@gmail.com`).then((booksData) => {
            console.log(booksData);
            this.setState({
                numberOfBooks: booksData.data[0].length,
                BooksData: booksData.data[0].books
            })
        })
    }

    render() {
        return (
            <div>
                {this.state.numberOfBooks > 0 &&
                    this.state.BooksData.map(value =>
                        <>
                            <Carousel>
                                <Carousel.Item>
                                    <p>{value.title}</p>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <p>{value.description}</p>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <p>{value.status}</p>
                                </Carousel.Item>
                            </Carousel>
                        </>
                    )}
            </div>
        )
    }
}

export default BestBooks
