import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BookYourDiyTools } from './BookYourDiyTools';
import { DiyToolsStore } from './DiyToolsStore';

let diyStore = new DiyToolsStore();
var allTools = diyStore.getAllTools();

ReactDOM.render(

  // Instanciate main component
  <BookYourDiyTools
  diyTools={allTools}
  />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
