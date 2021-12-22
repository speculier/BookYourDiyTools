
import React from 'react';

import { DiyTools, DiyTool } from '../model/DiyToolData';
import { DiyBooking, DiyBookings, DiyToolBookingInformations } from '../model/DiyBookingData';
import { DiyToolsStore } from '../store/DiyToolsStore';
import { DiyToolsComponent } from './DiyToolsComponent';

import { Dropdown } from '@bit/primefaces.primereact.dropdown';
import { DataView, DataViewLayoutOptions } from '@bit/primefaces.primereact.dataview';
import { Panel } from '@bit/primefaces.primereact.panel';
import { Rating } from '@bit/primefaces.primereact.rating';
import { InputSwitch } from 'primereact/components/inputswitch/InputSwitch';
import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';

/**
 * Props for DiyBookingsComponent class
 */
 interface IPropsDiyBookings { }

const firstSelectedTool:number = 0;
const defaultDisplayAllCurrentBookings = false;
const dataViewBookingHistoryMaxNumberPerPage: number = 10;

/**
 * DiyBookingsComponent class
*/
@observer export class DiyBookingsComponent extends React.Component< IPropsDiyBookings, {} > {
     
    private diyStore:DiyToolsStore = new DiyToolsStore();

    @observable private diyTools: DiyTools = {  diyTools: []  };

    @observable private selectedDiyTool: DiyTool | undefined;
    @observable private displayCurrentBookings: boolean;
    @observable private dataViewBookingHistoryCurrentBooking?: DiyToolBookingInformations;
    @observable private dataViewBookingHistoryLayout: string | undefined;
    @observable private dataViewBookingHistorySortKey: any;
    @observable private dataViewBookingHistorySortOrder: any;
    @observable private dataViewBookingHistorySortField: any;
    @observable private onDataViewBookingHistoryOnSortChange: ( event: any ) => void;
    @observable private onDataViewBookingHistoryItemTemplateDisplay: ( tool: any, layout: 'list' | 'grid' ) => JSX.Element;

    /**
     * constructor
     * @param props 
     */
    constructor(props: IPropsDiyBookings) {
        
        // Props
        super(props);
        
        // New! Needed since mobx 6
        // https://stackoverflow.com/questions/67034998/component-not-re-rendering-when-updating-the-state-in-mobx
        makeObservable(this);

        // Initialize Diy list
        this.diyStore.getAllDiyTools().then( (result: DiyTool[]) => {
            this.diyTools.diyTools = result;

            this.selectedDiyTool = this.diyTools ? this.diyTools.diyTools[firstSelectedTool] : undefined ;
            this.dataViewBookingHistoryCurrentBooking = typeof this.selectedDiyTool === undefined ? undefined : this.diyTools.diyTools[firstSelectedTool].currentBookingInfos;
        } );

        this.dataViewBookingHistorySortKey = null;
        this.dataViewBookingHistorySortOrder = null;
        this.dataViewBookingHistorySortField = null;
        this.displayCurrentBookings = defaultDisplayAllCurrentBookings;
        this.onDataViewBookingHistoryOnSortChange = this.dataViewBookingHistoryOnSortChange;
        this.onDataViewBookingHistoryItemTemplateDisplay = this.dataViewBookingHistoryItemTemplateDisplay;
    }

    /**
     * dataViewBookingHistoryOnSortChange
     * @param event 
     */
     private dataViewBookingHistoryOnSortChange = ( event: any ) => {
        const value = event.value;

        if ( value.indexOf('!') === 0 ) {
            this.dataViewBookingHistorySortOrder = -1;
            this.dataViewBookingHistorySortField = value.substring( 1, value.length );
            this.dataViewBookingHistorySortKey = value;
        } else {
            this.dataViewBookingHistorySortOrder = 1;
            this.dataViewBookingHistorySortField = value;
            this.dataViewBookingHistorySortKey = value;
        }
    }

    /**
     * renderRatingForGrid
     * @param infos 
     */
     private renderRatingForGrid = ( infos : DiyToolBookingInformations ): JSX.Element => {

        if ( typeof infos.bookerRating !== 'undefined' ) {
            return (
                <div className='booking-rating'>
                    <Rating value={ infos.bookerRating } cancel={false}></Rating>
                </div> 
            );
        } else {
            return <React.Fragment></React.Fragment>
        }
    }

    /**
    * renderBookingHistoryGridItem
    * @param bookingInfos 
    */
     private renderBookingHistoryGridItem = ( bookingInfos: any ): JSX.Element => {

        if ( this.displayCurrentBookings ) {
            return (
                <div style={{ padding: '.5em' }} className='tool-label'>
                    <Panel header={ bookingInfos.toolLabel } style={{ textAlign: 'center' }}>
                        <div className='first-last-name'>
                            { bookingInfos.bookingInfos.bookerFirstName + ' ' + bookingInfos.bookingInfos.bookerLastName }
                        </div>
                        <div className='phone-number'>
                            { bookingInfos.bookingInfos.bookerPhoneNumber }
                        </div>
                        <div className='back-date'>
                            { bookingInfos.bookingInfos.bookerBackDate.toString() }
                        </div>
                        <hr className='ui-widget-content' style={{ borderTop: 0 }} />
                    </Panel>
                </div>
            );
        } else {
            return (
                <div style={{ padding: '.5em' }} className='first-last-name'>
                    <Panel header={ bookingInfos.bookerFirstName + ' ' + bookingInfos.bookerLastName } style={{ textAlign: 'center' }}>
                        <div className='phone-number'>
                            { bookingInfos.bookerPhoneNumber }
                        </div>
                        <div className='back-date'>
                            { bookingInfos.bookerBackDate.toString() }
                        </div>
                        { this.renderRatingForGrid( bookingInfos ) }
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
     private renderRatingForList = ( infos : DiyToolBookingInformations ): JSX.Element => {

        if ( typeof infos.bookerRating !== 'undefined' ) {
            return (
                <div className='rating' >
                    <div className='rating-label' style={{ width: '33%' }}>Note utilisateur:</div>
                    <div className='rating-value' style={{ width: '33%' }}>
                        <Rating value={ infos.bookerRating } cancel={false}></Rating>
                    </div>  
                    </div> 
            );
        } else {
            return <React.Fragment></React.Fragment>
        }
    }

    /**
    * renderBookingHistoryListItem
    * @param bookingInfos 
    */
     private renderBookingHistoryListItem = ( bookingInfos : any ): JSX.Element => {

        if ( this.displayCurrentBookings === true && typeof (bookingInfos.bookingInfos) !== 'undefined' ) {
            return (
                <div className='bookings-list' style={ { padding: '2em', borderBottom: '1px solid #d9d9d9', display: 'flex' } }>
                    <div className='tool-label' style={{ width: '25%' }}>
                        <img src="pi pi-star" alt={ bookingInfos.bookingInfos.toolLabel }/>
                    </div>
                    <div className='booking-details' style={{ width: '75%' }}>
                        <div className='booking-details-grid' style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <div className='booker-name-label' style={{ width: '33%' }}>Réservant:</div>
                            <div className='booker-name-value' style={{ width: '33%' }}>
                                { bookingInfos.bookingInfos.bookerFirstName + ' ' + bookingInfos.bookingInfos.bookerLastName }
                            </div>
                            <div className='phone-label' style={{ width: '33%' }}>Téléphone:</div>
                            <div className='phone-value' style={{ width: '33%' }}>
                                { bookingInfos.bookingInfos.bookerPhoneNumber }
                            </div>
                            <div className='back-date-label' style={{ width: '33%' }}>Date de retour:</div>
                            <div className='back-date-value' style={{ width: '33%' }}>
                                { bookingInfos.bookingInfos.bookerBackDate.toString() }
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if ( typeof (bookingInfos) !== 'undefined' ) {
            return (
                <div className='bookings-list' style={{ padding: '2em', borderBottom: '1px solid #d9d9d9', display: 'flex' }} >
                    <div className='booker-name' style={{ width: '25%' }}>
                        <img src="pi pi-star" alt={ bookingInfos.bookerFirstName + ' ' + bookingInfos.bookerLastName }/>
                    </div>
                    <div className='booking-details' style={{ width: '75%' }}>
                        <div className='booking-details-grid' style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <div className='back-date-label' style={{ width: '33%' }}>Date de retour:</div>
                            <div className='back-date-value' style={{ width: '33%' }}>{ bookingInfos.bookerBackDate.toString() }</div>
                            <div className='phone-label' style={{ width: '33%' }}>Téléphone:</div>
                            <div className='phone-value' style={{ width: '33%' }}>{ bookingInfos.bookerPhoneNumber }</div>
                            { this.renderRatingForList( bookingInfos ) } 
                        </div>
                    </div>
                </div>
            );           
        }

        return (<React.Fragment></React.Fragment>);
    }

    /**
    * dataViewBookingHistoryItemTemplateDisplay
    * @param bookingInfos 
    * @param layout 
    */
     private dataViewBookingHistoryItemTemplateDisplay = ( bookingInfos: any, layout: 'list' | 'grid' ): JSX.Element => {

        if ( bookingInfos ) {
            if ( layout === 'list' ) return this.renderBookingHistoryListItem( bookingInfos );
            else if ( layout === 'grid' ) return this.renderBookingHistoryGridItem( bookingInfos );
        }

        return (<React.Fragment></React.Fragment>);
    }

    /**
     * renderBookingHistoryHeader
     */
    private renderBookingHistoryHeader = () => {

        let sortOptions;

        if (  this.displayCurrentBookings === true ) {
            sortOptions = [
                { label: 'Outil', value: 'toolLabel' },
                { label: 'Prénom', value: 'bookerFirstName' },
                { label: 'NOM', value: 'bookerLastName' },
                { label: 'Téléphone', value: 'bookerPhoneNumber' },
                { label: 'Date de retour', value: 'bookerBackDate' },
            ];
        } else {
            sortOptions = [
                { label: 'Prénom', value: 'bookerFirstName' },
                { label: 'NOM', value: 'bookerLastName' },
                { label: 'Téléphone', value: 'bookerPhoneNumber' },
                { label: 'Date de retour', value: 'bookerBackDate' },
                { label: 'Note utilisateur', value: 'bookerRating' }
            ];
        }

        return (
            <div className='header-bookings-list'>
                <div className='bookings-dropdown-sort-type' style={{ textAlign: 'left', float: 'left' }}>
                    <Dropdown
                        options={ sortOptions }
                        value={ this.dataViewBookingHistorySortKey }
                        placeholder='Trier par'
                        onChange={ this.dataViewBookingHistoryOnSortChange }
                    />
                </div>
                <div className='bookings-view-type' style={{ textAlign: 'right' }}>
                    <DataViewLayoutOptions
                        layout={ this.dataViewBookingHistoryLayout }
                        onChange={ (e) => { this.dataViewBookingHistoryLayout = e.value } }
                    />
                </div>
            </div>
        );
    }

    /**
     * renderBookingsTypeOfDisplay
     */
     private renderBookingsTypeOfDisplay = () : JSX.Element => {
        return (
            <div className="bookings-switch-type-of-display">
                <label>Afficher les réservations en cours:</label><br/>
                <InputSwitch 
                    checked={ this.displayCurrentBookings } 
                    onChange={ (e) =>{ this.displayCurrentBookings = e.value } } 
                /><br/>
            </div>
        );
    }

    /**
     * renderCurrentBookings
     */
     private renderCurrentBookings = (dataViewBookingHistoryHeader: any): JSX.Element => { 
 
        let allBookings:DiyBookings= { bookings: [] };

        // Concatenate all bookings of each tool in one array
        if (this.diyTools) {
            this.diyTools.diyTools.forEach(element => {
                let currentBooking:DiyBooking = {
                    bookingInfos: element.currentBookingInfos as DiyToolBookingInformations,
                    generalInfos: element.generalInfos,
                    toolLabel: element.label
                }; 

                allBookings.bookings.push(currentBooking);
            });

            return (
                <div className='bookings'>
    
                    { /* Display all bookings or not */ }
                    { this.renderBookingsTypeOfDisplay() }
    
                    { /* Booking list per tools */ }   
                    <label>Liste de toutes les réservations :</label><br/>       
                    <DataView 
                        value={ allBookings.bookings } 
                        layout={ this.dataViewBookingHistoryLayout } 
                        header={ dataViewBookingHistoryHeader }
                        itemTemplate={ this.dataViewBookingHistoryItemTemplateDisplay } 
                        rows= { dataViewBookingHistoryMaxNumberPerPage }
                        sortOrder={ this.dataViewBookingHistorySortOrder }
                        sortField={ this.dataViewBookingHistorySortField }
                        paginator
                    />
                </div>
            );
        } else {
            return <React.Fragment></React.Fragment>
        }
    }

    /**
     * renderBookingsPerTools
     */
     private renderBookingsPerTools = (dataViewBookingHistoryHeader: any): JSX.Element => { 
 
        if ( this.selectedDiyTool ) {
            return (
                <div className='bookings'>

                    { /* Display all bookings or not */ }
                    { this.renderBookingsTypeOfDisplay() }

                    { /* DiyToolsComponent list */ }
                    <DiyToolsComponent
                        showInformations={false}
                        canChangeListContainer={false}
                        firstSelectedTool= { firstSelectedTool}
                        onToolChanged= { ( selectedTool: DiyTool ) => { this.selectedDiyTool = selectedTool } }
                    />
                                
                    { /* Booking list per tools */ }
                    <label>Liste des réservations passées pour cet outil :</label><br/>
                    <DataView 
                        value={ this.selectedDiyTool.bookingHistory } 
                        layout={ this.dataViewBookingHistoryLayout } 
                        header={ dataViewBookingHistoryHeader }
                        itemTemplate={ this.dataViewBookingHistoryItemTemplateDisplay } 
                        rows= { dataViewBookingHistoryMaxNumberPerPage }
                        sortOrder={ this.dataViewBookingHistorySortOrder }
                        sortField={ this.dataViewBookingHistorySortField }
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
                this.displayCurrentBookings 
                ? this.renderCurrentBookings(this.renderBookingHistoryHeader()) 
                : this.renderBookingsPerTools(this.renderBookingHistoryHeader())
            }
        </div>
         );
     }
 }
 
