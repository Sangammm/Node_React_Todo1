import React, { Component } from "react";
import Todolist from "./Components/Todolist";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      Todos: [],
      iserror: false
    };
  }

  componentDidMount = () => {
    this.Updatetodolist();
  };

  Updatetodolist = () => {
    fetch("/view", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          this.setState({ iserror: true });
        }
      })
      .then(data => {
        console.log(data);
        this.setState({ Todos: data, iserror: true });
      });
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch("/addtodo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: this.state.name
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
          this.Updatetodolist();
      });
  };

  render() {
    return (
      <div className="App">
        <form method="post" onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            placeholder="Ente text"
          />
          <input type="submit" />
        </form>

        <div>
          <h1>Todos:</h1>
          {this.state.iserror ? (
            <Todolist todos={[...this.state.Todos]} />
          ) : (
            <h2>Error</h2>
          )}
        </div>
      </div>
    );
  }
}
export default App;
