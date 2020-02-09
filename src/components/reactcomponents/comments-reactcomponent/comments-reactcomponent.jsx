import * as React from 'react';

import './comments-reactcomponent.scss';
import * as commonConstants from 'common/constants.js';

class CommentsReactComponent extends React.Component {
  componentDidMount() {
    this.calcUtterancesScript();
  }

  componentDidUpdate() {
    this.calcUtterancesScript();
  }

  render() {
    return (
      <div className='comments-reactcomponent'>
        <div className='inner'>
          <article-subtitle-webcomponent subtitle='Comments'></article-subtitle-webcomponent>
          <div ref={el => (this.utterancesContainer = el)}></div>
        </div>
      </div>
    );
  }

  calcUtterancesScript() {
    this.utterancesContainer.innerHTML = '';
    const js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', 'https://utteranc.es/client.js');
    js.setAttribute('repo', 'ahenteti/ahenteti.github.io');
    js.setAttribute('issue-term', 'pathname');
    js.setAttribute('theme', this.calcUtterancesTheme(this.props.theme));
    js.setAttribute('crossorigin', 'anonymous');
    js.setAttribute('async', 'true');
    this.utterancesContainer.appendChild(js);
  }

  calcUtterancesTheme(projectTheme) {
    if (projectTheme === commonConstants.DARK_THEME) {
      return 'dark-blue';
    }
    return 'github-light';
  }
}

export default CommentsReactComponent;
