const React = require("react");
const Layout = require("./Layout");

function Signup(props) {
  return (
    <Layout>
      <form
        id="form"
        action="/auth/signup"
        method="POST"
        onSubmit="validateForm()"
      >
        <label>Username</label>
        <br />
        <input type="text" name="username" placeholder="Your username" />

        <label>Password</label>
        <br />
        <input type="password" name="password" />

        <input type="submit" value="Create account" />

        {props.errorMessage ? (
          <div className="error-message" id="error-message">
            {" "}
            {props.errorMessage}{" "}
          </div>
        ) : (
          <div className="error-message" id="error-message">
            {" "}
            {props.errorMessage}{" "}
          </div>
        )}
      </form>
    </Layout>
  );
}

module.exports = Signup;
