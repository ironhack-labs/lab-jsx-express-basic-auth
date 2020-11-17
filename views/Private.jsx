const React = require("react")
const Layout = require("./Layout")

function Private(props){
    return(
        <Layout>
            <h1>Private Page</h1>
            <p>You have a cookie and a session</p>

            <img src = "https://media.giphy.com/media/jsSxj0skBXGkljuS08/giphy.gif"/>

            <a href="/">Home page</a>
            <p>Username: {props.user.username}</p>
        </Layout>
    )
}

module.exports = Private;