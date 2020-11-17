const React = require('react');
const Layout = require('./Layout');


function Main () {
  return(
    <Layout>
      <img src="/images/cat-attack.jpg" width="500px"/>
      <br/>
      <h2>Thank you for the successful authentication <br/>
        Now this cat wants to attack you! <br/> 
        Quick, <a href="/">return to the homepage!</a></h2>
    </Layout>
  )
}


module.exports = Main;