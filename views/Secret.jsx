const React = require("react");
const Layout = require("./Layout");

function Secret(props) {
  return (
    <Layout>
      <h1>Secret Page</h1>
      <pre>/secret</pre>
      <p>You have an authenticated cookie and a session!</p>

      <p>Username: {props.user.username}</p>
    </Layout>
  );
}

module.exports = Secret;
