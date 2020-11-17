const React = require("react");
const Layout = require("./Layout");

function Home() {
  return (
    <Layout title="Home Page">
      <h1>Home Page</h1>
      <a href="/auth/signup">
        <button>SIGN UP</button>
      </a>

      <a href="/auth/login">
        <button>Login</button>
      </a>

      <a href="/secret">
        <button>Protected page (requires authentication!)</button>
      </a>

      <a href="/auth/logout">
        <button>Logout</button>
      </a>
    </Layout>
  );
}

module.exports = Home;
