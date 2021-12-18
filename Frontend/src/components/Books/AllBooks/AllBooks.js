import React, { useEffect, useState, useContext } from "react";
import { withRouter } from 'react-router-dom';
import Container from "../../Base/Container/Container";
import Book from "../Book/Book";

import { BASE_URL } from "../../../common/constants";
import Header from "../../Base/Header/Header";
import AppError from "../../Pages/AppError/AppError";

import Loading from "../../Pages/Loading/Loading";
import Rating from "../Ratings/Rating";
import "./AllBook.css"
import UserContext from "../../../providers/UserContext";
import { MDBFreeBird, MDBInput, MDBCol, MDBRow, MDBCardBody, MDBCardTitle, MDBBtn, MDBContainer, MDBEdgeHeader } from
    "mdbreact";

import Notification from "../../Base/Notification/Notification";

const AllBooks = (props) => {
    const history = props.history;
    const word = props.location.search;
    const searchWord = word.substring(6);

    const [error, setError] = useState(null);
    const [appBooks, updateBooks] = useState([]);


    const [details, setDetails] = useState(false);

    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;

    useEffect(() => {

        fetch(`${BASE_URL}/books?name=${searchWord}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            }
        })
            .then((response) => response.json())
            .then((result) => {
                if (Array.isArray(result)) {
                    console.log(result)
                    updateBooks(result);
                } else {
                    throw new Error(result.message);
                }
            })
            .catch((error) => setError(error.message))
    }, [searchWord]);

    const toggle = (id) => {

        const bookToUpdate = appBooks.find((book) => book.id === id);
        console.log("bookToUpdate", bookToUpdate);
        console.log("bookToUpdate borrower ", bookToUpdate.borrower);
        console.log("loggedUser ", loggedUser);

        if (!bookToUpdate) {
            setError(`No book with id ${id} found!`);
            return;
        }
        if (!bookToUpdate.borrower) {



            fetch(`${BASE_URL}/books/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                },
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result.error) {
                        throw new Error(result.message);
                    }

                    const updatedBooks = appBooks.map((book) => {
                        if (book.id === result.id) {
                            return result;
                        }

                        return book;
                    });

                    updateBooks(updatedBooks);
                })
                .catch((error) => setError(error.message))
        }


        else if (bookToUpdate.borrower) {
            if (bookToUpdate.borrower.id !== loggedUser.id) {
                return alert('This book is borrowed by another user')
            }
            fetch(`${BASE_URL}/books/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                },
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log('Result ', result);

                    if (result.error) {
                        throw new Error(result.message);
                    }

                    const updatedBooks = appBooks.map((book) => {
                        if (book.id === result.id) {
                            return result;
                        }

                        return book;
                    });

                    updateBooks(updatedBooks);
                })
                .catch((error) => alert(<Notification erroMessage={error.message} />));
        }
    };


    const rateBook = (id, pts) => {
        const bookToUpdate = appBooks.find((book) => book.id === id);
        if (!bookToUpdate) {
            setError(`No book with id ${id} found!`);
            return;
        }


        fetch(`${BASE_URL}/books/${id}/rate`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
            body: JSON.stringify({ points: pts }),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.error) {
                    throw new Error(result.message);
                }

                const newBook = { ...bookToUpdate };
                const foundRatingByUser = newBook.ratings.find((rating) => rating.madeBy.id === loggedUser.id);
                if (!foundRatingByUser) {
                    newBook.ratings.push(result);
                }

                if (foundRatingByUser) {
                    console.log("IF Already rated!");
                    // const updatedRating = { ...foundRatingByUser };
                    foundRatingByUser.points = result.points;
                }
                // if (!foundRatingByUser) {
                //     newBook.ratings.push(result);
                // }
                //newBook.ratings.push(result);

                console.log("ratings Arr", newBook.ratings);
                const books2 = appBooks.map((book) => {
                    if (book.id === newBook.id) {
                        return newBook;
                    }
                    return book;
                })
                console.log("Rate result", result);
                updateBooks(books2);
            })
            .catch((error) => alert(error.message))
    }




    if (error) {
        return (
            <div>
                <Container>
                    <AppError message={error} />
                </Container>
            </div>
        );
    }


    const compareByNameAsc = (book1, book2) => {
        if (book1.name < book2.name) {
            return -1;
        }
        if (book1.name > book2.name) {
            return 1;
        }
        return 0;
    }

    const sortBooks = (books) => {
        let sortedByName = books.sort(compareByNameAsc);
        return sortedByName;
    }

    // const neww = sortBooks(appBooks);
    console.log("Sorted names", appBooks);

    return (
        <div >
            {/*<Header />*/}
            <MDBEdgeHeader color="mdb-color purple-gradient" style={{ padding: "100px" }}> <Header /> </MDBEdgeHeader>

            {/*  <button onClick={() => updateBooks(sortBooks(appBooks))}>SORT by Name</button>*/}
            <div className="all-books">
                {appBooks &&
                    appBooks.map((book) => (<div>



                        <Book key={book.id} book={book} toggle={toggle} />
                        {book.ratings.find(r => r.madeBy.id === loggedUser.id) ?
                            <p id="hasRated">You rated with <b>{book.ratings.find(r => r.madeBy.id === loggedUser.id).points}</b> points</p> : <p id="notRated">You haven't rated this book yet</p>}
                        <p id="rate-text">Rate book with 1-5 points</p>
                        <span id="rate-btns">
                            <button onClick={() => rateBook(book.id, 1)}>1</button>
                            <button onClick={() => rateBook(book.id, 2)}>2</button>
                            <button onClick={() => rateBook(book.id, 3)}>3</button>
                            <button onClick={() => rateBook(book.id, 4)}>4</button>
                            <button onClick={() => rateBook(book.id, 5)}>5</button>
                        </span>
                    </div>
                    ))}

            </div>
        </div>
    );
};

export default withRouter(AllBooks);
