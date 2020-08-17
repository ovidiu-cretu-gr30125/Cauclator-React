import React, { Component } from 'react';
import './App.css';
import KeyPad from "./KeyPad";
import Result from "./Result";

class App extends Component {
  constructor(){
    super();

    this.state = {
      result: "0"
    }
  }
  onClick = button => {

    if(button === "="){
      if(this.state.result.length===1){
        this.setState({
          result:"0"
        })
      }else {
        this.calculate()
      }
    }

    else if(button === "CE"){
      this.reset()
    }
    else if(button === "C"){
      this.backspace()
    }
    else  if((button==="0"  || button==="+" || button==="-" || button==="/" || button==="*") && this.state.result.includes("0") && this.state.result.length===1) {
      this.setState({
        result : "0"
      })
    }
    else if(this.state.result.match("0") && this.state.result.length===1 ){
      this.setState({
            result : button
          }
      )
    }
    else if(this.state.result.match("0") && this.state.result.length===1 && button==="."){
      this.setState({
            result: this.state.result + button
          }
      )
    }
    else {
      this.setState({
        result: this.state.result + button
      })
    }
  };


  calculate = () => {
    var checkResult = ''
    if(this.state.result.includes('--')){
      checkResult = this.state.result.replace('--','+')
    }

    else {
      checkResult = this.state.result
    }

    try {
      this.setState({
        // eslint-disable-next-line
        result: (eval(checkResult) || "" )+ ""
      })
    } catch (e) {
      this.setState({
        result: "Hatz ai gresit!"
      })

    }
  };

  reset = () => {
    this.setState({
      result: "0"
    })
  };

  backspace = () => {
    if (this.state.result.length === 1) {
      this.setState({
            result: "0"
          })
    } else {
      this.setState({
        result: this.state.result.slice(0, -1)
      })
    }
    ;
  }

  render() {
    return (
        <div>
          <div className="calculator-body">
            <h1 id="h1">Ovidiu's Calculator</h1>
            <Result result={this.state.result}/>
            <KeyPad onClick={this.onClick}/>
            <footer> <small>&copy; Copyright 2020, Cretu Ovidiu-Daniel</small> </footer>
          </div>
        </div>
    );
  }
}

export default App;
