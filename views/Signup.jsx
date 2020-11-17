const { PromiseProvider } = require("mongoose");
const React = require("react");
const Layout = require("./Layout");

function Signup(props) {
  return (
    <Layout>
      <h2>Sign up Page</h2>
      <form action="/auth/signup" method="POST">
        <label>Username:</label>
        <input type="text" name="username" value="" />
        <br />
        <label>Password:</label>
        <input type="password" name="password" value="" />
        <br />
        <button type="submit">SIGN UP</button>
      </form>
      {/*Pass the props, which you can find in the route*/}
      {/*ternary operator - is prop.errorMessage true, pass the value*/}

      {props.errorMessage 
       ? <div className="error-message">{props.errorMessage}</div>
       : null}
    </Layout>
  );
}

module.exports = Signup;
