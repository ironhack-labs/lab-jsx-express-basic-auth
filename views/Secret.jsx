const React = require('react');
const Layout = require('./Layout');


function Secret (props) {
    
    return(
        <Layout>
            <h1>User authenticated page</h1>
             <p>Username:{props.user.username}</p>
             <img src="https://giphy.com/gifs/trippy-rainbow-panda-xThuWdQdTh6C0BaBc4" />
        </Layout>
    )
}



module.exports = Secret;