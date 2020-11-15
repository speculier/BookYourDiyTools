
import React from 'react';
import { IProps } from "../BookYourDiyTools";
import { DiyTools, DiyTool, DiyToolCategory, DiyToolBookingInformations } from '../model/dataModel';
import { ListBox } from '@bit/primefaces.primereact.listbox';
import PrimereactStyle from '@bit/primefaces.primereact.internal.stylelinks';
import { SelectButton } from 'primereact/selectbutton';

export interface IPropsBookings {
    diyTools: DiyTools;
}

export interface IStateBookings {
    selectedDiyTool: DiyTool;
}

/**
 * DiyToolsList class
 */
export class DiyToolsList extends React.Component<IPropsBookings, IStateBookings> {
    
    private firstSelectedTool:number = 0;

    /**
     * constructor
     * @param props 
     */
    constructor(props: IPropsBookings) {
        
        // Props
        super(props);

        // States
        this.state = { 
            // Selected tool in the main list
            selectedDiyTool: this.props.diyTools.diyTools[this.firstSelectedTool],
          };
    }
    
    /**
     * render method
     */
    render(): JSX.Element
    {  
        return (
            <div className="diytool-list">
                { /* DiyTools list */ }
                <label htmlFor="label">Matériel :</label><br/>
                <ListBox
                   // key = { this.state.selectedDiyTool.label }
                    value = { this.state.selectedDiyTool }
                    options={ this.props.diyTools.diyTools }
                    onChange={ (e) => {
                    {
                        this.setState({ selectedDiyTool:e.value } );
                    }
                    }
                }
                />

                <div className="tab-ibformations">
                <b><label  htmlFor="label">{ this.state.selectedDiyTool.label }</label></b><br/>
                <SelectButton value={ this.state.selectedDiyTool.generalInfos.category } 
                              options={ Object.values(DiyToolCategory) } /><br/>
                <label htmlFor="label-description">Description: { this.state.selectedDiyTool.generalInfos.description }</label><br/>
                <label htmlFor="label-trademark">Marque: { this.state.selectedDiyTool.generalInfos.tradeMark }</label><br/>
                <label htmlFor="label-place">Emplacement: { this.state.selectedDiyTool.generalInfos.place }</label><br/>
                </div>
            </div>
            );
    }
}