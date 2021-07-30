import React, { Component } from 'react'
import './Converter.css'

export default class Converter extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currencyA_value:"",
            currencyB_value:0,
        }
        this.toConvert = this.toConvert.bind(this)
    }

    toConvert(){
        
        let from_to = `${this.props.currencyA}_${this.props.currencyB}`;
        const url = `/.netlify/functions/currency?from_to=${from_to}`;

        fetch(url).then(res=>{
            return res.json()
        })
        .then(json=> {
            let quotation = json[from_to]
            let currencyB_value = (parseFloat(this.state.currencyA_value) * quotation).toFixed(2)
            this.setState({currencyB_value})
        })

    }

    render() {
        return (
            <div className="converter">
                <h2>{this.props.currencyA} to {this.props.currencyB}</h2>
                <input type="text"
                    onChange={(event) =>{this.setState({currencyA_value:event.target.value})}}></input>
                <button type="button" onClick={this.toConvert}>Covert</button>
                <h2>{this.state.currencyB_value}</h2>
                {console.log(this.state.currencyB_value)}
            </div>
        )
    }
}
