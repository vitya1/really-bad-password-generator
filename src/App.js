import React, { Component } from 'react';
import { Input, Button, Form, InputGroup, FormGroup } from 'reactstrap';
import generateList from './lib/generator';
import logo from './logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PasswordList } from './components/PasswordList';
import { Logotype } from './components/Logotype';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input_placeholder: "Type something...",
      source_password: "",
      created_passwords: [],
      valid_input: true,
    };

    this.updateSourcePasswordValue = this.updateSourcePasswordValue.bind(this);
    this.generateButtonHandler = this.generateButtonHandler.bind(this);
  }

  get passwordListSize() {
    return 72;
  }

  componentDidMount() {
    setInterval(() => {
      const placeholders = [
        "your password",
        "something",
        "your name",
        "your girlfriend's name",
        "your cat's name",
        "a word",
        "your favorite movie character",
        "a birth date",
        "an actor's name",
        "anything else",
        "a random string"
      ];
      const value = placeholders[Math.floor(Math.random() * placeholders.length)];
      this.setState({ input_placeholder: "Type " + value + '...' });
    }, 2000);
  }

  updateSourcePasswordValue(event) {
    this.setState({
      source_password: event.target.value
    });
  }

  generateButtonHandler(event) {
    event.preventDefault();
    if (this.state.source_password.length === 0) {
      this.setState({
        valid_input: false,
        created_passwords: []
      });
      return;
    }
    //shuffling passwords
    let new_passwords = generateList(this.state.source_password, true, true);
    for (let i = new_passwords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [new_passwords[i], new_passwords[j]] = [new_passwords[j], new_passwords[i]];
    }
    this.setState({
      valid_input: true,
      created_passwords: new_passwords.slice(0, this.passwordListSize)
    });
  }

  render() {
    

    return (
      <div className="App">

        <main role="main" className="App-main container text-center">
          <Logotype src={logo} className="App-logo" alt="logo" />
          <h1>Really bad password generator</h1>
          <p className="lead">Create, Look, Never Use.</p>
          <p className="text-muted small">Check the password list generator on <a href="/" target="_blank" rel="noopener noreferrer">Github</a></p>

          <Form className="row justify-content-md-center">
            <FormGroup className="col-6">
              <InputGroup>
                <Input type="text" name="password"
                  value={this.state.source_password}
                  onChange={this.updateSourcePasswordValue}
                  placeholder={this.state.input_placeholder}
                  invalid={!this.state.valid_input}
                />
                &nbsp;
                  <Button color="info" onClick={this.generateButtonHandler}>Generate</Button>
              </InputGroup>
            </FormGroup>
          </Form>

          {
            <PasswordList value={this.state.created_passwords}></PasswordList>
          }
        </main>

        <footer className="App-footer text-center">
          <div className="inner">
            <div className="text-muted small">Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>
          </div>
        </footer>

      </div>
    );
  }
}

export default App;
