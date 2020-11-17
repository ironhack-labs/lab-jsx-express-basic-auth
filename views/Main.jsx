const React = require("react");
const Layout = require("./Layout");

function Main(props) {
  return (
    <Layout>
      <img
        width="200"
        src="https://i.pinimg.com/originals/8f/35/96/8f3596b39ed36dd4eba1a7c51fe21189.jpg"
        alt="funny cat"
      />

      <a href="/">Back Home</a>
    </Layout>
  );
}

module.exports = Main;
