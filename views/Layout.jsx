const React = require("react");

function Layout(props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title> {props.title} </title>
        <link rel="stylesheet" href="/stylesheets/style.css" />
      </head>

      <body>
        <nav>
          <div>
            <img src="/images/ih-logo.png" width="80px" alt="app logo" />
          </div>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/auth/signup">Signup</a>
            </li>
            <li>
              <a href="/auth/login">Login</a>
            </li>
          </ul>
        </nav>

        {props.children}
      </body>
    </html>
  );
}

module.exports = Layout;
