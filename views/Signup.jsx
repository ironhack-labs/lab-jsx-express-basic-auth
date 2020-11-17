const React = require("react");
const Layout = require("./Layout");

function Signup(props) {
  return (
    <Layout>
      <form id="form" action="/auth/signup" method="POST">
        <label>Username</label>
        <br />
        <input type="text" name="username" placeholder="Your username" />

        <label>Password</label>
        <br />
        <input type="password" name="password" />

        <button type="submit">Create account</button>

        {props.errorMessage ? (
          <div className="error-message"> {props.errorMessage} </div>
        ) : null}
      </form>
    </Layout>
  );
}

module.exports = Signup;
