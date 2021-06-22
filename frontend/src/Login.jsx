import React from "react";
import cookie from 'react-cookies';
import Modal from 'react-awesome-modal';
import { Redirect } from 'react-router-dom';




class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: "",
        visible : false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadUserIntoCookie = this.loadUserIntoCookie.bind(this);
  }

  openModal() {
      this.setState({
          visible : true
      });
  }

  closeModal() {
      this.setState({
          visible : false
      });
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
        if(result.error) {
          this.openModal();
        } else {
          this.loadUserIntoCookie(result);
          this.props.history.push('/');
        }
        
      });
    event.preventDefault();
  }
  render() {
    if (cookie.load('user') !== undefined) {
      return <Redirect push to='/'  />
    }
    return (
      
      <div >
          <Modal 
                    visible={this.state.visible}
                    width="400"
                    height="300"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                    
                >
                    <div class="modal">
                        <h1>Sorry, you don't exist.</h1>
                        <p>We couldn't find a user with the email "{this.state.email}"</p>
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                    </div>
                </Modal>
                <div class="login">
            <h1>Login</h1>
              <form id="loginForm" method="post" onSubmit={this.handleSubmit}>
                <input onChange={this.handleInputChange} type="text" name="email" placeholder="Email" required="required" />
                  <input onChange={this.handleInputChange} type="password" name="password" placeholder="Password" required="required" />
                  <button type="submit" class="btn btn-primary btn-block btn-large">Let me in.</button>
              </form>
          </div>
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
