import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Rating from '../Ratings/Rating';
import { Card, Button } from 'react-bootstrap';
import Review from '../Reviews/Review';
import { BASE_URL } from '../../../common/constants';
import { MDBBtn } from 'mdbreact';


const Book = (props) => {

  const book = props.book;
  const toggle = props.toggle;
  const history = props.history;
  console.log("BOOK", book);


  const [details, setDetails] = useState(false);

  const handleToggle = () => toggle(book.id);

  const averageRating = () => {
    if (!book.ratings) {
      return 0;
    }
    let sum = book.ratings.reduce((acc, rating) => {
      acc += rating.points;
      return acc;
    }, 0);

    const avgRating = sum / book.ratings.length;
    return avgRating;
  }

  const avv = averageRating()
  const avRating = avv.toFixed(2);


  return (
    <Card style={{
      width: '17rem', height: '40rem', backgroundColor: "rgb(191,191,191)", backgroundImage: "linear-gradient(to right bottom, #f2e6ff, #d9b3ff,#cc99ff, #b366ff, #8c1aff)",
      padding: "1.8rem", marginTop: "2rem", marginLeft: "0rem", marginRight: "0rem"
    }}>
      <Card.Img variant="top" src={book.poster} height="270px" width="50px" />
      <Card.Body>
        <Card.Title>{book.name}</Card.Title>
        <Card.Text>
          <p><b>Author:</b> {book.author}</p>
          <input type="checkbox" id={`todo-item-${book.id}`} checked={book.borrower ? true : false} onChange={handleToggle} value={book.borrower ? true : false} /> <label htmlFor={`todo-item-${book.id}`}>Borrowed</label>
          <hr />
          {avv ? <p><b>Avg rating: </b>{avRating}/5</p> : <p><b>Avg rating: </b>No ratings yet</p>}
        </Card.Text>
        <button onClick={() => { history.push(`/books/${book.id}`) }} className='btn-elegant'>Show More</button>
      </Card.Body>
    </Card >
  )
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  toggle: PropTypes.func,
};

export default withRouter(Book);
