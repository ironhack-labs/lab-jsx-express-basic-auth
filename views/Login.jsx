const React = require("react");
const Layout = require("./Layout");

function Login() {
  return (
    <Layout title="Login">
      <h1>Login</h1>
      <form action="/auth/login" method="POST">
        <label>Username:</label>
        <input type="text" name="username" />
        <br />

        <label>Password:</label>
        <input type="password" name="password" />
        <br />

        <button type="submit">LOGIN</button>
      </form>
    </Layout>
  );
}

module.exports = Login;