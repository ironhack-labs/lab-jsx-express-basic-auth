const React = require("react");
const Layout = require("./Layout");

function Private() {
  return (
    <Layout title="Private">
      <h1>You're logged in, baby!</h1>
      <img src="https://media.giphy.com/media/r1fDuPIcs18d2/giphy.gif"></img>
      <h2>But the session will expire in 10 seconds...</h2>
    </Layout>
  );
}

module.exports = Private;





