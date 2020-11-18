const React = require("react");
const Layout = require("./Layout");

function Login(props) {
  return (
    <Layout>
      <form
        id="form"
        action="/auth/login"
        method="POST"
        onSubmit="validateForm()"
      >
        <label>Username</label>
        <br />
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Your username"
        />

        <label>Password</label>
        <br />
        <input type="password" id="password" name="password" />

        <input type="submit" value="Submit" />
      </form>

      {props.errorMessage ? (
        <div className="error-message" id="error-message">
          {" "}
          {props.errorMessage}
        </div>
      ) : null}

      <p className="account-message">
        Don't have an account? <a href="/auth/signup">Sign up</a>
      </p>
    </Layout>
  );
}

module.exports = Login;
