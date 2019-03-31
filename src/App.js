import React, { Component } from 'react';
import { Provider } from 'react-redux'
import Header from './common/header/Header';
import {BrowserRouter, Route} from 'react-router-dom'
import store from './store'
import Home from './pages/home'
import Detail from './pages/detail/detailLoadable'
import Login from './pages/login'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
            <BrowserRouter>
                <Header />
                <Route path = '/' exact component={Home}></Route>
                <Route path = '/detail/:id' exact component={Detail}></Route>
                <Route path = '/Login' exact component={Login}></Route>
            </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
