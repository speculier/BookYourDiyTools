import './BookYourDiyTools.css';

import React from 'react';
import { DiyTools, DiyTool } from './dataModel';
import { ListBox } from '@bit/primefaces.primereact.listbox';
import { PrimereactStyle } from '@bit/primefaces.primereact.internal.stylelinks';
import { Panel } from '@bit/primefaces.primereact.panel';

export interface IProps
{
  diyTools: DiyTools;
}

interface IState
{
  selectedDiyTool: DiyTool;
}

export class BookYourDiyTools extends React.Component<IProps, IState> {

  constructor(props: IProps)
  {
    super(props);

    this.state = { 
      selectedDiyTool: this.props.diyTools.diyTools[0] 
    };
  }

  render()
  {        
    return (
      <div>
        <div className='dialog'>

          { /* Primereact style, use CSS for display */ }
          <PrimereactStyle/>

          { /* DiyTools list */ }
          <div className="diytool-list">
            <label htmlFor="label">Matériel :</label><br/>
            <ListBox
              key = { this.state.selectedDiyTool.label }
              value = { this.state.selectedDiyTool }
              options={ this.props.diyTools.diyTools }
              onChange={ (e) => {
              //  console.log('value:' + e.originalEvent.type);
                //if (e.originalEvent.type === ' click')
                {
                 // console.log('id:' + e.target.id);
                  this.setState({ selectedDiyTool:e.value } );
                  console.log('value:' + JSON.stringify(this.state.selectedDiyTool));
                }
              }
            }
            />
          </div>

          <br/><br/><hr/>
          <Panel header="Header">
            { /* DiyTool label */ }
            <div className="diytool-label">
              <b><label htmlFor="label">{ this.state.selectedDiyTool.label }</label></b><br/>
              <label htmlFor="label">Marque: { this.state.selectedDiyTool.generalInfos.tradeMark }</label>
            </div>
          </Panel>
        </div>
      </div>
    );
  }
}
