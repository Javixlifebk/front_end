import React, { Component } from "react";

class UsingFetch extends Component {
  constructor() {
    super();
    this.getUsers = this.getUsers.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  async getUsers() {
    // With error handling
    let body = {
      userId: 1111,
      title: "This is POST request with body",
      completed: true
    };
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify(body)
    })
      .then(response => {
        let json = response.json();
        console.log(json);
        this.setState({ users: json })
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .catch(error => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <h3>Using Fetch in React for API call</h3>
        <hr />
        {users &&
          users.map((user, index) => {
            return <p key={user.id}>{user.name}</p>;
          })}
        <div />
      </div>
    )
  }
}

export default UsingFetch;