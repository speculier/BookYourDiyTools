import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BookYourDiyTools } from './BookYourDiyTools';
import { DiyToolCategory, DiyTools, DiyToolState } from './dataModel';

const allTools:DiyTools = {
  diyTools: [
    {  label:'Taille haie 1',
       booked: false,
       generalInfos: { description: 'Taille haie nul à chier', place: 'C1', category: DiyToolCategory.HEDGE_TRIMMER, tradeMark: 'Kubota' }, 
       stateInfos: { state: DiyToolState.VERY_BAD_STATE, isBeingRepaired: false, isBroken: true }
    },
    { label:'Taille haie 2',
      booked: false,
      generalInfos: { description: 'Taille haie en bon état', place: 'C2', category: DiyToolCategory.HEDGE_TRIMMER, tradeMark: 'Black & Decker' }, 
      stateInfos: { state: DiyToolState.GOOD_STATE, isBeingRepaired: false, isBroken: false }
   },
   { label:'Taille haie 3',
     booked: false,
     generalInfos: { description: 'Taille haie vert', place: 'C3', category: DiyToolCategory.HEDGE_TRIMMER, tradeMark: 'Black & Decker' }, 
     stateInfos: { state: DiyToolState.NEW, isBeingRepaired: false, isBroken: false }
  }
  ]
}
 
ReactDOM.render(
  <BookYourDiyTools
  diyTools={allTools}
  />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
