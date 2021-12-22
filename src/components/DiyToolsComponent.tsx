
import React from 'react';
import { DiyTools, DiyTool, DiyToolCategory } from '../model/DiyToolData';
import { DiyToolsStore } from '../store/DiyToolsStore';

import { ListBox } from '@bit/primefaces.primereact.listbox';
import { Dropdown } from '@bit/primefaces.primereact.dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { InputSwitch } from 'primereact/inputswitch';
import { TabPanel, TabView } from 'primereact/components/tabview/TabView';
import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';

/**
 * Props for DiyTools class
 */
interface IPropsDiyTools { 
    showInformations: boolean;
    canChangeListContainer: boolean;
    firstSelectedTool?:number;
    onToolChanged: ( selectedTool: DiyTool ) => void;
}

const defaultDisplayToolsInAFlatList:boolean = false;
const defaultFirstSelectedTool:number = 0;
const defaultFirstSelectedTab:number = 0;

/**
 * DiyToolsComponent class
 */
@observer export class DiyToolsComponent extends React.Component< IPropsDiyTools, {} > {
    
    private diyStore:DiyToolsStore = new DiyToolsStore();
    
    @observable private diyTools: DiyTools = { diyTools: [] };
    @observable private selectedDiyTool: DiyTool | undefined;
    @observable private selectedTab: number;
    @observable private displayToolsInAFlatList: boolean;

    /**
     * constructor
     * @param props 
     */
    constructor(props: IPropsDiyTools) {
        
        // Props
        super(props);

        // New! Needed since mobx 6
        // https://stackoverflow.com/questions/67034998/component-not-re-rendering-when-updating-the-state-in-mobx
        makeObservable(this);

        // Initialize Diy list
        this.diyStore.getAllDiyTools().then( (result: DiyTool[]) => {
            this.diyTools.diyTools = result;

            this.selectedDiyTool = typeof (this.props.firstSelectedTool) === undefined
             ? this.diyTools.diyTools[defaultFirstSelectedTool]
             : this.diyTools.diyTools[this.props.firstSelectedTool as number];
        } );

        this.selectedTab = defaultFirstSelectedTab;
        this.displayToolsInAFlatList = defaultDisplayToolsInAFlatList;
    }

    /**
     * renderListTypeOfDisplay
     */
     private renderListTypeOfDisplay = () : JSX.Element => {
        return (
            <div className="diytool-switch-type-of-list">
                <label>Afficher dans une liste à plat:</label><br/>
                { 
                <InputSwitch 
                    checked={ this.displayToolsInAFlatList } 
                    onChange={ (e) => { this.displayToolsInAFlatList = e.value; } } 
                /> }              
                <br/>
            </div>
        );
    }

    /**
     * renderTabView
     */
     private renderTabView = (): JSX.Element => {

        if ( this.selectedDiyTool ) {
            return (
                <div className="diytool-taview">
                    {<TabView 
                        className="tabview-custom" 
                        activeIndex={ this.selectedTab } 
                        onTabChange={ (e) => { this.selectedTab = e.index } }>
                
                        { /* DiyTools general informations */ }
                        <TabPanel header="Informations de l'outil" leftIcon="pi pi-calendar" >
                        <div className="tab-ibformations">
                            <b><label  htmlFor="label">{ this.selectedDiyTool.label }</label></b><br/>
{/*                             <SelectButton value={ this.selectedDiyTool.generalInfos.category } 
                                        options={ Object.values(DiyToolCategory) } /><br/> */}
                            <label htmlFor="label-description">Description: { this.selectedDiyTool.generalInfos.description }</label><br/>
                            <label htmlFor="label-trademark">Marque: { this.selectedDiyTool.generalInfos.tradeMark }</label><br/>
                            <label htmlFor="label-place">Emplacement: { this.selectedDiyTool.generalInfos.place }</label><br/>
                            </div>
                        </TabPanel>

                        { /* Instruction for use */ }
                        <TabPanel header="Notice d'utilisation" leftIcon="pi pi-calendar"
                            disabled={ (typeof this.selectedDiyTool.generalInfos.instructionsForUse === undefined) ? true : false }>
                        <div className="tab-instructions">
                            <p> { this.selectedDiyTool.generalInfos.instructionsForUse }</p>
                        </div>
                        </TabPanel>
                    </TabView>}
                </div>
            );
        } else {
            return <React.Fragment></React.Fragment>;
        }
    }

    /**
     * renderWithFlatListbox
     */
    renderWithFlatListbox () : JSX.Element {

        return (
            <div className="diytools-panel">
                { /* Change gui component for list */ }
                { this.props.canChangeListContainer === true ? this.renderListTypeOfDisplay() : React.Fragment }

                { /* DiyTools list */ }
                <div className="diytool-listbox">
                    <label>Matériel :</label><br/>
                    <ListBox
                        optionLabel = { "label" }
                        value = { this.selectedDiyTool }
                        options={ this.diyTools.diyTools }
                        onChange={ (e) => { this.selectedDiyTool = e.value; console.log(this.selectedDiyTool); } }
                    /><br/>
                </div>

                { /* hr */ }
                <hr/>

                { /* Tabview for current diytool display */ }
                { this.props.showInformations === true ? this.renderTabView() : React.Fragment } 
            </div>
            );
    }

    /**
     * renderWithDropdown
     */
     private renderWithDropdown (): JSX.Element {
    
        return (
            <div className="diytools-panel-">
                { /* Change gui component for list */ }
                { this.props.canChangeListContainer === true ? this.renderListTypeOfDisplay() : React.Fragment }

                { /* DiyTools dropdown */ }
                <div className="diytool-dropdown">
                    <label>Matériel :</label><br/>
                    <Dropdown
                        placeholder='Matériel :'
                        value = { this.selectedDiyTool }
                        optionLabel = { 'label' }
                        options={ this.diyTools.diyTools }
                        onChange={ (e) => { this.selectedDiyTool = e.value; } }
                    /><br/>
                </div>

                { /* hr */ }
                <hr/>

                { /* Tabview for current diytool display */ }
                { this.props.showInformations === true ? this.renderTabView() : React.Fragment } 
            </div>
        );
    }
    
    /**
     * render method
     */
    public render (): JSX.Element { 

        return ( <div>
            {
                this.selectedDiyTool && ( ( this.displayToolsInAFlatList === true ) ? this.renderWithFlatListbox() : this.renderWithDropdown() )
            }
        </div>
         );
    }
}
