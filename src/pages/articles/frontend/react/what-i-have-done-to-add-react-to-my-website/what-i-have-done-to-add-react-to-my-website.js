import 'components/webcomponents/webcomponents.js';
import 'common/common.js';
import './what-i-have-done-to-add-react-to-my-website.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import HelloReact from './hello-reactcomponent';

const reactComponentContainer = document.getElementById('first-react-component');
ReactDOM.render(<HelloReact />, reactComponentContainer);
