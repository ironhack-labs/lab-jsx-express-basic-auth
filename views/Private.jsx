const React = require('react');
const Layout = require('./Layout');

function Private(props) {
    return (
        <Layout>
            <h1>This is a private page</h1>
            <img src="https://media.giphy.com/media/Pn1gZzAY38kbm/giphy.gif" />
        </Layout>
    )
}

module.exports = Private;