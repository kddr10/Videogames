import "./App.css";
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Create from "./components/Create/Create";
import Detail from "./components/Detail/Detail";

function App() {
  return (
    <BrowserRouter>
      <Switch>
      <Route exact path="/" component={Landing} />
      <Route path='/home' component={Home}/>
      <Route path='/create' component={Create}/>
      <Route path='/detail/:id' component={Detail}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
