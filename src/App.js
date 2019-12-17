import React from 'react';
import logo from './logo.svg';
import './App.css';
import withAuthenticator from './iform-auth'
import awsconfig from './aws-exports'
import {API} from 'aws-amplify'

import IFormPages from './iFormPages'

API.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <IFormPages/>
      </header>
    </div>
  );
}

const ifbConfig = {
  servername: 'zerionsoftware',
//  client_id: '418fa689ea639ff641a4765b0cc8262bc77187e5',
  client_id: '8429caaf3010cfb31dab0a026610395e90346291',
redirect_uri: 'http://localhost:3000'
}


export default withAuthenticator(App, ifbConfig);
