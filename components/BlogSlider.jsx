import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Fetch from 'react-fetch'

const propTypes = {
  location: PropTypes.object.isRequired,
};

function BlogSlider({ location }) {
  const post = location.query['post'];

  function getFetchUri (post) {
    console.log("post: " + post);
    return "https://www.googleapis.com/drive/v3/files?q='" +
           post +
           "'+in+parents&key=AIzaSyDmj1s8QUQnoqwZCNTqdc15KPsjMAGaF2A";
  }

  return (
    <div>
      <div>blog post: {post}</div>
       <Fetch url={getFetchUri(post)}>
        <TestComponent/>
       </Fetch>
    </div>
  );
}

class TestComponent extends React.Component {
  render() {
    const images = [];
    if (this.props.files)
      for (var file of this.props.files) {
        var uri = "https://drive.google.com/uc?export=download&id=" +
                  file.id;
        images.push(
          <img key={file.id} src={uri} width="50px" height="50px"></img>
        );
      }
    return (<div>{images}</div>);
  }
}

BlogSlider.propTypes = propTypes;

export default BlogSlider;
