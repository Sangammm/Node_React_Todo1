import React, { Component } from "react";
import Todolist from "./Components/Todolist";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Form
} from "react-bootstrap";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      Todos: [],
      iserror: false,
      isloggedin: false,
      inlogin: false
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
        if (res.ok) {
          return res.json();
        } else {
          this.setState({ iserror: true });
        }
      })
      .then(data => {
        this.setState({ Todos: data, iserror: false });
      });
  };

  delete = id => {
    fetch("/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id
      })
    })
      .then(res => {
        if (res.ok) return res.json();
        else this.setState({ iserror: true });
      })
      .then(data => {
        this.setState({ Todos: data });
      });
  };

  toggle = (id, a) => {
    fetch("/toggle", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        completed: a
      })
    })
      .then(res => {
        if (res.ok) return res.json();
        else this.setState({ iserror: true });
      })
      .then(data => {
        this.setState({ Todos: data });
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
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          this.setState({ iserror: true });
        }
      })
      .then(data => {
        console.log("Aemjj");
        this.setState({ Todos: data, iserror: false, name: "" });
      });
  };

  render() {
    return (
      <div className="App">
        {this.state.isloggedin ? (
          <React.Fragment>
            <form method="post" onSubmit={this.handleSubmit}>
              <input
                type="text"
                onChange={this.handleChange}
                placeholder="Ente text"
                value={this.state.name}
              />
              <input type="submit" />
            </form>

            <div>
              <h1>Todos:</h1>
              {!this.state.iserror ? (
                <Todolist
                  todos={[...this.state.Todos]}
                  delete={this.delete}
                  toggle={this.toggle}
                />
              ) : (
                <h2>Error</h2>
              )}
            </div>
          </React.Fragment>
        ) : this.state.inlogin ? (
          <React.Fragment>
            <h2>Login</h2>
            <Form>
              <FormGroup controlId="formBasicEmail">
                <FormLabel>Email address</FormLabel>
                <FormControl type="email" placeholder="Enter email" />
              </FormGroup>

              <FormGroup controlId="formBasicPassword">
                <FormLabel>Password</FormLabel>
                <FormControl type="password" placeholder="Password" />
              </FormGroup>
              <Button
                variant="primary"
                type="submit"
                onClick={this.setState({ isloggedin: true })}
              >
                Login
              </Button>
            </Form>
            <p>
              Not have a account?
              <Button
                variant="primary"
                onClick={() => this.setState({ inlogin: false })}
              >
                SignUp
              </Button>{" "}
            </p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h2>SignUp</h2>
            <Form>
              <FormGroup controlId="formBasicEmail">
                <FormLabel>Email address</FormLabel>
                <FormControl type="email" placeholder="Enter email" />
              </FormGroup>

              <FormGroup controlId="formBasicPassword">
                <FormLabel>Password</FormLabel>
                <FormControl type="password" placeholder="Password" />
              </FormGroup>
              <FormGroup controlId="formBasicPassword">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl type="password" placeholder="Confirm Password" />
              </FormGroup>
              <Button variant="primary" type="submit">
                SignUp
              </Button>
            </Form>
            <p>
              Already have an account? Login
              <Button
                variant="primary"
                onClick={() => this.setState({ inlogin: true })}
              >
                Login
              </Button>
            </p>
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default App;
