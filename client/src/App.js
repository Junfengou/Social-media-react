import React from "react"
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import Home from "./Components/pages/Home";
import Login from "./Components/pages/Login";
import Register from "./Components/pages/Register";
import MenuBar from "./Components/MenuBar";
import { Container } from "semantic-ui-react";
import './App.css';



function App() {
  return (
    <Router>
      <Container>
        <MenuBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Container>
    </Router>
  );
}

export default App;
