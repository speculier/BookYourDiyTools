
import React from 'react';

import { DiyTools, DiyToolBookingInformations, DiyTool } from '../model/DiyToolData';
import { Booking, Bookings } from '../model/BookingData';
import { DiyToolsStore } from '../store/DiyToolsStore';
import { DiyToolsList } from './DiyToolsList';

import { Dropdown } from '@bit/primefaces.primereact.dropdown';
import { DataView, DataViewLayoutOptions } from '@bit/primefaces.primereact.dataview';
import { Panel } from '@bit/primefaces.primereact.panel';
import { Rating } from '@bit/primefaces.primereact.rating';
import { InputSwitch } from 'primereact/components/inputswitch/InputSwitch';

/**
 * Props for DiyBookings class
 */
interface IPropsDiyBookings { }

/**
 * States for DiyBookings class
 */
interface IStateDiyBookings {
    selectedDiyTool: DiyTool;
    displayCurrentBookings: boolean;
    dataViewBookingHistoryCurrentBooking?: DiyToolBookingInformations;
    dataViewBookingHistoryLayout: string;
    dataViewBookingHistorySortKey: any;
    dataViewBookingHistorySortOrder: any;
    dataViewBookingHistorySortField: any;
    onDataViewBookingHistoryOnSortChange: ( event: any ) => void;
    onDataViewBookingHistoryItemTemplateDisplay: ( tool: any, layout: 'list' | 'grid' ) => JSX.Element;
}

/**
 * DiyBookings class
*/
export class DiyBookings extends React.Component<IPropsDiyBookings, IStateDiyBookings> {
     
    private diyStore:DiyToolsStore = new DiyToolsStore();
    private diyTools: DiyTools;
    private firstSelectedBooker:number = 0;
    private dataViewBookingHistoryMaxNumberOfToolsPerPage: number=10;
    private defaultTemplateDisplay:string = 'list';
    private firstSelectedTool:number = 0;
    private defaultDisplayAllCurrentBookings = false;

    /**
     * constructor
     * @param props 
     */
    constructor(props: IPropsDiyBookings) {
        
        // Props
        super(props);

        // Initialize Diy list
        this.diyTools = this.diyStore.getAllTools();

        // States
        this.state = { 
            // Selected tool in the main list
            selectedDiyTool: this.diyTools.diyTools[this.firstSelectedTool],

            // Default bookings display
            displayCurrentBookings: this.defaultDisplayAllCurrentBookings,

            dataViewBookingHistoryLayout: this.defaultTemplateDisplay,
            dataViewBookingHistorySortKey: null,
            dataViewBookingHistorySortOrder: null,
            dataViewBookingHistorySortField: null,
            dataViewBookingHistoryCurrentBooking: typeof this.diyTools.diyTools[this.firstSelectedTool].currentBookingInfos === undefined ? undefined : this.diyTools.diyTools[this.firstSelectedTool].currentBookingInfos,
            onDataViewBookingHistoryOnSortChange: this.dataViewBookingHistoryOnSortChange,
            onDataViewBookingHistoryItemTemplateDisplay: this.dataViewBookingHistoryItemTemplateDisplay
        };
    }

    /**
     * dataViewBookingHistoryOnSortChange
     * @param event 
     */
    dataViewBookingHistoryOnSortChange = ( event: any ) => {
        const value = event.value;

        if ( value.indexOf('!') === 0 ) {
            this.setState( {
                dataViewBookingHistorySortOrder: -1,
                dataViewBookingHistorySortField: value.substring( 1, value.length ),
                dataViewBookingHistorySortKey: value
            } );
        } else {
            this.setState( {
                dataViewBookingHistorySortOrder: 1,
                dataViewBookingHistorySortField: value,
                dataViewBookingHistorySortKey: value
            } );
        }
    }

    /**
     * renderRatingForGrid
     * @param infos 
     */
    renderRatingForGrid = ( infos : DiyToolBookingInformations ): JSX.Element => {

        if ( typeof infos.bookerRating !== 'undefined' ) {
            return (
                <div className='rating'>
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
    renderBookingHistoryGridItem = ( bookingInfos: any ): JSX.Element => {

        if ( this.state.displayCurrentBookings ) {
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
    renderRatingForList = ( infos : DiyToolBookingInformations ): JSX.Element => {

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
    renderBookingHistoryListItem = ( bookingInfos : any ): JSX.Element => {

        if ( this.state.displayCurrentBookings === true && typeof (bookingInfos.bookingInfos) !== 'undefined' ) {
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
    * @param tool 
    * @param layout 
    */
    dataViewBookingHistoryItemTemplateDisplay = ( tool: any, layout: 'list' | 'grid' ): JSX.Element => {

        if ( tool ) {
            if ( layout === 'list' ) return this.renderBookingHistoryListItem( tool );
            else if ( layout === 'grid' ) return this.renderBookingHistoryGridItem( tool );
        }

        return (<React.Fragment></React.Fragment>);
    }

    /**
     * renderBookingHistoryHeader
     */
    renderBookingHistoryHeader = () => {

        let sortOptions;

        if (  this.state.displayCurrentBookings === true ) {
            sortOptions = [
                { label: 'Outil', value: 'toolLabel' },
                { label: 'Prénom', value: 'bookerFirstName' },
                { label: 'NOM', value: 'bookerLastName' },
                { label: 'Téléphone', value: 'bookerPhoneNumber' },
                { label: 'Date de retour', value: 'bookerBackDate' },
                { label: 'Note utilisateur', value: 'bookerRating' }
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
                        value={ this.state.dataViewBookingHistorySortKey }
                        placeholder='Trier par'
                        onChange={ this.dataViewBookingHistoryOnSortChange }
                    />
                </div>
                <div className='bookings-view-type' style={{ textAlign: 'right' }}>
                    <DataViewLayoutOptions
                        layout={ this.state.dataViewBookingHistoryLayout }
                        onChange={ e => this.setState( { dataViewBookingHistoryLayout: e.value } ) }
                    />
                </div>
            </div>
        );
    }

    /**
     * renderBookingsTypeOfDisplay
     */
    renderBookingsTypeOfDisplay = () : JSX.Element => {
        return (
            <div className="bookings-switch-type-of-display">
                <label>Afficher les réservations en cours:</label><br/>
                <InputSwitch 
                    checked={ this.state.displayCurrentBookings } 
                    onChange={ (e) => this.setState( { displayCurrentBookings: e.value } ) } 
                /><br/>
            </div>
        );
    }

    /**
     * renderAllBookings
     */
    renderCurrentBookings = (dataViewBookingHistoryHeader: any): JSX.Element => { 
 
        let allBookings:Bookings= { bookings: [] };

        // Concatenate all bookings of each tool in one array
        this.diyTools.diyTools.forEach(element => {
            let currentBooking:Booking = {
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
                                
                <DataView 
                    value={ allBookings.bookings } 
                    layout={ this.state.dataViewBookingHistoryLayout } 
                    header={ dataViewBookingHistoryHeader }
                    itemTemplate={ this.dataViewBookingHistoryItemTemplateDisplay } 
                    rows= { this.dataViewBookingHistoryMaxNumberOfToolsPerPage }
                    sortOrder={ this.state.dataViewBookingHistorySortOrder }
                    sortField={ this.state.dataViewBookingHistorySortField }
                    paginator
                />
            </div>
        );
    }

    /**
     * renderBookingsPerTools
     */
    renderBookingsPerTools = (dataViewBookingHistoryHeader: any): JSX.Element => { 
 
        return (
            <div className='bookings'>

                { /* Display all bookings or not */ }
                { this.renderBookingsTypeOfDisplay() }

                { /* DiyBookings list */ }
                <DiyToolsList
                    showInformations={false}
                    canChangeListContainer={false}
                    firstSelectedTool= { this.firstSelectedTool}
                    onToolChanged= { ( selectedTool: DiyTool ) => { this.setState( { selectedDiyTool: selectedTool } ); } }
                />
               
                <DataView 
                    value={ this.state.selectedDiyTool.bookingHistory } 
                    layout={ this.state.dataViewBookingHistoryLayout } 
                    header={ dataViewBookingHistoryHeader }
                    itemTemplate={ this.dataViewBookingHistoryItemTemplateDisplay } 
                    rows= { this.dataViewBookingHistoryMaxNumberOfToolsPerPage }
                    sortOrder={ this.state.dataViewBookingHistorySortOrder }
                    sortField={ this.state.dataViewBookingHistorySortField }
                    paginator
                />
            </div>
        );
    }

    /**
     * render method
     */
    render = (): JSX.Element => { 
        const dataViewBookingHistoryHeader = this.renderBookingHistoryHeader();

        if ( this.state.displayCurrentBookings === true ) {
            return this.renderCurrentBookings(dataViewBookingHistoryHeader);
        } else {
            return this.renderBookingsPerTools(dataViewBookingHistoryHeader);
        }  
     }
 }
 