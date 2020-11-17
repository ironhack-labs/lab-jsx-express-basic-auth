const React = require("react");
const Layout = require("./Layout");

function Private() {
  return (
    <Layout>
      <h1>PRIVATE!! YOU MUST BE ONE OF US</h1>
      <img src="https://media.giphy.com/media/NmerZ36iBkmKk/giphy.gif" />
    </Layout>
  );
}

module.exports = Private;
