const React = require("react");
const Layout = require("./Layout");

function Main(props) {
  return (
    <Layout>
      <h1>main page</h1>
      <a href="/">back to home page</a>
    </Layout>
  );
}

module.exports = Main;
