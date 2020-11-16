
import React from 'react';

import { DiyTools, DiyToolBookingInformations, DiyTool } from '../model/DiyToolData';
import { DiyToolsStore } from '../store/DiyToolsStore';
import { DiyToolsList } from './DiyToolsList';

import { Dropdown } from '@bit/primefaces.primereact.dropdown';
import { DataView, DataViewLayoutOptions } from '@bit/primefaces.primereact.dataview';
import { Panel } from '@bit/primefaces.primereact.panel';
import { InputSwitch } from 'primereact/inputswitch';
import { Booking, Bookings } from '../model/BookingData';
import { REFUSED } from 'dns';

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
            this.setState({
                dataViewBookingHistorySortOrder: -1,
                dataViewBookingHistorySortField: value.substring(1, value.length),
                dataViewBookingHistorySortKey: value
            });
        } else {
            this.setState({
                dataViewBookingHistorySortOrder: 1,
                dataViewBookingHistorySortField: value,
                dataViewBookingHistorySortKey: value
            });
        }
    }

    /**
    * renderBookingHistoryGridItem
    * @param bookingInfos 
    */
    renderBookingHistoryGridItem = ( bookingInfos: any ): JSX.Element => {

        if ( this.state.displayCurrentBookings ) {
            return (
                <div style={{ padding: '.5em' }} className='first-last-name'>
                    <Panel header={ bookingInfos.toolLabel + ' ' + bookingInfos.bookingInfos.currentBookerLastName } style={{ textAlign: 'center' }}>
                        <div className='phone-number'>
                            { bookingInfos.bookingInfos.currentBookerPhoneNumber }
                        </div>
                        <div className='back-date'>
                            { bookingInfos.bookingInfos.currentBookerBackDate.toString() }
                        </div>
                        <hr className='ui-widget-content' style={{ borderTop: 0 }} />
                    </Panel>
                </div>
            );
        } else {
            return (
                <div style={{ padding: '.5em' }} className='first-last-name'>
                    <Panel header={ bookingInfos.currentBookerFirstName + ' ' + bookingInfos.currentBookerLastName } style={{ textAlign: 'center' }}>
                        <div className='phone-number'>
                            { bookingInfos.currentBookerPhoneNumber }
                        </div>
                        <div className='back-date'>
                            { bookingInfos.currentBookerBackDate.toString() }
                        </div>
                        <hr className='ui-widget-content' style={{ borderTop: 0 }} />
                    </Panel>
                </div>
            );
        }

        return <React.Fragment></React.Fragment>;
    }

    /**
    * renderBookingHistoryListItem
    * @param bookingInfos 
    */
    renderBookingHistoryListItem = ( bookingInfos : any ): JSX.Element => {

       // console.log(JSON.stringify(bookingInfos.generalInfos));
        console.log(JSON.stringify(bookingInfos.bookingInfos));
        //console.log(bookingInfos.toolLabel);
        if (typeof (bookingInfos.bookingInfos) != undefined) {
            console.log('des resa', JSON.stringify(bookingInfos.bookingInfos));
        } else {
            console.log('pas de resa');
        }

        if ( this.state.displayCurrentBookings === true && typeof (bookingInfos.bookingInfos) != undefined ) {
            return (
                <div className='p-col-12' style={ { padding: '2em', borderBottom: '1px solid #d9d9d9', display: 'flex' } }>
                
                    <div className='p-col-12 p-md-3' style={{ width: '25%' }}>
                        <img
                            src="pi pi-star"
                            alt={ bookingInfos.toolLabel }
                        />
                    </div>
                    
                    <div className='p-col-12 p-md-8 car-details' style={{ width: '75%' }}>
                        <div className='p-grid' style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <div className='p-col-2 p-sm-6' style={{ width: '33%' }}>Réservant:</div>
                            <div className='p-col-10 p-sm-6' style={{ width: '33%' }}>
                                { bookingInfos.bookingInfos.currentBookerFirstName + ' ' + bookingInfos.bookingInfos.currentBookerLastName }
                            </div>

                            <div className='p-col-2 p-sm-6' style={{ width: '33%' }}>Téléphone:</div>
                            <div className='p-col-10 p-sm-6' style={{ width: '33%' }}>
                                { bookingInfos.bookingInfos.currentBookerPhoneNumber }
                            </div>

                            <div className='p-col-2 p-sm-6' style={{ width: '33%' }}>Date de retour:</div>
                            <div className='p-col-10 p-sm-6' style={{ width: '33%' }}>
                                { bookingInfos.bookingInfos.currentBookerBackDate.toString() }
                            </div>
                        </div>
                    </div>

                </div>
            );
        } else if (typeof (bookingInfos.bookingInfos) != undefined) {
            return (
                <div
                    className='p-col-12'
                    style={{ padding: '2em', borderBottom: '1px solid #d9d9d9', display: 'flex' }}
                >
                    <div className='p-col-12 p-md-3' style={{ width: '25%' }}>
                        <img
                            src="pi pi-star"
                            alt={ bookingInfos.currentBookerFirstName + ' ' + bookingInfos.currentBookerLastName }
                        />
                    </div>
                    <div className='p-col-12 p-md-8 car-details' style={{ width: '66.6667%' }}>
                        <div className='p-grid' style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <div className='p-col-2 p-sm-6' style={{ width: '50%' }}>Date de retour:</div>
                            <div className='p-col-10 p-sm-6' style={{ width: '50%' }}>{ bookingInfos.currentBookerBackDate.toString() }</div>

                            <div className='p-col-2 p-sm-6' style={{ width: '50%' }}>Téléphone:</div>
                            <div className='p-col-10 p-sm-6' style={{ width: '50%' }}>{ bookingInfos.currentBookerPhoneNumber }</div>
                        </div>
                    </div>

                    <div
                        className='p-col-12 p-md-1 search-icon'
                        style={{ marginTop: '40px', width: '8.3333%' }}
                    >
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
        const sortOptions = [
            { label: 'First Name', value: 'first-name' },
            { label: 'Last Name', value: 'last-name' },
            { label: 'Téléphone', value: 'phone-number' },
            { label: 'Date de retour', value: 'back-date' }
        ];

        return (
            <div className='p-grid'>
                <div className='p-col-6' style={{ textAlign: 'left', float: 'left' }}>
                    <Dropdown
                        options={ sortOptions }
                        value={ this.state.dataViewBookingHistorySortKey }
                        placeholder='Sort By'
                        onChange={ this.dataViewBookingHistoryOnSortChange }
                    />
                </div>
                <div className='p-col-6' style={{ textAlign: 'right' }}>
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
 