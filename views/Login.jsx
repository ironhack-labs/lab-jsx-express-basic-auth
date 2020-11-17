const React = require('react');
const Layout = require('./Layout');

function Login (props) {
    return (
        <Layout>
            <form id="login-form" action="/auth/login" method="GET">

                <label>Username:</label>
                <br/>
                <input type="text" name="username" placeholder="Your username goes here">
                </input>
                <br/>

                <label>Password:</label>
                <br/>
                <input type="password" name="password" placeholder="Your password goes here">
                </input>
                <br/>

                <button type="submit">Log in!</button>
                
            </form>

            {
                props.errorMessage
                ? <div className="error-message">{props.errorMessage}</div>
                : null
            }
                <p className="account-message">
                Don't you have an account yet?<a href="/auth/signup">Sign up</a>
                </p>
        </Layout>
    )
}