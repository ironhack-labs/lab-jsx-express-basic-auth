const React = require("react");
const Layout = require("./Layout");

function Home(props) {
  return (
    <Layout title="Home Page">
      <h1>Home Page</h1>
      {
      props.userIsLoggedIn
       ? <img src="http://www.diarioeldia.cl/sites/default/files/2_66.jpg"/>
       :null
    }
    </Layout>
    
  );
}

module.exports = Home;
