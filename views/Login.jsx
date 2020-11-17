const React = require("react");
const Layout = require("./Layout");

function Login(props) {
  return (
    <Layout title="Login Page">
    <form action="/auth/login" method="POST">
        <label name="username">Username</label>
        <input name="username" placeholder="Username"></input>

        <label  name="password">Password</label>
        <input type="password" name="password" placeholder="password"></input>
        <button type="submit">Log In</button>

    </form>
    </Layout>
  );
}

module.exports = Login;
