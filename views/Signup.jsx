const { PromiseProvider: props } = require("mongoose");
const React = require("react");
const Layout = require("./Layout");

function Signup(props) {
  return(
    <Layout>
      <form action="/auth/signup" method="POST">
        <label name="username">Username</label>
        <input name="username" placeholder="Username"></input>

        <label  name="password">Password</label>
        <input type="password" name="password" placeholder="password"></input>
        <button type="submit">Create Account</button>

      </form>
      {
        props.errorMessage
        ? <div className="error-message"> {props.errorMessage}</div>
        : null
      }
      
    </Layout>
  );
}

module.exports = Signup;
