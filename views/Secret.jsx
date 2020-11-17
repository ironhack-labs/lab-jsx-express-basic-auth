const React = require("react")
const Layout = require("./Layout")

function Secret(props){
    return(
        <Layout>
            <h1>Secret Page</h1>
            <pre>/secret</pre>
            <p>You have a cookie and a session</p>

            <img src = "https://www.top13.net/wp-content/uploads/2015/10/perfectly-timed-cat-photos-funny-cover.jpg"/>

            <a href="/">Home page</a>
            <p>Username: {props.user.username}</p>
        </Layout>
    )
}

module.exports = Secret;