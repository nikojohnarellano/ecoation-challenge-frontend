import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import './App.css';
import Login from './components/Login'
import IntegerPanel from './components/IntegerPanel'

const paperStyle = {
  height: 450,
  width: 400,
  marginTop: 20,
  paddingTop : 40,
  paddingRight : 0,
  paddingBottom : 20,
  paddingLeft: 0,
  textAlign: "center"
};

class App extends Component {

  state = {
    token    : "",
    loggedIn : false
  }

  constructor(props) {
    super(props)

    this.setLogin = this.setLogin.bind(this)
  }

  setLogin(token) {
    this.setState({ loggedIn : true, token : token})
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-4">
            <Paper style={paperStyle} zDepth={5}>
            {
              this.state.loggedIn ?
              <IntegerPanel token={this.state.token} /> : <Login setLogin={ this.setLogin }/>
            }
            </Paper>  
          </div>
        </div>
      </div>
    );
  }
}

export default App;
