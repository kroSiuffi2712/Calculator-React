import React, { Component } from 'react'
import '../assets/css/Style.css';

import Display from '../components/DisplayComponent.js'
import Keyboard from '../components/keyboardComponent.js'
import Clear from '../components/ClearComponent.js'
import * as math from 'mathjs';

class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: "0",
            equal: false,
            decimal: false,
            prevVal: ""

        }

        this.handleClick = this.handleClick.bind(this);
        this.handleEqual = this.handleEqual.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handleClick = (val) => {
        console.log(val);
        if (this.stringValidation(val)) this.setStateValue(val);
    }

    handleEqual = () => {
        if (this.stringValidation("=")) {
            let result = this.checkValue(this.state.input);
            this.setState({ input: result, equal: true, decimal: false, prevVal: result })
        }
    }

    handleClear = () => {
        this.setState({ input: "0", equal: false, decimal: false, prevVal: "" })

    }

    setStateValue = (val) => {
        let isCero = this.state.input.length === 1 && this.state.input === "0" ? true : false;
        let isDecimal = ((val === ".") || (!/[x/+*-]/.test(val) && this.state.decimal)) ? true : false;
        let exp = this.getValue(val);

        this.setState((state) => ({
            input: (state.equal || isCero) ? val : exp,
            equal: false,
            decimal: isDecimal,
        }));
    }

    getValue(val) {
        let exp = "";
        if (this.state.input.length > 0) {
            let str = this.state.input.substring(this.state.input.length - 1, this.state.input.length);

            //
            if (str === "-" && this.state.input.length > 2) {
                if (/[/+*]$$/.test(this.state.input) && /[/+*]/.test(val)) {
                    exp = this.state.input.substring(0, this.state.input.length - 2) + val;
                }
                else {
                    exp = this.state.input + val;
                }
            }

            //
            if (val === "-" && (/[/+*]/.test(str))) {
                exp = this.state.input + val;
            }
            else if (/[x/+*-]/.test(str) && str !== val && /[x/+*-]/.test(val)) {
                exp = this.state.input.substring(0, this.state.input.length - 1) + val
            }
            else {
                exp = this.state.input + val;
            }

            return exp;

        }
    }

    checkValue(value) {
        let str = value;

        if ((/[*+-/]$$/ || /[*+-/]$/).test(value)) {
            if (/[*+-/]$$/.test(value)) {
                str = value.substring(0, value.length - 2);
            }
            else if (/[*+-/]$/.test(value)) {
                str = value.substring(0, value.length - 1);
            }
        }
        let formula = this.state.prevVal !== 0 ? this.state.prevVal + str : str;
        let mathEval = math.evaluate(formula)
        return Number.isInteger(mathEval) ? mathEval : math.round(mathEval, 4);
    }

    stringValidation(val) {
        let isOperator = (/[x/+*-.]/.test(val));
        //return false = if val is operator and equal is true OR input is null-empty and val is operator
        if ((isOperator && this.state.equal && this.state.prevVal === "0") || (!this.state.input && isOperator) || (val === "=" && this.state.input === "0") || (this.state.decimal && val === ".") || (this.state.input.length === 1 && this.state.input === "0" && isOperator) || (this.state.prevVal === this.state.input && val === "=" && this.state.equal)) {
            return false;
        }
        else if (Object.keys(this.state.input).length > 0 && isOperator) {
            let str = this.state.input.substring(this.state.input.length - 1, this.state.input.length);
            if (str == val) return false;
            return true;
        }
        else
            return true;
    }

    render() {
        return (
            <div className="container">
                <Display input={this.state.input} />
                <Keyboard input={this.state.input} handleClick={this.handleClick} handleEqual={this.handleEqual} handleDecimal={this.handleDecimal} />
                <Clear handleClear={this.handleClear} />
            </div>
        )
    }

};



export default Calculator