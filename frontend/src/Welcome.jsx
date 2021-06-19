import React from "react";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  render() {
    return <h1>Hello, Jeiji</h1>;
  }

  componentDidMount() {
    fetch("/api/welcome")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }
}

export default Welcome;
