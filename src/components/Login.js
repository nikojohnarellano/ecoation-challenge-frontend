import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import ApiHelper from '../util/api'


export default class Login extends Component {
    state = {
        email : "",
        password: "",
        emailErrorText : "",
        passwordErrorText : "",
        dialogMessage : "",
        loading : false,
        open  : false,
    }

    async signInUser() {
         if(this.validateInput()) {
            try {
                this.setState({ loading : true }) 

                let params = {
                    email    : this.state.email,
                    password : this.state.password,
                }

                let data = await ApiHelper.post('api/signin', params)

                this.setState({ loading : false }) 

                if(data.success) {
                    this.props.setLogin(data.token)
                } else {
                    this.setState({ dialogMessage : data.msg, open: true  })
                }

             } catch(e) {
                this.setState({ dialogMessage : e.msg, loading : false})
             }
         }
    }

    async registerUser() {
        if(this.validateInput()) {
            try {
                this.setState({ loading : true }) 
                let params = {
                    email    : this.state.email,
                    password : this.state.password,
                }

                let data = await ApiHelper.post('api/signup', params)

                this.setState({ loading : false }) 
                
                if(data.success) {
                    this.setState({ dialogMessage : data.msg + ". You can now sign in.", open: true  })
                } else {
                    this.setState({ dialogMessage : data.msg, open: true  })
                }
            } catch(e) {
               let data = await e.json()
               this.setState({ dialogMessage : e.msg })
            }
        }
    }

    validateInput() {
        let flag = false;
        let emailErrorMessage = ""
        let passwordErrorMessage = ""

        if (!this.validateEmail(this.state.email)) {
            flag = true;
            emailErrorMessage = "The e-mail address is invalid."
        }

        if(this.state.email.length === 0) {
            flag = true;
            emailErrorMessage = "This field is required."
        }

        if(this.state.password.length === 0) {
            flag = true;
            passwordErrorMessage = "This field is required."
        }

        if(flag) {
            this.setState({
                emailErrorText : emailErrorMessage,
                passwordErrorText : passwordErrorMessage
            })

            return false
        }

        return true
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    render() {
        return (   
                    
                    <form className="form-signin">
                          {
                            this.state.loading &&
                            <div className="loading">
                                <CircularProgress size={80} thickness={5} />
                            </div>
                          }
                          <Subheader style={{ fontSize : 30, textAlign: "left"}}>Ecoation Integer Service Challenge</Subheader>
                          <TextField
                              floatingLabelText="E-mail Address"
                              errorStyle={{ textAlign : "left" }}
                              errorText={this.state.emailErrorText}
                              onChange={(e, email) => this.setState({ email }) }
                              value={this.state.email}
                          />
                          <br/>
                          <TextField
                              floatingLabelText="Password"
                              errorStyle={{ textAlign : "left" }}
                              errorText={this.state.passwordErrorText}
                              type='password'
                              onChange={(e, password) => this.setState({ password }) }
                              value={this.state.password}
                          />
                          <br/>
                          <RaisedButton label="Sign In" 
                            onClick={async () => { await this.signInUser() }}
                            primary 
                            style={{ marginTop : 30, marginRight : 35 }}/>
                          <RaisedButton label="Register" 
                            secondary 
                            onClick={async () => { await this.registerUser() }}
                            style={{ marginTop : 30, marginLeft : 35 }}/>
                            <Dialog
                                title={this.state.dialogMessage}
                                actions={<FlatButton
                                    label="Close"
                                    primary={true}
                                    onClick={() => { this.setState({open: false}); }}
                                />}
                                modal={false}
                                open={this.state.open}
                                onRequestClose={() => { this.setState({open: false}); }}
                                contentStyle={{ width : "50%", height : 200 }}
                                 />
                    </form>
                    
        );
      }
    
}