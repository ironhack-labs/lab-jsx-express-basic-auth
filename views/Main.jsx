const React = require('react');
const Layout = require('./Layout');

function Main(props) {
    return (
        <Layout>
            <h1>Main Page</h1>
            <p>Anybody logged in can see this</p>
            <img src="https://static.india.com/wp-content/uploads/2015/11/089.jpg?impolicy=Medium_Resize&w=1200&h=800" />
            <a href="/">Home</a>
        </Layout>

    )
}

module.exports = Main;