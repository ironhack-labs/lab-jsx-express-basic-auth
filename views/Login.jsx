const React = require("react");
const Layout = require("./Layout");

function Login(props) {
  return (
    <Layout>
      <form id="form" action="/auth/login" method="POST">
        <label>Username</label>
        <input type="text" name="username" placeholder="Your username" />
        <br />

        <label>Password</label>
        <input type="password" name="password" />

        <button type="submit">Log In</button>
      </form>

      {props.errorMessage ? (
        <div className="error-message">{props.errorMessage}</div>
      ) : null}

      <p className="account-message">
        Don't have an account? <a href="/auth/signup">Sign Up</a>
      </p>
    </Layout>
  );
}

module.exports = Login;
