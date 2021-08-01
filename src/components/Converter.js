import React, { Component } from 'react'
import './Converter.css'

export default class Converter extends Component {

    
    constructor(props) {
        super(props)
        
        this.state = {
            currencyA_value:"",
            currencyB_value:0,
            USD_BRL: 0,
            BRL_USD: 0,
            EUR_BRL: 0,
            BRL_EUR: 0,
            USD_EUR: 0,
            EUR_USD: 0
        }
        this.toConvert = this.toConvert.bind(this)
    }

    async toConvert(){
        let from_to = `${this.props.currencyA}_${this.props.currencyB}`;
        if(!this.state[from_to]){
            const urlQuotationAPI = `../.netlify/functions/quotation?from_to=${from_to}`;
            try {
                await fetch(urlQuotationAPI)
                    .then((res) => res.json())
                    .then(response =>{
                        // Updates the chosen quotation state
                        this.setState({ [from_to]: response[from_to] })
                    })
            }catch(err){
                console.log(err)
            }
        }
        let quotation = this.state[from_to]
        let currencyB_value = (parseFloat(this.state.currencyA_value) * quotation).toFixed(2)
        this.setState({currencyB_value})

    }

    render() {
        return (
            <div className="converter">
                <h2>{this.props.currencyA} to {this.props.currencyB}</h2>
                <input type="text"
                    onChange={(event) =>{this.setState({currencyA_value:event.target.value})}}></input>
                <button type="button" onClick={this.toConvert}>Convert</button>
                <h2>{this.state.currencyB_value}</h2>
            </div>
        )
    }
}