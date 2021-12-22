
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
import { observer } from 'mobx-react';
import { makeObservable, observable } from 'mobx';

/**
 * Props for DiyRepairs class
 */
interface IPropsDiyRepairs { }

const dataViewRepairHistoryMaxNumberPerPage: number=10;
const defaultTemplateDisplay:string = 'list';
const firstSelectedTool:number = 0;
const defaultDisplayAllCurrentRepairs = false;

/**
 * DiyRepairsComponent class
*/
@observer export class DiyRepairsComponent extends React.Component< IPropsDiyRepairs, {} > {
     
    private diyStore:DiyToolsStore = new DiyToolsStore();

    @observable private diyTools: DiyTools = { diyTools: [] };
    @observable private selectedDiyTool: DiyTool | undefined;
    @observable private displayCurrentRepairs: boolean = defaultDisplayAllCurrentRepairs;
    @observable private dataViewRepairHistoryCurrentRepair?: DiyToolRepairInformations;
    @observable private dataViewRepairHistoryLayout: string  | undefined;
    @observable private dataViewRepairHistorySortKey: any;
    @observable private dataViewRepairHistorySortOrder: any;
    @observable private dataViewRepairHistorySortField: any;
    @observable private onDataViewRepairHistoryOnSortChange: ( event: any ) => void;
    @observable private onDataViewRepairHistoryItemTemplateDisplay: ( tool: any, layout: 'list' | 'grid' ) => JSX.Element;

    /**
     * constructor
     * @param props 
     */
    constructor(props: IPropsDiyRepairs) {
        
        // Props
        super(props);

        // New! Needed since mobx 6
        // https://stackoverflow.com/questions/67034998/component-not-re-rendering-when-updating-the-state-in-mobx
        makeObservable(this);

        // Initialize Diy list
        this.diyStore.getAllDiyTools().then( (result: DiyTool[]) => {
            this.diyTools.diyTools = result;

            this.selectedDiyTool = this.diyTools ? this.diyTools.diyTools[firstSelectedTool] : undefined ;
            this.dataViewRepairHistoryCurrentRepair = typeof this.selectedDiyTool === undefined ? undefined : this.diyTools.diyTools[firstSelectedTool].currentRepairInfos;
        } );

        this.displayCurrentRepairs = defaultDisplayAllCurrentRepairs;
        this.dataViewRepairHistoryLayout = defaultTemplateDisplay;
        this.dataViewRepairHistorySortKey = null
        this.dataViewRepairHistorySortOrder = null
        this.dataViewRepairHistorySortField = null
        this.onDataViewRepairHistoryOnSortChange = this.dataViewRepairHistoryOnSortChange;
        this.onDataViewRepairHistoryItemTemplateDisplay = this.dataViewRepairHistoryItemTemplateDisplay;
    }

    /**
     * dataViewRepairHistoryOnSortChange
     * @param event 
     */
    private dataViewRepairHistoryOnSortChange = ( event: any ) => {
        const value = event.value;

        if ( value.indexOf('!') === 0 ) {
            this.dataViewRepairHistorySortOrder = -1;
            this.dataViewRepairHistorySortField = value.substring( 1, value.length );
            this.dataViewRepairHistorySortKey = value;
        } else {
            this.dataViewRepairHistorySortOrder = 1;
            this.dataViewRepairHistorySortField = value;
            this.dataViewRepairHistorySortKey = value;
        }
    }

    /**
     * renderRatingForGrid
     * @param infos 
     */
    private renderRatingForGrid = ( infos : DiyToolRepairInformations ): JSX.Element => {

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
    private renderRepairHistoryGridItem = ( repairInfos: any ): JSX.Element => {

        if ( this.displayCurrentRepairs ) {
            return (
                <div style={{ padding: '.5em' }} className='tool-label'>
                    <Panel header={  repairInfos.toolLabel } style={{ textAlign: 'center' }}>
                        <div className='repair-description'>
                            { "Description : " + repairInfos.repairInfos.repairDescription }
                        </div>
                        <div className='repair-company-name'>
                            { "Entreprise : " + repairInfos.repairInfos.repairCompanyName }
                        </div>
                        <div className='repair-back-date'>
                            { "Date de retour : " + repairInfos.repairInfos.repairBackDate.toString() }
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
                            { "Description : " + repairInfos.repairDescription }
                        </div><br/>
                        <div className='repair-company-name'>
                            { "Entreprise : " +repairInfos.repairCompanyName }
                        </div><br/>
                        <div className='repair-back-date'>
                            { "Date de retour : " + repairInfos.repairBackDate.toString() }
                        </div><br/>
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
    private renderRatingForList = ( infos : DiyToolRepairInformations ): JSX.Element => {

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
  private renderRepairHistoryListItem = ( repairInfos : any ): JSX.Element => {

    console.log("repairInfos : " + JSON.stringify(repairInfos) );

        if ( this.displayCurrentRepairs === true && typeof (repairInfos.repairInfos) !== 'undefined' ) {
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

            console.log("OKKKK     repairInfos.repairInfos : " + JSON.stringify(repairInfos.repairDescription) );
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
    private dataViewRepairHistoryItemTemplateDisplay = ( repairInfos: any, layout: 'list' | 'grid' ): JSX.Element => {

        if ( repairInfos && typeof (repairInfos.repairInfos) !== 'undefined' && repairInfos.repairInfos !== null ) {
            if ( layout === 'list' ) return this.renderRepairHistoryListItem( repairInfos );
            else if ( layout === 'grid' ) return this.renderRepairHistoryGridItem( repairInfos );
        }

        return (<React.Fragment></React.Fragment>);
    }

    /**
     * renderRepairHistoryHeader
     */
    private renderRepairHistoryHeader = () => {

        let sortOptions;

        if (  this.displayCurrentRepairs === true ) {
            sortOptions = [
                { label: 'Outil', value: 'toolLabel' },
                { label: 'Réparation', value: 'repairDescription' },
                { label: 'Entreprise', value: 'repairCompanyName' },
                { label: 'Date de retour', value: 'repairBackDate' },
            ];
        } else {
            sortOptions = [
                { label: 'Outil', value: 'toolLabel' },
                { label: 'Réparation', value: 'repairDescription' },
                { label: 'Entreprise', value: 'repairCompanyName' },
                { label: 'Date de retour', value: 'repairBackDate' },
                { label: 'Note de la réparation', value: 'repairRating' }
            ];
        }

        return (
            <div className='header-repairs-list'>
                <div className='repairs-dropdown-sort-type' style={{ textAlign: 'left', float: 'left' }}>
                    <Dropdown
                        options={ sortOptions }
                        value={ this.dataViewRepairHistorySortKey }
                        placeholder='Trier par'
                        onChange={ this.dataViewRepairHistoryOnSortChange }
                    />
                </div>
                <div className='repairs-view-type' style={{ textAlign: 'right' }}>
                    <DataViewLayoutOptions
                        layout={ this.dataViewRepairHistoryLayout }
                        onChange={ e => this.dataViewRepairHistoryLayout = e.value }
                    />
                </div>
            </div>
        );
    }

    /**
     * renderRepairsTypeOfDisplay
     */
    private renderRepairsTypeOfDisplay = () : JSX.Element => {
        return (
            <div className="repairs-switch-type-of-display">
                <label>Afficher les réparations en cours:</label><br/>
                <InputSwitch 
                    checked={ this.displayCurrentRepairs } 
                    onChange={ (e) => this.displayCurrentRepairs = e.value } 
                /><br/>
            </div>
        );
    }

    /**
     * renderCurrentRepairs
     */
    private renderCurrentRepairs = (dataViewRepairHistoryHeader: any): JSX.Element => { 
 
        if ( this.diyTools ) {
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
                        layout={ this.dataViewRepairHistoryLayout } 
                        header={ dataViewRepairHistoryHeader }
                        itemTemplate={ this.dataViewRepairHistoryItemTemplateDisplay } 
                        rows= { dataViewRepairHistoryMaxNumberPerPage }
                        sortOrder={ this.dataViewRepairHistorySortOrder }
                        sortField={ this.dataViewRepairHistorySortField }
                        paginator
                    />
                </div>
            );
        } else {
            return <React.Fragment></React.Fragment>
        }   
    }

    /**
     * renderRepairsPerTools
     */
    private renderRepairsPerTools = (dataViewRepairHistoryHeader: any): JSX.Element => { 
 
 //       console.log("repairHistory: ", JSON.stringify(this.selectedDiyTool?.repairHistory));
        // console.log(this.selectedDiyTool?.repairHistory);

        if ( this.selectedDiyTool ) {
            return (
                <div className='repairs'>

                    { /* Display all repairs or not */ }
                    { this.renderRepairsTypeOfDisplay() }

                    { /* DiyToolsComponent list */ }
                    <DiyToolsComponent
                        showInformations={false}
                        canChangeListContainer={false}
                        firstSelectedTool= { firstSelectedTool}
                        onToolChanged= { ( selectedTool: DiyTool ) => { this.selectedDiyTool = selectedTool; } }
                    />
                                
                    { /* console.log("222222 :" ,JSON.stringify(this.selectedDiyTool?.repairHistory))*/ /* Repair list per tools */ }
                    <label>Liste des réparations passées pour cet outil :</label><br/>
                    <DataView 

                        value={ this.selectedDiyTool.repairHistory } 
                        layout={ this.dataViewRepairHistoryLayout } 
                        header={ dataViewRepairHistoryHeader }
                        itemTemplate={ this.dataViewRepairHistoryItemTemplateDisplay } 
                        rows= { dataViewRepairHistoryMaxNumberPerPage }
                        sortOrder={ this.dataViewRepairHistorySortOrder }
                        sortField={ this.dataViewRepairHistorySortField }
                        paginator
                    />
                </div>
            );
        } else {
            return <React.Fragment></React.Fragment>
        }   
    }

    /**
     * render method
     */
    public render (): JSX.Element { 

        return ( <div>
            {
                this.displayCurrentRepairs 
                ? this.renderCurrentRepairs(this.renderRepairHistoryHeader()) 
                : this.renderRepairsPerTools(this.renderRepairHistoryHeader())
            }
        </div>
         );
    }
 }
 