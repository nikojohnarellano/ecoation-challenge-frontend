import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import Config from '../config/config'
import CircularProgress from 'material-ui/CircularProgress'
import ApiHelper from '../util/api'

export default class IntegerPanel extends Component {

    state = {
        loading : false,
        newInt : "",
        displayInt : "",
        integerErrorText : ""
    }

    async getCurrentInteger() {
        try {
            this.setState({ loading : true })
            
            ApiHelper.headers({ 'Authorization' : this.props.token })
            let data = await ApiHelper.get('api/int/current')
    
            this.setState({ loading : false })

            if(data) {
                this.setState({ displayInt : data.currentInteger })
            }
        } catch(e) {
            console.log(e)
        }
    }

    async getNextInteger() {
        try {
            this.setState({ loading : true })

            ApiHelper.headers({ 'Authorization' : this.props.token })
            let data = await ApiHelper.get('api/int/next')

            this.setState({ loading : false })

            if(data) {
                this.setState({ displayInt : data.currentInteger })
            }
        } catch(e) {
            console.log(e)
        }
    }

    async updateInteger() {
        if (isNaN(parseInt(this.state.newInt))) {
            this.setState({ integerErrorText : "You must enter a valid integer." })
            return;
        }

        if(this.state.newInt < 0) {
            this.setState({ integerErrorText : "You must enter a non-negative integer." })
            return;
        }

        try {
            this.setState({ loading : true })

            ApiHelper.headers({ 'Authorization' : this.props.token })
            let data = await ApiHelper.post('api/int/update', { newInt : this.state.newInt })
            
            this.setState({ loading : false })
            if(data) {
                this.setState({ displayInt : data.currentInteger, integerErrorText : "" })
            }
        } catch(e) {
            console.log(e)
        }
    }

    render() {
        return(
            <div>
                 {
                    this.state.loading &&
                    <div className="loading">
                        <CircularProgress size={80} thickness={5} />
                    </div>
                }
                <div className="row center" style={{ textAlign : "center", marginTop : 30 }}>
                    <Subheader style={{ fontSize : 30, }}>Current Integer: </Subheader>
                    <Subheader style={{ fontSize : 80, marginTop : 10 }}>{ this.state.displayInt }</Subheader>
                </div>
                <div className="row" style={{ marginTop : 30 }}>
                    <RaisedButton label="Current" 
                                onClick={async () => { await this.getCurrentInteger() }} 
                                labelColor="white"
                                backgroundColor="blue"
                                style={{ marginTop : 30, marginRight : 35 }}/>
                    <RaisedButton label="Next"  
                                backgroundColor="green"
                                labelColor="white"
                                onClick={async () => { await this.getNextInteger() }}
                                style={{ marginTop : 30, marginLeft : 35 }}/>
                </div>
                <div className="row" style={{ marginTop : 30 }}>
                        <TextField
                            errorStyle={{ textAlign : "left" }}
                            errorText={this.state.integerErrorText}
                            hintText="New Integer"
                            type='text'
                            onChange={(e, newInt) => this.setState({ newInt }) }
                            value={this.state.newInt}
                            style={{ width : "40%"}}
                        />
                </div>
                <div className="row">
                    <RaisedButton label="Update"  
                            backgroundColor="red"
                            labelColor="white"
                            onClick={async () => { await this.updateInteger() }}/>
                </div>
            </div>
        )
    }
}