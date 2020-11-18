const React = require("react");
const Layout = require("./Layout");

function Home() {
  return (
    <Layout title="Home Page">
      <h1>Home Page</h1>
      <a href = "/Main">Main</a>
      <a href = "/Private">Private</a>
    </Layout>
  );
}

module.exports = Home;
