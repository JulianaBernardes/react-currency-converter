import React, { Component } from 'react'


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
        
        let from_to = `${this.props.currencyA}_${this.props.currencyB}`
        let url = `https://free.currencyconverterapi.com/apt/v5/convert?q=${from_to}&compact=y`

        fetch(url).then(res=>{

            return res.json()
        })
        .then(json=> {
            let quotation = json[from_to].val
            let currencyB_value = (parseFloat(this.state.currencyA_value) * quotation).toFixed(2)
            this.setState({currencyB_value})
        })



    }

    render() {
        return (
            <div className="converter">
                <h2>{this.props.currencyA} para {this.props.currencyB}</h2>
                <input type="text"
                    onChange={(event) =>{this.setState({currencyA_value:event.target.value})}}></input>
                <input type="button" value="Convert" onClick={this.toConvert}></input>
                <h2>{this.state.currencyB_value}</h2>
            </div>
        )
    }
}
