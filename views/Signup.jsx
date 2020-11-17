const React = require("react");
const Layout = require("./Layout");

function Signup(props) {
  return (
    <Layout>
      <form id="form" action="/auth/signup" method="POST">
        <label>USername</label>
        <br />
        <input type="text" name="username" placeholder="Choose your username" />
        <label>Password</label>
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
        />

        <button type="submit">Signup</button>

        {props.errorMessage ? (
          <div className="error-message">{props.errorMessage}</div>
        ) : null}
      </form>
    </Layout>
  );
}

module.exports = Signup;
