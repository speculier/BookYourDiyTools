import './BookYourDiyTools.css';

import React from 'react';
import { DiyTools, DiyToolCategory, DiyToolState } from './dataModel';
import { ListBox } from 'primereact/listbox';
//import PrimereactStyle from 'primereact/primereact.internal.stylelinks';

export class BookYourDiyTools extends React.Component <{}> {

  diyTools: DiyTools | undefined;

  constructor()
  {
    super({});

    this.diyTools = {
			diyTools: [
        { booked: false,
           generalInfos: { label:'Taille haie 1', description: 'Taille haie nul à chier', place: 'C1', category: DiyToolCategory.TAILLE_HAIE, tradeMark: 'Kubota' }, 
           stateInfos: { state: DiyToolState.TRES_MAUVAIS_ETAT, isBeingRepaired: false, isBroken: true }
        },
        { booked: false,
          generalInfos: { label:'Taille haie 2', description: 'Taille haie super', place: 'C2', category: DiyToolCategory.TAILLE_HAIE, tradeMark: 'Black & Decker' }, 
          stateInfos: { state: DiyToolState.BON_ETAT, isBeingRepaired: false, isBroken: false }
       }
      ]
    };

    this.state = {
      diyTools: [ {
        booked: false,
        generalInfos: { label:'Taille haie 2', description: 'Taille haie super', place: 'C2', category: DiyToolCategory.TAILLE_HAIE, tradeMark: 'Black & Decker' }, 
        stateInfos: { state: DiyToolState.BON_ETAT, isBeingRepaired: false, isBroken: false }
       }
      ]
    };
    }

    render()
    {   
      return (
        <div className="BookYourDiyTools">
        <ListBox
            value={this.diyTools}
          //  options={this.diyTools}
            onChange={e => this.setState({ diyTools: e.value })}
            optionLabel='label'
          />
        </div>
      );
    }
}
