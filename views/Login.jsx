const React = require("react");
const Layout = require("./Layout");

function Login(props) {
  return(
    <Layout title="Log in">
      <form action="/auth/login" method="POST">
      <label>Username:</label>
      <input type="text" name="username" />
      <br />
      <label>Password:</label>
      <input type="text" name="password" />
      
      <br />
      <button type="submit">LOG IN</button>
    {
        props.errorMessage
          ?<div>{props.errorMessage}</div>
          :null
    }
    
      </form>
    </Layout>
  )
}

module.exports = Login;
