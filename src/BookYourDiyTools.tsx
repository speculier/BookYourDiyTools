import './BookYourDiyTools.css';

import React from 'react';
import { DiyTool, MenuSelections } from './model/DiyToolData';
import { DiyToolsList } from './components/DiyToolsList';

import PrimereactStyle from '@bit/primefaces.primereact.internal.stylelinks';
import { Panel } from '@bit/primefaces.primereact.panel';
import { Menu } from '@bit/primefaces.primereact.menu';
import { Button } from 'primereact/button';
import { DiyBookings } from './components/DiyBookings';

/**
 * Props for BookYourDiyTools class
 */
interface IProps { }

/**
 * States for for BookYourDiyTools class
 */
interface IState {
  selectedMenuItem: MenuSelections;
}

/**
 * BookYourDiyTools class
 */
export class BookYourDiyTools extends React.Component<IProps, IState> {
  private toast: any;
  private firstSelectedTool:number = 0;
  private menuItems: any;
  private mainMenu:any;

  /**
   * constructor
   * @param props 
   */
  constructor( props: IProps ) {
    // Set props
    super(props);

    // Set states
    this.state = { 
      // Selected menu
      selectedMenuItem: MenuSelections.NO_SELECTION,
    };

    // Set menu items
    this.menuItems = [
      {
        label: 'Outils',
        items: [
          {
            label: 'Outils', icon: 'pi pi-external-link',
            command: () => {
              //this.toast.show({ severity: 'success', summary: 'Description des outils', detail: 'Description des outils', life: 3000 });
              this.setSelectedMenu(MenuSelections.SHOW_TOOLS);
            }
          }
        ]
      },
      {
        label: 'Réservations',
        items: [
          {
            label: 'Réservations', icon: 'pi pi-external-link',
            command: () => { this.setSelectedMenu(MenuSelections.SHOW_BOOKINGS);  }
          }
        ]
      },
      {
        label: 'Réparations',
        items: [
          {
            label: 'Réparations', icon: 'pi pi-external-link',
            command: () => { this.setSelectedMenu(MenuSelections.SHOW_REPAIRS); }
          }
        ]
      }
    ];
  }

  /**
   * setSelectedMenu
   * @param e 
   */
  setSelectedMenu = (ms: MenuSelections): void => {
    this.setState({ selectedMenuItem:ms } );
  }

  /**
   * showMenuComponent
   */
  showMainMenu = (): JSX.Element => {
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
  renderHomePage = (): JSX.Element => {
    return (
      <div className='panel-home-page'>

        { /* Primereact style, uses CSS for display */ }
        <PrimereactStyle/>  

        { /* Main menu */ }  
        { this.showMainMenu() }

        { /* Booking History panel */ }
        <Panel header="BookYourDiyTools !">
          <label htmlFor="label">Réservation d'outils de bricolage</label><br/>
        </Panel>

      </div>
    );
  }

  /**
   * setSelectedTool
   * @param selectedTool 
   */
  setSelectedTool = ( selectedTool: DiyTool ) => {
    console.log( JSON.stringify(selectedTool) );
  }

  /**
   * renderDiyTools
   */
  renderDiyTools = (): JSX.Element => {
    return (
      <div className='panel-diytools'>

        { /* Primereact style, uses CSS for display */ }
        <PrimereactStyle/>  

        { /* Main menu */ }  
        { this.showMainMenu() }

        { /* DiyTool Main panel */ }
          <Panel header="Outils">

            { /* DiyTools list */ }
            <DiyToolsList
              showInformations={true}
              canChangeListContainer={true}
              firstSelectedTool= {0}
              onToolChanged= { ( selectedTool: DiyTool ) => { this.setSelectedTool( selectedTool ); } }
            />

            <Button label=' + ' minLength={10} className='button-addttool'/><br/>
            <Button label=' - ' minLength={10} className='button-addttool'/>
          </Panel>

      </div>
    );
  }

  /**
   * renderBookingHistory
   */
  renderBookingHistory = (): JSX.Element => {
    return (
      <div className='panel-booking-history'>

        { /* Primereact style, uses CSS for display */ }
        <PrimereactStyle/>  
       
        { /* Main menu */ }  
        { this.showMainMenu() }

        { /* Booking History panel */ }
          <Panel header="Réservations">

            { /* DiyBookings list */ }
            <DiyBookings/>

          </Panel>

      </div>
    );
  }

  /**
   * renderRepairs
   */
  renderRepairs = (): JSX.Element => {
    return (
      <div className='panel-booking-history'>

        { /* Primereact style, uses CSS for display */ }
        <PrimereactStyle/>  

        { /* Main menu */ }  
        { this.showMainMenu() }

        { /* Booking History panel */ }
          <Panel header="Réparations">

          </Panel>

      </div>
    );
  }

  /**
   * render method
   */
  render = (): JSX.Element => {  
    if ( this.state.selectedMenuItem === MenuSelections.NO_SELECTION ) {

      return this.renderHomePage();

    } else if ( this.state.selectedMenuItem === MenuSelections.SHOW_TOOLS ) {
      
      return this.renderDiyTools();

    } else if ( this.state.selectedMenuItem === MenuSelections.SHOW_BOOKINGS ) {
        
      return this.renderBookingHistory();

    } else  if ( this.state.selectedMenuItem === MenuSelections.SHOW_REPAIRS ) {
      return this.renderRepairs();
    }

    return <React.Fragment></React.Fragment>
  }
}
