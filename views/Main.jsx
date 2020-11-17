const React = require("react");
const Layout = require("./Layout");

function Main() {
  return (
    <Layout title="Main">
      <h1>Main</h1>
      <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.popsugar.com%2Ftech%2FFunny-Cat-GIFs-35436224&psig=AOvVaw3RgFW1jxmEuNwO2FgCdFu1&ust=1605726213058000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCODzl7aiiu0CFQAAAAAdAAAAABAD" />
      <h2>plain content for you</h2>
    </Layout>
  );
}

module.exports = Main;