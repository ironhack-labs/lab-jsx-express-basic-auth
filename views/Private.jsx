const React = require("react");
const Layout = require("./Layout");

function Private() {
  return (
    <Layout title="Home Page">
      <h1>PRIVATE - KEEP OUT</h1>
      <a href = "https://giphy.com/gifs/soultrain-dance-dancing-l4Ep38qG0pmR5dNZK" width = "200" />
      <a href="/">Home</a>
    </Layout>
  );
}

module.exports = Private;