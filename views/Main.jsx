const React = require("react");
const Layout = require("./Layout");

function Main() {
  return (
    <Layout title="Home Page">
      <h1>Main Page</h1>
      <img src="./../images/home-cat.png" width="200" />
      <a href="/">Home</a>
    </Layout>
  );
}

module.exports = Main;
