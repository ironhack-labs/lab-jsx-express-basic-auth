const { PromiseProvider } = require("mongoose");
const React = require("react");
const Layout = require("./Layout");

function Signup(props) {
  return(
    <Layout>
        <form id="form" action="/auth/signup" method="POST">
          <label>UserName</label>
          <br />

          <input type="text" name="username" placeholder="Your username" required minlength="4"/>

          <label>Password</label>
          <br />
          <input type="password" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required/>

          <button type="submit">Create Account</button>

          {
            props.errorMessage ? <div className = "error-message">{props.errorMessage}</div>: null
          }
        </form>
    </Layout>
  )
}

module.exports = Signup;
