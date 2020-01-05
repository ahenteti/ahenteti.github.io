import * as React from 'react';

import style from './comments-reactcomponent.module.scss';

class CommentsReactComponent extends React.Component {
  componentDidMount() {
    const js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', 'https://utteranc.es/client.js');
    js.setAttribute('repo', 'ahenteti/ahenteti.github.io');
    js.setAttribute('issue-term', 'pathname');
    js.setAttribute('theme', this.props.theme || 'dark-blue');
    js.setAttribute('crossorigin', 'anonymous');
    js.setAttribute('async', 'true');
    this.utterancesContainer.appendChild(js);
  }

  render() {
    return (
      <div class={style.comments}>
        <article-subtitle-webcomponent subtitle='Comments'></article-subtitle-webcomponent>
        <div ref={el => (this.utterancesContainer = el)}></div>
      </div>
    );
  }
}

export default CommentsReactComponent;
