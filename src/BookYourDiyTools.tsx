import './BookYourDiyTools.css';

import React from 'react';
import { DiyTool } from './model/DiyToolData';
import { DiyToolsComponent } from './components/DiyToolsComponent';
import { DiyBookingsComponent } from './components/DiyBookingsComponent';
import { DiyRepairsComponent } from './components/DiyRepairsComponent';

import PrimereactStyle from '@bit/primefaces.primereact.internal.stylelinks';
import { Panel } from '@bit/primefaces.primereact.panel';
import { Menu } from '@bit/primefaces.primereact.menu';
//import { Button } from 'primereact/button';
import { observer } from 'mobx-react';
import { makeObservable, observable } from 'mobx';
import { DiyAddDiyToolComponent } from './components/DiyAddDiyToolComponent';
import { Dialog } from '@bit/primefaces.primereact.dialog';
import { Button } from '@bit/primefaces.primereact.button';
//import { Dialog } from 'primereact/dialog';

/**
 * Main menu selections
 */
export enum MenuSelections {
  NO_SELECTION,
  SHOW_TOOLS,
  ADD_TOOL,
  SHOW_BOOKINGS,
  SHOW_REPAIRS
}

const defaultMenuDisplayed:MenuSelections = MenuSelections.NO_SELECTION;

interface IProps
{}

/**
 * BookYourDiyTools class
 */
@observer export class BookYourDiyTools extends React.Component< IProps, {} > {
  private toast: any;
  private firstSelectedTool:number = 0;
  private menuItems: any;
  private mainMenu:any;
  private callBackendAPI:any;

  @observable private selectedMenuItem: MenuSelections;
  @observable private displayAddDiytool: boolean = false;


  /**
   * constructor
   * @param props 
   */
  constructor( props: IProps ) {
    // Set props
    super(props);

    // New! Needed since mobx 6
    // https://stackoverflow.com/questions/67034998/component-not-re-rendering-when-updating-the-state-in-mobx
    makeObservable(this);

    this.selectedMenuItem = defaultMenuDisplayed;

    // Set menu items
    this.menuItems = [
      {
        label: 'Outils',
        items: [
          {
            label: 'Liste des outils', icon: 'pi pi-external-link',
            command: () => { this.setSelectedMenu(MenuSelections.SHOW_TOOLS) }
          },
          {
            label: 'Ajouter un outil', icon: 'pi pi-external-link',
            command: () => { this.setSelectedMenu(MenuSelections.ADD_TOOL) }
          }
        ]
      },
      {
        label: 'Réservations',
        items: [
          {
            label: 'Réservations', icon: 'pi pi-external-link',
            command: () => { this.setSelectedMenu(MenuSelections.SHOW_BOOKINGS)  }
          }
        ]
      },
      {
        label: 'Réparations',
        items: [
          {
            label: 'Réparations', icon: 'pi pi-external-link',
            command: () => { this.setSelectedMenu(MenuSelections.SHOW_REPAIRS) }
          }
        ]
      }
    ];
  }

  /**
   * setSelectedMenu
   * @param e 
   */
  private setSelectedMenu = (ms: MenuSelections): void => {
    this.selectedMenuItem = ms;
  }

  /**
   * setSelectedTool
   * @param selectedTool 
   */
  private setSelectedTool = ( selectedTool: DiyTool ) => {
    this.renderDiyToolsList();
  }

  /**
   * showMenuComponent
   */
   private showMainMenu = (): JSX.Element => {
    return (
      <div className="main-menu">  
        <Menu 
            id="main-menu"
            model={ this.menuItems } 
            popup ref={el => this.mainMenu = el}  
        />
        <Button 
            label="Menu" 
            icon="pi pi-bars"                 
            onClick={ (event) => this.mainMenu.toggle(event) } 
            aria-controls="popup_menu" 
            aria-haspopup
        />
      </div>            
    );
  }
 
 /**
   * renderHomePage
   */
  private renderHomePage = (): JSX.Element => {

    return (
      <div className='panel-home-page'>

        { /* Primereact style, uses CSS for display */ }
        <PrimereactStyle/>  

        { /* Main menu */ }  
        { this.showMainMenu() }

      </div>
    );
  }

  /**
   * renderDiyToolsList
   */
   private renderDiyToolsList = (): JSX.Element => {

    console.log("renderDiyToolsList");

    return (
      <div className='panel-diytools'>

        { /* Primereact style, uses CSS for display */ }
        <PrimereactStyle/>  

        { /* Main menu */ }  
        { this.showMainMenu() }

        { /* DiyTool Main panel */ }
          <Panel header="Outils">

            { /* DiyToolsComponent component */ }
            <DiyToolsComponent
              showInformations={true}
              canChangeListContainer={true}
              firstSelectedTool= {0}
              onToolChanged= { ( selectedTool: DiyTool ) => { this.setSelectedTool( selectedTool ); } }
          />
          </Panel>
      </div>
    );
  }

  /**
   * renderAddDiyTool
   * @returns 
   */
  private renderAddDiyTool = (): JSX.Element => {
    return (
      <div className='panel-add-diytool'>

        { /* Primereact style, uses CSS for display */ }
        <PrimereactStyle/>  

        { /* Main menu */ }  
        { this.showMainMenu() }

        { /* Booking History panel */ }
          
            { /* DiyAddDiyToolComponent component */ }
            <DiyAddDiyToolComponent 
              gotoDiyToolsAction={ (): JSX.Element => { return this.renderDiyToolsList(); } }
            />
      </div>
    );
  }

  /**
   * renderBookingHistoryList
   */
   private renderBookingHistoryList = (): JSX.Element => {
    return (
      <div className='panel-booking-history'>

        { /* Primereact style, uses CSS for display */ }
        <PrimereactStyle/>  
       
        { /* Main menu */ }  
        { this.showMainMenu() }

        { /* Booking History panel */ }
          <Panel header="Réservations">

            { /* DiyBookingsComponent component */ }
            <DiyBookingsComponent/>

          </Panel>

      </div>
    );
  }

  /**
   * renderRepairsList
   */
   private renderRepairsList = (): JSX.Element => {
    return (
      <div className='panel-booking-history'>

        { /* Primereact style, uses CSS for display */ }
        <PrimereactStyle/>  

        { /* Main menu */ }  
        { this.showMainMenu() }

        { /* Repair panel */ }
          <Panel header="Réparations">

            { /* DiyRepairsComponent component */ }
            <DiyRepairsComponent/>

          </Panel>

      </div>
    );
  }
  
  /**
   * render method
   */
  render (): JSX.Element {  

    console.log( "render:" , this.selectedMenuItem );

    return ( <div>
      {
        ( this.selectedMenuItem === MenuSelections.NO_SELECTION ) ?
            this.renderHomePage()
        : ( this.selectedMenuItem === MenuSelections.SHOW_TOOLS ) ?      
            this.renderDiyToolsList()
        : ( this.selectedMenuItem === MenuSelections.ADD_TOOL ) ?      
            this.renderAddDiyTool()            
        : ( this.selectedMenuItem === MenuSelections.SHOW_BOOKINGS ) ?
          this.renderBookingHistoryList()
        : ( this.selectedMenuItem === MenuSelections.SHOW_REPAIRS ) ?
            this.renderRepairsList()
        : <React.Fragment></React.Fragment>
      }
  </div> );
  }
}

