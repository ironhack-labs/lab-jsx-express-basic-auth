const React = require ("react"); 
const Layout = require ("./Layout"); 

function Login (props){
    return(
        <Layout>
            <h2>Login Page</h2>
            <form action="/auth/login" method="POST">
            <label>Username:</label>
            <input type="name" name="username"/>

            <br />

            <label>Password:</label>
            <input type="password" name="password"/>
            <br />

            <button type="submit">LOG IN</button>
             {/*Pass the props, which you can find in the route*/}
            {/*ternary operator - is prop.errorMessage true, pass the value*/}

            {props.errorMessage 
            ? <div className="error-message">{props.errorMessage}</div>
            : null}

            </form>
        </Layout>
    )
}

module.exports = Login; 