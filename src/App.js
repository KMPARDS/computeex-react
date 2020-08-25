import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Uphold from './components/Uphold/Uphold';
import BtcToEs from './components/BtcToEs/BtcToEs';
import Lending from './components/Lending/Lending';
import Multiexchange from './components/Multiexchange/Multiexchange';
import Orders from './components/Orders/Orders';
import Exchange from './components/Exchange/Exchange';
import './App.css';
import './custom.css';

function App() {
  return (
    <BrowserRouter>
      <Route path="/*" component={Navbar} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/uphold" exact component={Uphold} />
        <Route path="/btc-to-es" exact component={BtcToEs} />
        <Route path="/lending" exact component={Lending} />
        <Route path="/multiexchange" exact component={Multiexchange} />
        <Route path="/orders" exact component={Orders} />
        <Route path="/Exchange" exact component={Exchange} />
      </Switch>
      <Route path="/*" component={Footer} />
    </BrowserRouter>
  );
}

export default App;
