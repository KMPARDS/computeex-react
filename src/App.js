import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Uphold from './components/Uphold/Uphold';

function App() {
  return (
    <BrowserRouter>
      <Route path="/*" component={Navbar} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/uphold" exact component={Uphold} />
      </Switch>
      <Route path="/*" component={Footer} />
    </BrowserRouter>
  );
}

export default App;
