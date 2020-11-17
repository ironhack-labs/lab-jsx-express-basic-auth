const React = require("react");
const Layout = require("./Layout");

function Private (props) {
    return(
        <Layout>

            <h1>Private site</h1>
            <img src="https://media.giphy.com/media/7IrPwAVJmhAwV0bwjj/giphy.gif" alt=""/>
            <button><a href="/"> Home Page</a></button>

        </Layout>
    )
}

module.exports = Private;