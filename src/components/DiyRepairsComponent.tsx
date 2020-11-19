
import React from 'react';

import { DiyTools, DiyTool } from '../model/DiyToolData';
import { DiyToolsStore } from '../store/DiyToolsStore';
import { DiyToolsComponent } from './DiyToolsComponent';

import { Dropdown } from '@bit/primefaces.primereact.dropdown';
import { DataView, DataViewLayoutOptions } from '@bit/primefaces.primereact.dataview';
import { Panel } from '@bit/primefaces.primereact.panel';
import { Rating } from '@bit/primefaces.primereact.rating';
import { InputSwitch } from 'primereact/components/inputswitch/InputSwitch';
import { DiyRepair, DiyRepairs, DiyToolRepairInformations } from '../model/DiyRepairData';

/**
 * Props for DiyRepairs class
 */
interface IPropsDiyRepairs { }

/**
 * States for DiyRepairs class
 */
interface IStateDiyRepairs {
    selectedDiyTool: DiyTool;
    displayCurrentRepairs: boolean;
    dataViewRepairHistoryCurrentRepair?: DiyToolRepairInformations;
    dataViewRepairHistoryLayout: string;
    dataViewRepairHistorySortKey: any;
    dataViewRepairHistorySortOrder: any;
    dataViewRepairHistorySortField: any;
    onDataViewRepairHistoryOnSortChange: ( event: any ) => void;
    onDataViewRepairHistoryItemTemplateDisplay: ( tool: any, layout: 'list' | 'grid' ) => JSX.Element;
}

/**
 * DiyRepairsComponent class
*/
export class DiyRepairsComponent extends React.Component<IPropsDiyRepairs, IStateDiyRepairs> {
     
    private diyStore:DiyToolsStore = new DiyToolsStore();
    private diyTools: DiyTools;
    private dataViewRepairHistoryMaxNumberPerPage: number=10;
    private defaultTemplateDisplay:string = 'list';
    private firstSelectedTool:number = 0;
    private defaultDisplayAllCurrentRepairs = false;

    /**
     * constructor
     * @param props 
     */
    constructor(props: IPropsDiyRepairs) {
        
        // Props
        super(props);

        // Initialize Diy list
        this.diyTools = this.diyStore.getAllTools();

        // States
        this.state = { 
            // Selected tool in the main list
            selectedDiyTool: this.diyTools.diyTools[this.firstSelectedTool],

            // Default repair display
            displayCurrentRepairs: this.defaultDisplayAllCurrentRepairs,

            dataViewRepairHistoryLayout: this.defaultTemplateDisplay,
            dataViewRepairHistorySortKey: null,
            dataViewRepairHistorySortOrder: null,
            dataViewRepairHistorySortField: null,
            dataViewRepairHistoryCurrentRepair: typeof this.diyTools.diyTools[this.firstSelectedTool].currentRepairInfos === undefined ? undefined : this.diyTools.diyTools[this.firstSelectedTool].currentRepairInfos,
            onDataViewRepairHistoryOnSortChange: this.dataViewRepairHistoryOnSortChange,
            onDataViewRepairHistoryItemTemplateDisplay: this.dataViewRepairHistoryItemTemplateDisplay
        };
    }

    /**
     * dataViewRepairHistoryOnSortChange
     * @param event 
     */
    dataViewRepairHistoryOnSortChange = ( event: any ) => {
        const value = event.value;

        if ( value.indexOf('!') === 0 ) {
            this.setState( {
                dataViewRepairHistorySortOrder: -1,
                dataViewRepairHistorySortField: value.substring( 1, value.length ),
                dataViewRepairHistorySortKey: value
            } );
        } else {
            this.setState( {
                dataViewRepairHistorySortOrder: 1,
                dataViewRepairHistorySortField: value,
                dataViewRepairHistorySortKey: value
            } );
        }
    }

    /**
     * renderRatingForGrid
     * @param infos 
     */
    renderRatingForGrid = ( infos : DiyToolRepairInformations ): JSX.Element => {

        if ( typeof infos.repairRating !== 'undefined' ) {
            return (
                <div className='repair-rating'>
                    <Rating value={ infos.repairRating } cancel={false}></Rating>
                </div> 
            );
        } else {
            return <React.Fragment></React.Fragment>
        }
    }

    /**
    * renderRepairHistoryGridItem
    * @param repairInfos 
    */
    renderRepairHistoryGridItem = ( repairInfos: any ): JSX.Element => {

        if ( this.state.displayCurrentRepairs ) {
            return (
                <div style={{ padding: '.5em' }} className='tool-label'>
                    <Panel header={ repairInfos.toolLabel } style={{ textAlign: 'center' }}>
                        <div className='repair-description'>
                            { repairInfos.repairInfos.repairDescription }
                        </div>
                        <div className='repair-company-name'>
                            { repairInfos.repairInfos.repairCompanyName }
                        </div>
                        <div className='repair-back-date'>
                            { repairInfos.repairInfos.repairBackDate.toString() }
                        </div>
                        <hr className='ui-widget-content' style={{ borderTop: 0 }} />
                    </Panel>
                </div>
            );
        } else {
            return (
                <div style={{ padding: '.5em' }} className='tool-label'>
                    <Panel header={ repairInfos.toolLabel } style={{ textAlign: 'center' }}>
                        <div className='repair-description'>
                            { repairInfos.repairDescription }
                        </div>
                        <div className='repair-company-name'>
                            { repairInfos.repairCompanyName }
                        </div>
                        <div className='repair-back-date'>
                            { repairInfos.repairBackDate.toString() }
                        </div>
                        { this.renderRatingForGrid( repairInfos ) }
                        <hr className='ui-widget-content' style={{ borderTop: 0 }} />
                    </Panel>
                </div>
            );
        }
    }

    /**
     * renderRatingForList
     * @param infos 
     */
    renderRatingForList = ( infos : DiyToolRepairInformations ): JSX.Element => {

        if ( typeof infos.repairRating !== 'undefined' ) {
            return (
                <div className='repair-rating' >
                    <div className='rating-label' style={{ width: '33%' }}>Note de la réparation:</div>
                    <div className='rating-value' style={{ width: '33%' }}>
                        <Rating value={ infos.repairRating } cancel={false}></Rating>
                    </div>  
                    </div> 
            );
        } else {
            return <React.Fragment></React.Fragment>
        }
    }

    /**
    * renderRepairHistoryListItem
    * @param repairInfos 
    */
    renderRepairHistoryListItem = ( repairInfos : any ): JSX.Element => {

        if ( this.state.displayCurrentRepairs === true && typeof (repairInfos.repairInfos) !== 'undefined' ) {
            return (
                <div className='repairs-list' style={ { padding: '2em', borderBottom: '1px solid #d9d9d9', display: 'flex' } }>
                    <div className='tool-label' style={{ width: '25%' }}>
                        <img src="pi pi-star" alt={ repairInfos.repairInfos.toolLabel }/>
                    </div>
                    <div className='repair-details' style={{ width: '75%' }}>
                        <div className='repair-details-grid' style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <div className='repair-description-label' style={{ width: '33%' }}>Description:</div>
                            <div className='repair-description-value' style={{ width: '33%' }}>
                                { repairInfos.repairInfos.repairDescription }
                            </div>
                            <div className='repair-company-name-label' style={{ width: '33%' }}>Entreprise:</div>
                            <div className='repair-company-name-value' style={{ width: '33%' }}>
                                { repairInfos.repairInfos.repairCompanyName }
                            </div>
                            <div className='repair-back-date-label' style={{ width: '33%' }}>Date de retour:</div>
                            <div className='repair-back-date-value' style={{ width: '33%' }}>
                                { repairInfos.repairInfos.repairBackDate.toString() }
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if ( typeof (repairInfos) !== 'undefined' ) {
            return (
                <div className='repairs-list' style={{ padding: '2em', borderBottom: '1px solid #d9d9d9', display: 'flex' }} >
                    <div className='tool-label' style={{ width: '25%' }}>
                        <img src="pi pi-star" alt={ repairInfos.toolLabel }/>
                    </div>
                    <div className='repairs-details' style={{ width: '75%' }}>
                        <div className='repairs-details-grid' style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <div className='repair-description-label' style={{ width: '50%' }}>Description:</div>
                            <div className='repair-description-value' style={{ width: '50%' }}>{ repairInfos.repairDescription }</div>
                            <div className='repair-company-name-label' style={{ width: '50%' }}>Entreprise:</div>
                            <div className='repair-company-name-value' style={{ width: '50%' }}>{ repairInfos.repairCompanyName }</div>
                            <div className='repair-back-date-label' style={{ width: '50%' }}>Date de retour:</div>
                            <div className='repair-back-date-value' style={{ width: '50%' }}>{ repairInfos.repairBackDate.toString() }</div>
                            { this.renderRatingForList( repairInfos ) } 
                        </div>
                    </div>
                </div>
            );           
        }

        return (<React.Fragment></React.Fragment>);
    }

    /**
    * dataViewRepairHistoryItemTemplateDisplay
    * @param repairInfos 
    * @param layout 
    */
    dataViewRepairHistoryItemTemplateDisplay = ( repairInfos: any, layout: 'list' | 'grid' ): JSX.Element => {

        if ( repairInfos ) {
            if ( layout === 'list' ) return this.renderRepairHistoryListItem( repairInfos );
            else if ( layout === 'grid' ) return this.renderRepairHistoryGridItem( repairInfos );
        }

        return (<React.Fragment></React.Fragment>);
    }

    /**
     * renderRepairHistoryHeader
     */
    renderRepairHistoryHeader = () => {

        let sortOptions;

        if (  this.state.displayCurrentRepairs === true ) {
            sortOptions = [
                { label: 'Réparation', value: 'repairDescription' },
                { label: 'Outil', value: 'toolLabel' },
                { label: 'Entreprise', value: 'repairCompanyName' },
                { label: 'Date de retour', value: 'repairBackDate' },
            ];
        } else {
            sortOptions = [
                { label: 'Réparation', value: 'repairDescription' },
                { label: 'Outil', value: 'toolLabel' },
                { label: 'Entreprise', value: 'bookerPhoneNumber' },
                { label: 'Date de retour', value: 'repairCompanyName' },
                { label: 'Note de la réparation', value: 'repairRating' }
            ];
        }

        return (
            <div className='header-repairs-list'>
                <div className='repairs-dropdown-sort-type' style={{ textAlign: 'left', float: 'left' }}>
                    <Dropdown
                        options={ sortOptions }
                        value={ this.state.dataViewRepairHistorySortKey }
                        placeholder='Trier par'
                        onChange={ this.dataViewRepairHistoryOnSortChange }
                    />
                </div>
                <div className='repairs-view-type' style={{ textAlign: 'right' }}>
                    <DataViewLayoutOptions
                        layout={ this.state.dataViewRepairHistoryLayout }
                        onChange={ e => this.setState( { dataViewRepairHistoryLayout: e.value } ) }
                    />
                </div>
            </div>
        );
    }

    /**
     * renderRepairsTypeOfDisplay
     */
    renderRepairsTypeOfDisplay = () : JSX.Element => {
        return (
            <div className="repairs-switch-type-of-display">
                <label>Afficher les réparations en cours:</label><br/>
                <InputSwitch 
                    checked={ this.state.displayCurrentRepairs } 
                    onChange={ (e) => this.setState( { displayCurrentRepairs: e.value } ) } 
                /><br/>
            </div>
        );
    }

    /**
     * renderCurrentRepairs
     */
    renderCurrentRepairs = (dataViewRepairHistoryHeader: any): JSX.Element => { 
 
        let allRepairs:DiyRepairs= { repairs: [] };

        // Concatenate all repairs of each tool in one array
        this.diyTools.diyTools.forEach(element => {
            let currentRepairs:DiyRepair = {
                repairInfos: element.currentRepairInfos as DiyToolRepairInformations,
                generalInfos: element.generalInfos,
                toolLabel: element.label
            }; 

            allRepairs.repairs.push(currentRepairs);
        });

        return (
            <div className='repairs'>

                { /* Display all bookings or not */ }
                { this.renderRepairsTypeOfDisplay() }

                { /* Repair list per tools */ }   
                <label>Liste de toutes les réparations en cours :</label><br/>       
                <DataView 
                    value={ allRepairs.repairs } 
                    layout={ this.state.dataViewRepairHistoryLayout } 
                    header={ dataViewRepairHistoryHeader }
                    itemTemplate={ this.dataViewRepairHistoryItemTemplateDisplay } 
                    rows= { this.dataViewRepairHistoryMaxNumberPerPage }
                    sortOrder={ this.state.dataViewRepairHistorySortOrder }
                    sortField={ this.state.dataViewRepairHistorySortField }
                    paginator
                />
            </div>
        );
    }

    /**
     * renderRepairsPerTools
     */
    renderRepairsPerTools = (dataViewRepairHistoryHeader: any): JSX.Element => { 
 
        return (
            <div className='repairs'>

                { /* Display all repairs or not */ }
                { this.renderRepairsTypeOfDisplay() }

                { /* DiyToolsComponent list */ }
                <DiyToolsComponent
                    showInformations={false}
                    canChangeListContainer={false}
                    firstSelectedTool= { this.firstSelectedTool}
                    onToolChanged= { ( selectedTool: DiyTool ) => { this.setState( { selectedDiyTool: selectedTool } ); } }
                />
                               
                { /* Repair list per tools */ }
                <label>Liste des réparations passées pour cet outil :</label><br/>
                <DataView 
                    value={ this.state.selectedDiyTool.repairHistory } 
                    layout={ this.state.dataViewRepairHistoryLayout } 
                    header={ dataViewRepairHistoryHeader }
                    itemTemplate={ this.dataViewRepairHistoryItemTemplateDisplay } 
                    rows= { this.dataViewRepairHistoryMaxNumberPerPage }
                    sortOrder={ this.state.dataViewRepairHistorySortOrder }
                    sortField={ this.state.dataViewRepairHistorySortField }
                    paginator
                />
            </div>
        );
    }

    /**
     * render method
     */
    render = (): JSX.Element => { 
        const dataViewRepairHistoryHeader = this.renderRepairHistoryHeader();

        if ( this.state.displayCurrentRepairs === true ) {
            return this.renderCurrentRepairs(dataViewRepairHistoryHeader);
        } else {
            return this.renderRepairsPerTools(dataViewRepairHistoryHeader);
        }  
     }
 }
 