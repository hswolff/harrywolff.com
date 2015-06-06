require('./styles.less');

import React from 'react';
import DocumentTitle from 'react-document-title';
import connectToStores from 'flummox/connect';

import utils from '../../utils';
import SquareBox from '../../components/squareBox';

class HomePage extends React.Component {
  render() {
    return (
      <div className="row">
        <DocumentTitle title="Home | Harry Wolff" />
        <div className="col-md-12 no-gutter blog-post-container">
          <SquareBox
            className="tile-separater tile-separater-blog"
            title="Blog Posts"
            href="http://blog.hswolff.com/"
          />
          {(this.renderBlogPosts())}

          <SquareBox
            className="tile-separater tile-separater-linkroll"
            title="Linkroll"
            href="https://pinboard.in/u:hswolff"
          />
          {(this.renderPinterestPosts())}
        </div>
      </div>
    );
  }

  renderBlogPosts() {
    return this.props.blog.map(function(post, index) {
      return (
        <SquareBox
          key={index}
          href={post.url}
          title={post.title}
          subTitle={utils.prettyDate(post.date)}
          moreText={utils.trimString(post.excerpt, 30)}
        />
      );
    });
  }

  renderPinterestPosts() {
    return this.props.pinboard.map(function(item, index) {
      return (
        <SquareBox
          key={index}
          href={item.url}
          title={item.title}
          subTitle={item.tags.join(', ')}
        />
      );
    });
  }
}

HomePage.propTypes = {
  blog: React.PropTypes.array,
  pinboard: React.PropTypes.array
};


HomePage = connectToStores(HomePage, ['social']);

export default HomePage;
