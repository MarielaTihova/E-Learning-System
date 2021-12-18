import React, { useState } from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import NotFound from "./components/Pages/NotFound/NotFound";
import SignIn from "./components/Pages/SignIn/SignIn2/SignIn2";
import UserContext, { getLoggedUser } from "./providers/UserContext";
import ShowProfile from "./components/Users/ShowProfile";
import "./theme.css"
import Footer from "./components/Base/Footer";
import NavBar from "./components/Base/NavBar/NavBar";


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
            <Route path="/login" exact component={SignIn} />
            <Route path="/register" exact component={SignIn} />
            <Route path="/logout" exact component={SignIn} />
            <Route path="*" component={NotFound} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
