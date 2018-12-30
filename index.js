/** @format */
import React , {Component} from 'react'
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import { Provider } from 'react-redux'
import store from './redux/store'
import App from './App'


export default class index extends Component {

    render(){
      return (
        <Provider store={store}>
          <App/>
        </Provider>
      )
    }
  }

AppRegistry.registerComponent(appName, () => index);
