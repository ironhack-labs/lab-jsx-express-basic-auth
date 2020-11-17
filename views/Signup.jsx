const React = require("react");
const Layout = require("./Layout");

function Signup(props) {
  return (
    <Layout title="Signup">
      <h1>Signup</h1>
      <form action="/auth/signup" method="POST">
        <label>Username:</label>
        <input type="text" name="username" />
        <br />

        <label>Password:</label>
        <input type="password" name="password" />
        <br />

        <button type="submit">SIGNUP</button>
      </form>
      { props.errorMessage
        ? <h2 style={{color: 'red'}}>{ props.errorMessage }</h2>
        : null
      }
      
    </Layout>
  );
}

module.exports = Signup;
