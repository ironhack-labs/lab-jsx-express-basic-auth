const React = require("react");
const Layout = require("./Layout");

function Home() {
  return (
    <Layout title="Home Page">
      <h1>Home Page</h1>
      <button href="/auth/signup">sign up</button>
    </Layout>
  );
}

module.exports = Home;
