import React, { useState } from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import NotFound from "./components/Pages/NotFound/NotFound";
import AllBooks from "./components/Books/AllBooks/AllBooks";
import SingleBook from "./components/Books/SingleBook/SingleBook";
import SignIn from "./components/Pages/SignIn/SignIn2/SignIn2";
import UserContext, { getLoggedUser } from "./providers/UserContext";
import ShowProfile from "./components/Users/ShowProfile";
import "./theme.css"
import AllReviews from "./components/Books/Reviews/AllReviews";
import CreateReview from "./components/Books/Reviews/CreateReview";
import Footer from "./components/Base/Footer";
import NavBar from "./components/Base/NavBar/NavBar";
import User2 from "./components/Users/User2";



const App = () => {

  const [user, setUser] = useState(getLoggedUser());


  console.log(`User is logged: ${!!user}`);

  return (
    <div className="App">

      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <NavBar />
          <Switch>
            <Redirect path="/" exact to="/home" />
            <Route path="/home" exact component={Home} />
            <Route path="/profile" exact component={ShowProfile} />
            <Route path="/profile2" exact component={User2} />
            <Route path="/login" exact component={SignIn} />
            <Route path="/register" exact component={SignIn} />
            <Route path="/logout" exact component={SignIn} />
            <Route path="/books" exact component={AllBooks} />
            <Route path="/books/:id" exact component={SingleBook} />
            <Route path="/books/:id/reviews" exact component={AllReviews} />
            <Route path="/books/:id/reviews/create" exact component={CreateReview} />
            <Route path="*" component={NotFound} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
