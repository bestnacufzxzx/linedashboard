import React, { Component } from "react";
import "./App.css";
import MenuBar from "./Layout/MenuBar";
import Header from "./Layout/Header";
import Containers from "./containers/containers";
import Footer from "./Layout/Footer";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/dashboard";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MenuBar></MenuBar>
        <Containers>
          <Header></Header>
          <Route exact path="/" component={Dashboard} />
          <Footer></Footer>
        </Containers>
      </BrowserRouter>
    );
  }
}

export default App;
