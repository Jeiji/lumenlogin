import React from "react";
import cookie from 'react-cookies'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user : cookie.load('user')
    };

    this.logout = this.logout.bind(this);

  }

  logout(event) {
    // alert(`YUUUUUP: ${this.state.email}, ${this.state.password}`)
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${this.state.user.token}`
      }
    };
    fetch("/api/logout", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        cookie.remove('user');
      }).then(() => {
        this.props.history.push('/login');
      });
    event.preventDefault();
  }

  render() {
    return (
      <div class="login">
        <h1>Heyo, { this.state.user.name }!</h1>
        <p>It seems you've logged into my humble loggin' in app.</p>
        <p><em class="small">This app was made for <strong>login</strong>. And that's just what it do.</em></p>
        <button onClick={this.logout} type="submit" class="btn btn-primary btn-block btn-large">That's enough outta' you.</button>
      </div>
    )
  }

  // componentWillMount() {
  //   // fetch("/api/welcome")
  //   //   .then((res) => res.json())
  //   //   .then((result) => {
  //   //     console.log(result);
  //   //     this.setState(result);
  //   //   });
  //   this.setState(cookie.load('user'))
  //   console.log(this.state.user)
  // }

}

export default Home;
