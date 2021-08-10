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
                numberOfBooks: booksData.data[0].books.length,
                BooksData: booksData.data[0].books
            })
        })
    }

    render() {
        return (
            <div>
                <>
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
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )}
                    </Carousel >                        </>
            </div>
        )
    }
}

export default BestBooks