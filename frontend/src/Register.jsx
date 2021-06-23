import React from "react";
import cookie from 'react-cookies';
import Modal from 'react-awesome-modal';
import { Redirect } from 'react-router-dom';




class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: "",
        name: "",
        visible : false,
        responseError: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadUserIntoCookie = this.loadUserIntoCookie.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
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
      [name]: value,
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
    fetch("/api/register", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if(result.status === "error") {
          this.setState({
            responseError : result.message
          });
          console.log(this.state.responseError);
          this.openModal();
        } else if ( !result.user ) {

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
                    <div class="mode mt-5">
                  <h1>Nope.</h1>
                  <p>{this.state.responseError}</p>
                  <button class="btn btn-secondary" onClick={this.closeModal}>Close</button>
              </div>
                </Modal>
                <div class="login">
            <h1>Register</h1>
              <form id="loginForm" method="post" onSubmit={this.handleSubmit}>
                <input onChange={this.handleInputChange} type="text" name="name" placeholder="Name" required="required" />
                <input onChange={this.handleInputChange} type="text" name="email" placeholder="Email" required="required" />
                <input onChange={this.handleInputChange} type="password" name="password" placeholder="Password" required="required" />
                <button type="submit" class="btn btn-primary btn-block btn-large">Sign me up!</button>
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

export default Register;
