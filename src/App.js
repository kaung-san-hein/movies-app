import React from "react";
//import logo from './logo.svg';
import "./App.css";
import Movies from "./components/movies";
import NavBar from "./components/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Customers from "./components/cutomers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./components/logout";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";

toast.configure();

class App extends React.Component {
  state = {};
  componentDidMount() {
    try {
      const user = auth.getCurrentUser();
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={Movies} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
