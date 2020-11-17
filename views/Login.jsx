const React = require("react");
const Layout = require("./Layout");

function Signup(props) {
  return (
    <Layout>
      <form action="/auth/login" method="POST">
        <label>username</label>
        <input type="text" name="username" />
        <br />
        <label>password</label>
        <input type="password" name="password" />
        <br />
        <button type="submit">LOG IN</button>
        {props.errorMessage ? <p>{props.errorMessage}</p> : null}
      </form>
    </Layout>
  );
}

module.exports = Signup;
