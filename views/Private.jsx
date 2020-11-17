const React = require('react');
const Layout = require('./Layout');

function Private() {

    return (
        <Layout>
            <h1>This Page is private</h1>
            <iframe src="https://giphy.com/embed/1d7F9xyq6j7C1ojbC5" width="480" height="351" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/1d7F9xyq6j7C1ojbC5">via GIPHY</a></p>
        </Layout>
    )
}

module.exports = Private; 