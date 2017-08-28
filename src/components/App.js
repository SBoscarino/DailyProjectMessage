import React, { Component } from 'react';
import '../styles/App.css';
import Header from './header.js';
import Footer from './footer.js';


class BaseLayout extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Type A Message</h1>
        <ParentComponent />
        <DisplayComponent />
        <Footer />
      </div>
    );
  }
}

class ParentComponent extends Component {
  constructor(props){
    super(props);

    this.state = {
      whatToSay: "",
      whatWasSaid: "",
      arrayOfThings: []
    }
  }

  handleInput = (e) => {
    e.preventDefault();
    //set the state on input change
    console.log(e.target.value)
    this.setState({whatToSay: e.target.value});
  }
  handleSubmit = (e) => {
    let arrayOfThings = [];
    e.preventDefault();
    //check console to see if firing
    console.log("fired");
    //set the state for props and for value (prevents output from appearing when typing)
    this.setState({whatToSay: this.state.whatToSay, whatWasSaid: this.state.whatToSay});
    arrayOfThings.push({thing: this.state.whatToSay})
    //clear our input by resetting state
    this.setState({whatToSay: "", whatWasSaid: ""});

  }
  render() {
    return (
      <div>
          <input onChange={this.handleInput} type="text" placeholder="Add a message!" value={this.state.whatToSay} />
        <div>
          <ChildComponent onClick={(e) => this.handleSubmit} />
          <DisplayComponent array={this.state.arrayOfThings} />
        </div>
      </div>
    );
  }
}

class ChildComponent extends Component {
  render() {
    return (
      <div>What would you like to say?
        <div>
          <button type="submit" onClick={(e) => React.Children.onClick}>Submit</button>
        </div>
      </div>
    );
  }
}

class DisplayComponent extends Component {
  render() {
    return (
      <div>
      {React.Children.map((thing, i) => {
          return (
            <li key={i}>{thing}</li>
          )
        })}
      </div>
    );
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <BaseLayout>
        </BaseLayout>
      </div>
    );
  }
}

export default App;
