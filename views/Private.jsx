const React = require('react');
const Layout = require('./Layout');


function Private () {
  return(
    <Layout>
      <h2>This page is private, <br/> 
      how did you come here? </h2>
      <img src="https://media.giphy.com/media/elPiadNl05XWg/giphy.gif"/>
    </Layout>
  )
}


module.exports = Private;