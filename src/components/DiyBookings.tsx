
import { Panel } from '@bit/primefaces.primereact.panel';
import React from 'react';

import { DiyTools, DiyToolBookingInformations, DiyTool } from '../model/dataModel';
import { DiyToolsStore } from '../store/DiyToolsStore';
import { Dropdown } from '@bit/primefaces.primereact.dropdown';
import { DataView, DataViewLayoutOptions } from '@bit/primefaces.primereact.dataview';
import { DiyToolsList } from './DiyToolsList';

/**
 * Props for DiyBookings class
 */
interface IPropsDiyBookings { }
 
 /**
  * States for DiyBookings class
  */
 interface IStateDiyBookings {
    selectedDiyTool: DiyTool;
    dataViewBookingHistoryCurrentBooking: DiyToolBookingInformations | undefined;
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
    private firstSelectedTool:number = 4;

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
    renderBookingHistoryGridItem = ( bookingInfos: DiyToolBookingInformations ): JSX.Element => {

        return (
            <div style={{ padding: '.5em' }} className='p-col-12 p-md-3'>
                <Panel header={ bookingInfos.currentBookerFirstName + ' ' + bookingInfos.currentBookerLastName } style={{ textAlign: 'center' }}>
                    <div className='car-detail'>
                        { bookingInfos.currentBookerPhoneNumber }
                    </div>
                    <div className='car-detail'>
                        { bookingInfos.currentBookerBackDate.toString() }
                    </div>
                    <hr className='ui-widget-content' style={{ borderTop: 0 }} />
                </Panel>
            </div>
        );
    }

    /**
    * renderBookingHistoryListItem
    * @param bookingInfos 
    */
    renderBookingHistoryListItem = ( bookingInfos : DiyToolBookingInformations ): JSX.Element => {

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
   * setSelectedTool
   * @param selectedTool 
   */
  setSelectedTool = ( selectedTool: DiyTool ) => {
    console.log( 'Bookings:' , JSON.stringify(selectedTool) );
  }

    /**
     * render method
     */
     render = (): JSX.Element => { 
        const dataViewBookingHistoryHeader = this.renderBookingHistoryHeader();

        return (
            <div className='bookings'>
                { /* DiyBookings list */ }
                <DiyToolsList
                    showInformations={false}
                    canChangeListContainer={false}
                    firstSelectedTool= {0}
                    onToolChanged= { ( selectedTool: DiyTool ) => { this.setSelectedTool( selectedTool ); } }
                />
                
                <DataView 
                    value={ this.diyTools.diyTools[this.firstSelectedTool].bookingHistory } 
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
 }
 