const React = require("react");
const Layout = require("./Layout");

function Signup(props) {
  return (
    <Layout>
      <form id="form" action="/auth/signup" method="POST">
        <label>Username</label>
        <input type="text" name="username" placeholder="Your username" required />
        <br />

        <label>Password</label>
        <input type="password" name="password" placeholder="Password" required />
        <br />

        <button type="submit">Create account</button>
        {
          props.errorMessage
            ? <div className="error-message"> {props.errorMessage} </div>
            : null
        }
      </form>
    </Layout>
  )
}

module.exports = Signup;
