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
        
        //const key = process.env.REACT_APP_API_KEY
        //let url = `https://free.currconv.com/api/v7/convert?q=${from_to}&compact=ultra&apiKey=${key}`
        let from_to = `${this.props.currencyA}_${this.props.currencyB}`;
        
        // fetch(url).then(res=>{
            //     return res.json()
            // })
            // .then(json=> {
                //     let quotation = json[from_to]
                //     let currencyB_value = (parseFloat(this.state.currencyA_value) * quotation).toFixed(2)
                //     this.setState({currencyB_value})
                // })
                
                //let url = `https://free.currconv.com/api/v7/convert?q=${from_to}&compact=ultra&apiKey=${key}`
                
                    
                const urlQuotationAPI = `/.netlify/functions/quotation?from_to=${from_to}`;
                try {
                    const quotation = await fetch(urlQuotationAPI).then((res) => res.json());
                    console.log("Quotation " + quotation)
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
