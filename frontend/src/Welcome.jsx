import React from "react";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: "...",
    };
  }
  render() {
    return <h1>Hello, {this.state.name}</h1>;
  }

  componentDidMount() {
    fetch("/api/welcome")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState(result);
      });
  }
}

export default Welcome;
