const React = require('react');
const Layout = require('./Layout');


function Example (props) {
    
    return(
        <Layout>
            <h1>You are in the page everybody has access to
            </h1>

            {props.isLoggedIn
                ? <img width="" src="https://filmdaily.co/wp-content/uploads/2020/04/cute-cat-videos-lede.jpg" />
                : null 
                }

        </Layout>
    )
}



module.exports = Example;