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

    async toConvert(){
        let from_to = `${this.props.currencyA}_${this.props.currencyB}`;
        const urlQuotationAPI = `../.netlify/functions/quotation?from_to=${from_to}`;
        try {
            const quotation = await fetch(urlQuotationAPI).then((res) => res.json());
            
            let currencyB_value = (parseFloat(this.state.currencyA_value) * quotation).toFixed(2)
            this.setState({currencyB_value})

        }catch(err){
            console.log(err)
        }
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
