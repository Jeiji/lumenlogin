import React from "react";
import cookie from 'react-cookies';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadUserIntoCookie = this.loadUserIntoCookie.bind(this);
  }

  loadUserIntoCookie(response) {
    let user = response.user;
    console.log(response.access_token);
    user.token = response.access_token;
    
    cookie.save('user', user, { path: '/' });
  };

  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name
    this.setState({
      [name]: value
    })
  };

  handleSubmit(event) {
    // alert(`YUUUUUP: ${this.state.email}, ${this.state.password}`)
    let formData = new FormData(document.querySelector('#loginForm'))
    const requestOptions = {
      method: 'POST',
      body: formData
    }
    console.log(...formData);
    fetch("/api/login", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.loadUserIntoCookie(result);
      }).then(() => {
        this.props.history.push('/');
      });
    event.preventDefault();
  }
  render() {
    return (
      <div class="login">
        <h1>Login</h1>
          <form id="loginForm" method="post" onSubmit={this.handleSubmit}>
            <input onChange={this.handleInputChange} type="text" name="email" placeholder="Email" required="required" />
              <input onChange={this.handleInputChange} type="password" name="password" placeholder="Password" required="required" />
              <button type="submit" class="btn btn-primary btn-block btn-large">Let me in.</button>
          </form>
      </div>
    )
  };

  // componentDidMount() {
  //   fetch("/api/welcome")
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       this.setState(result);
  //     });
  // }
};

export default Login;
