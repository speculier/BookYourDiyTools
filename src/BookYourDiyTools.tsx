import './BookYourDiyTools.css';

import React from 'react';
import { DiyTools, DiyTool, DiyToolCategory, DiyToolBookingInformations } from './dataModel';
import { ListBox } from '@bit/primefaces.primereact.listbox';
import PrimereactStyle from '@bit/primefaces.primereact.internal.stylelinks';
import { Panel } from '@bit/primefaces.primereact.panel';
import { DataView, DataViewLayoutOptions } from '@bit/primefaces.primereact.dataview';
import { Menu } from '@bit/primefaces.primereact.menu';
import { Dropdown } from '@bit/primefaces.primereact.dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

/**
 * Props for BookYourDiyTools class
 */
export interface IProps
{
  diyTools: DiyTools;
}

/**
 * States for for BookYourDiyTools class
 */
interface IState
{
  selectedDiyTool: DiyTool;
  selectedTab: number;
  dataViewBookingHistoryCurrentBooking: DiyToolBookingInformations | undefined;
  dataViewBookingHistoryLayout: string;
  dataViewBookingHistorySortKey: any;
  dataViewBookingHistorySortOrder: any;
  dataViewBookingHistorySortField: any;
  onDataViewBookingHistoryOnSortChange: ( event: any ) => void;
  onDataViewBookingHistoryItemTemplateDisplay: ( tool: any, layout: 'list' | 'grid' ) => JSX.Element;
}

/**
 * BookYourDiyTools class
 */
export class BookYourDiyTools extends React.Component<IProps, IState> {
  toast: any;
  menuItems: any;
  menu: any;
  private firstSelectedTool:number = 0;
  private firstSelectedBooker:number = 0;
  private dataViewBookingHistoryMaxNumberOfToolsPerPage: number=10;
  private defaultTemplateDisplay:string = 'list';

  /**
   * constructor
   * @param props 
   */
  constructor( props: IProps )
  {
    super(props);

    this.state = { 
      // Selected tool in the main list
      selectedDiyTool: this.props.diyTools.diyTools[this.firstSelectedTool],
      
      // Selected tab infos
      selectedTab: this.firstSelectedTool,

      // Booking history
      dataViewBookingHistoryLayout: this.defaultTemplateDisplay,
      dataViewBookingHistorySortKey: null,
      dataViewBookingHistorySortOrder: null,
      dataViewBookingHistorySortField: null,
      dataViewBookingHistoryCurrentBooking: typeof this.props.diyTools.diyTools[this.firstSelectedTool].currentBookingInfos === undefined ? undefined : this.props.diyTools.diyTools[this.firstSelectedTool].currentBookingInfos,
      onDataViewBookingHistoryOnSortChange: this.dataViewBookingHistoryOnSortChange,
      onDataViewBookingHistoryItemTemplateDisplay: this.dataViewBookingHistoryItemTemplateDisplay
    };

    this.menuItems = [
      {
        label: 'Outils',
        items: [
          {
            label: 'Description des outils',
            icon: 'pi pi-external-link',
            command: () => {
              //this.toast.show({ severity: 'success', summary: 'Description des outils', detail: 'Description des outils', life: 3000 });
                
            }
          },
          {
            label: 'Ajouter/Supprimer/Modifier',
            icon: 'pi pi-external-link',
            command: () => {
              this.toast.show({ severity: 'warn', summary: 'Ajouter/Supprimer/Modifier', detail: 'Ajouter/Supprimer/Modifier', life: 3000 });
            }
          }
        ]
      },
      {
        label: 'Réservations',
        items: [
          {
            label: 'Réserver',
            icon: 'pi pi-external-link',
            command: () => {
              this.toast.show({ severity: 'warn', summary: 'Réserver', detail: 'Réserver', life: 3000 });
            }
          },{
            label: 'Retour de matériel',
            icon: 'pi pi-external-link',
            command: () => {
              this.toast.show({ severity: 'warn', summary: 'Retour de matériel', detail: 'Retour de matériel', life: 3000 });
            }
          }
        ]
      },
      {
        label: 'Réparations',
        items: [
          {
            label: 'Réparations',
            icon: 'pi pi-external-link',
            command: () => {
              this.toast.show({ severity: 'warn', summary: 'Réparations', detail: 'Réparations', life: 3000 });
            }
          }
        ]
      }
  ];
  }

  /**
   * dataViewBookingHistoryOnSortChange
   * @param event 
   */
  dataViewBookingHistoryOnSortChange = ( event: any ) => {
		const value = event.value;

		if (value.indexOf('!') === 0) {
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
   * @param tool 
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
					<Button
						icon='pi pi-search'
						onClick={ e => this.setState( { dataViewBookingHistoryCurrentBooking: bookingInfos } ) }
					/>
				</Panel>
			</div>
		);
	}
  
  /**
   * renderBookingHistoryListItem
   * @param tool 
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
					<Button
						icon='pi pi-search'
						onClick={e => this.setState({ dataViewBookingHistoryCurrentBooking: bookingInfos })} 
					/>
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
      console.log('Just before');
      if ( layout === 'list' ) return this.renderBookingHistoryListItem( tool );
      else if ( layout === 'grid' ) return this.renderBookingHistoryGridItem( tool );
    }

    return (<React.Fragment></React.Fragment>);
  }

  /**
   * setSelectedTab
   * @param e 
   */
  setSelectedTab = (e: any): void => {
    this.setState({ selectedTab:e.index } );
    console.log('Selected tab:' + this.state.selectedTab);
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
   * render method
   */
  render()
  {  
    const dataViewBookingHistoryHeader = this.renderBookingHistoryHeader();

    return (

      <div className='panel-diytools'>

        { /* Primereact style, uses CSS for display */ }
        <PrimereactStyle/>

        <Toast ref={(el) => { this.toast = el; }}></Toast>

        <div className="menu">  
          <Menu model={ this.menuItems } popup ref={el => this.menu = el} id="main-menu" />
          <Button label="Menu" icon="pi pi-bars" onClick={(event) => this.menu.toggle(event)} aria-controls="popup_menu" aria-haspopup />
        </div>

        { /* DiyTool Main panel */ }
        <Panel header="Outils">

          { /* DiyTools list */ }
          <div className="diytool-list">
            <label htmlFor="label">Matériel :</label><br/>
            <ListBox
              key = { this.state.selectedDiyTool.label }
              value = { this.state.selectedDiyTool }
              options={ this.props.diyTools.diyTools }
              onChange={ (e) => {
                {
                  this.setState({ selectedDiyTool:e.value } );
                  this.setSelectedTab(e);
                }
              }
            }
            />
          </div>

          { /* Line break */ }
          <br/>

          { /* Tabview for current diytool display */ }
          <TabView 
            className="tabview-custom" 
            activeIndex={ this.state.selectedTab } 
            onTabChange={ (e) => { 
                this.setSelectedTab(e);
              }
            }>
            
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

            { /* Booking history */ }
            <TabPanel header="Historique des réservations" leftIcon="pi pi-calendar"
                disabled={ (typeof this.state.selectedDiyTool.bookingHistory === undefined) ? false : false }>
              <div className="tab-booking-history">
                <DataView
                  value={ this.state.selectedDiyTool.bookingHistory } 
                  layout={ this.state.dataViewBookingHistoryLayout } 
                  header={ dataViewBookingHistoryHeader }
                  itemTemplate={ this.dataViewBookingHistoryItemTemplateDisplay } 
                  paginator rows= { this.dataViewBookingHistoryMaxNumberOfToolsPerPage }
                  sortOrder={ this.state.dataViewBookingHistorySortOrder } 
                  sortField={ this.state.dataViewBookingHistorySortField } 
                  />
              </div>
            </TabPanel>

          </TabView>
          
        </Panel>
      </div>
    );
  }
}
