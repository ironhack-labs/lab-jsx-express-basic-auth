const React = require("react");
const Layout = require("./Layout");

function Private(props) {
  return (
    <Layout>
      <h1>This is a secret page!</h1>
      <img
        width="200"
        src="https://media.giphy.com/media/BzyTuYCmvSORqs1ABM/giphy.gif"
        alt="funny cat"
      />

      <p>Username: {props.user.username}</p>
    </Layout>
  );
}

module.exports = Private;
