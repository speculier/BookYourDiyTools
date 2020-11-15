
import React from 'react';
import { DiyTools, DiyTool, DiyToolCategory } from '../model/dataModel';
import { ListBox } from '@bit/primefaces.primereact.listbox';
import { Dropdown } from '@bit/primefaces.primereact.dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { InputSwitch } from 'primereact/inputswitch';
import { TabPanel, TabView } from 'primereact/components/tabview/TabView';
import { DiyToolsStore } from '../store/DiyToolsStore';
import { threadId } from 'worker_threads';

/**
 * Props for DiyToolsList class
 */
interface IPropsDiyToolsList { 
    showInformations: boolean;
    canChangeListContainer: boolean;
    firstSelectedTool?:number;
    onToolChanged: ( selectedTool: DiyTool ) => void;
}

/**
 * States for DiyToolsList class
 */
interface IStateDiyToolsList {
    selectedDiyTool: DiyTool;
    selectedTab: number;
    displayToolsInAFlatList: boolean;
}

/**
 * DiyToolsList class
 */
export class DiyToolsList extends React.Component<IPropsDiyToolsList, IStateDiyToolsList> {
    
    private defaultFirstSelectedTool:number = 0;
    private defaultFirstSelectedTab:number = 0;
    private defaultDisplayToolsInAFlatList:boolean = false;
    private diyStore:DiyToolsStore = new DiyToolsStore();
    private diyTools: DiyTools;

    /**
     * constructor
     * @param props 
     */
    constructor(props: IPropsDiyToolsList) {
        
        // Props
        super(props);

        // Initialize Diy list
        this.diyTools = this.diyStore.getAllTools();

        // States
        this.state = { 
            
            // Selected tool in the main list
            selectedDiyTool: typeof (this.props.firstSelectedTool) === undefined
                               ? this.diyTools.diyTools[this.defaultFirstSelectedTool]
                               : this.diyTools.diyTools[this.props.firstSelectedTool as number],

            // Selected tab infos
            selectedTab: this.defaultFirstSelectedTab,

            // Default type of display (false = dropdown, true = flat listox)
            displayToolsInAFlatList: this.defaultDisplayToolsInAFlatList
          };
    }

    /**
     * setSelectedTab
     * @param e 
     */
    setSelectedTab = (e: any): void => {
        this.setState({ selectedTab:e.index } );
    }

    /**
     * renderListTypeOfDisplay
     */
    renderListTypeOfDisplay = () : JSX.Element => {
        return (
            <div className="diytool-switch-type-of-list">
                <label>Afficher dans une liste à plat:</label><br/>
                <InputSwitch 
                    checked={ this.state.displayToolsInAFlatList } 
                    onChange={ (e) => this.setState( { displayToolsInAFlatList: e.value } ) } 
                /><br/>
            </div>
        );
    }

    /**
     * renderTabView
     */
    renderTabView = (): JSX.Element => {
        return (
            <div className="diytool-taview">
                <label>Liste des réservations de cet outil :</label><br/>
                <TabView 
                    className="tabview-custom" 
                    activeIndex={ this.state.selectedTab } 
                    onTabChange={ (e) => { this.setSelectedTab(e); } }>
            
                    { /* DiyTools general informations */ }
                    <TabPanel header="Informations de l'outil" leftIcon="pi pi-calendar" >
                    <div className="tab-ibformations">
                        <b><label  htmlFor="label">{ this.state.selectedDiyTool.label }</label></b><br/>
                        <SelectButton value={ this.state.selectedDiyTool.generalInfos.category } 
                                    options={ Object.values(DiyToolCategory) } /><br/>
                        <label htmlFor="label-description">Description: { this.state.selectedDiyTool.generalInfos.description }</label><br/>
                        <label htmlFor="label-trademark">Marque: { this.state.selectedDiyTool.generalInfos.tradeMark }</label><br/>
                        <label htmlFor="label-place">Emplacement: { this.state.selectedDiyTool.generalInfos.place }</label><br/>
                        </div>
                    </TabPanel>

                    { /* Instruction for use */ }
                    <TabPanel header="Notice d'utilisation" leftIcon="pi pi-calendar"
                        disabled={ (typeof this.state.selectedDiyTool.generalInfos.instructionsForUse === undefined) ? true : false }>
                    <div className="tab-instructions">
                        <p> { this.state.selectedDiyTool.generalInfos.instructionsForUse }</p>
                    </div>
                    </TabPanel>
                </TabView>
            </div>
        );
    }

    /**
     * renderWithFlatListbox
     */
    renderWithFlatListbox = () : JSX.Element => {

        return (
            <div className="diytools-panel">
                { /* Change gui component for list */ }
                { this.props.canChangeListContainer === true ? this.renderListTypeOfDisplay() : React.Fragment }

                { /* DiyTools list */ }
                <div className="diytool-listbox">
                    <label>Matériel :</label><br/>
                    <ListBox
                        //key = { this.state.selectedDiyTool.label }
                        value = { this.state.selectedDiyTool }
                        options={ this.diyTools.diyTools }
                        onChange={ (e) => { this.setState( { selectedDiyTool:e.value } ); } }
                    /><br/>
                </div>

                { /* hr */ }
                <hr/>

                { /* Tabview for current diytool display */ }
                { this.renderTabView() } 
            </div>
            );
    }

    /**
     * renderWithDropdown
     */
    renderWithDropdown = (): JSX.Element => {

        return (
            <div className="diytools-panel-">
                { /* Change gui component for list */ }
                { this.props.canChangeListContainer === true ? this.renderListTypeOfDisplay() : React.Fragment }

                { /* DiyTools dropdown */ }
                <div className="diytool-dropdown">
                    <label>Matériel :</label><br/>
                    <Dropdown
                        //key = { this.state.selectedDiyTool.label }
                        value = { this.state.selectedDiyTool }
                        options={ this.diyTools.diyTools }
                        //onChange={ (e) => { this.setState( { selectedDiyTool:e.value } ); } }
                        onChange={ (e) => { this.setState( { selectedDiyTool:e.value } ); this.props.onToolChanged( e.value ); } }
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
    render = (): JSX.Element => { 

        if ( this.state.displayToolsInAFlatList === true ) {
            return this.renderWithFlatListbox();
        } else {
            return this.renderWithDropdown();
        }
    }
}
