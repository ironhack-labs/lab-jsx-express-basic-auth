const React = require("react");
const Layout = require("./Layout");

function Error() {
  return (
    <Layout title="Error">
      <h1>Error</h1>
      <p>There was an error, check the terminal on the server.</p>
    </Layout>
  );
}

module.exports = Error;
