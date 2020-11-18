const React = require('react');
const Layout = require('./Layout');


function Main(props) {
  return(
    <Layout>
      <h1>cat pic</h1>
      
      <iframe src="https://giphy.com/embed/mlvseq9yvZhba" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/funny-cat-mlvseq9yvZhba">via GIPHY</a></p>

    </Layout>
  )
}


module.exports = Main;