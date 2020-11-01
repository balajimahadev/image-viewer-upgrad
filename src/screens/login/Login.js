import React, { Component } from "react";
import "./Login.css";
import Header from "../../common/header/Header";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      usernameRequired: false,
      username: "",
      passwordRequired: false,
      password: "",
      loginError: false,
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true
    };
  }

  inputUsernameHandler = e => {
    this.setState({
      username: e.target.value
    });
    if (!e.target.value) {
      this.setState({ usernameRequired: true });
    } else {
      this.setState({ usernameRequired: false });
    }
  };
  inputPasswordHandler = e => {
    this.setState({
      password: e.target.value
    });
    if (!e.target.value) {
      this.setState({ passwordRequired: true });
    } else {
      this.setState({ passwordRequired: false });
    }
  };
  loginClickHandler = () => {
    this.setState({ loginError: false });

    if (this.state.username !== "" && this.state.password !== "") {
      if (
        this.state.username === "admin" &&
        this.state.password === "admin"
      ) {
        sessionStorage.setItem(
          "access-token",
          "IGQVJXT3hJV0U1YmhLSUFGMExXcFBjZAGRDSDNsWlpHeTZAFb3ZABYjNDcG1wNkphVFY5SUk1bDlUZAGYzN3dCYWlESVZAjTXh4VnFlamdCOUtnb3NkX0w1TUloRDRES08yR3NFYWJCNGFESXpzMEx6TFNidwZDZD"
        );
        this.props.history.push("/home");
      } else {
        this.setState({ loginError: true });
      }
    }
  };

  render() {
    return (
      <div>
        <Header {...this.props} showSearchBarAndProfileIcon={false}/>
        <div className="login-page-content">
          <Card className="login-card">
            <CardContent className="login-card-content">
              <Typography className="login-card-heading" component="div">
                LOGIN
              </Typography>
              <FormControl className="login-card-form-username" required>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  type="text"
                  username={this.state.username}
                  onChange={this.inputUsernameHandler}
                />
                {this.state.usernameRequired ? (
                  <FormHelperText>
                    <span className="red">required</span>
                  </FormHelperText>
                ) : null}
              </FormControl>
              <br/>
              <br/>
              <FormControl className="login-card-form-password" required>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type="password"
                  password={this.state.password}
                  onChange={this.inputPasswordHandler}
                />
                {this.state.passwordRequired ? (
                  <FormHelperText>
                    <span className="red">required</span>
                  </FormHelperText>
                ) : null}
              </FormControl>
              <br/>
              <br/>
              {this.state.loginError ? (
                <FormHelperText>
                  <span className="red">
                    Incorrect username and/or password
                  </span>
                </FormHelperText>
              ) : null}
              <br/>
              <Button
                className="login-card-button"
                variant="contained"
                color="primary"
                disabled={this.state.username === "" || this.state.password === ""}
                onClick={this.loginClickHandler}
              >
                LOGIN
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default Login;