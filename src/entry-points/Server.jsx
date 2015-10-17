import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../containers/App.jsx';
import Login from '../containers/Login.jsx';

export default ReactDOMServer.renderToString(
	<App>
		<Login/>
	</App>
);
