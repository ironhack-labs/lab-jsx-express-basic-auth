const React = require('react');
const Layout = require('./Layout');


function Private(props) {
  return(
    <Layout>
      <h1>Secret Page!</h1>
      
      <iframe src="https://giphy.com/embed/fXJyMfUdqVCMPAnPJM" width="406" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/well-yuck-kombucha-fXJyMfUdqVCMPAnPJM">via GIPHY</a></p>
    </Layout>
  )
}


module.exports = Private;