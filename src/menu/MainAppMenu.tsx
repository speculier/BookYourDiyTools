
import React from 'react';
import PrimereactStyle from '@bit/primefaces.primereact.internal.stylelinks';
import { Menu } from '@bit/primefaces.primereact.menu';
import { Button } from 'primereact/button';

interface IProps
{
    onShowToolsClick: () => void;
}

/**
 * MainAppMenu class
 */
export class MainAppMenu extends React.Component<IProps> {

    /**
     * constructor
     * @param props 
     */
    constructor( props: IProps ) {
        super(props);
    }

    private menuItems: any;
    private menu:any = [
        {
          label: 'Outils',
          items: [
            {
              label: 'Description des outils',
              icon: 'pi pi-external-link',
              command: () => {
                //this.toast.show({ severity: 'success', summary: 'Description des outils', detail: 'Description des outils', life: 3000 });
                this.props.onShowToolsClick();
              }
            },
            {
              label: 'Ajouter/Supprimer/Modifier',
              icon: 'pi pi-external-link',
              command: () => {
                //this.toast.show({ severity: 'warn', summary: 'Ajouter/Supprimer/Modifier', detail: 'Ajouter/Supprimer/Modifier', life: 3000 });
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
                //this.toast.show({ severity: 'warn', summary: 'Réserver', detail: 'Réserver', life: 3000 });
              }
            },{
              label: 'Retour de matériel',
              icon: 'pi pi-external-link',
              command: () => {
                //this.toast.show({ severity: 'warn', summary: 'Retour de matériel', detail: 'Retour de matériel', life: 3000 });
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
                //this.toast.show({ severity: 'warn', summary: 'Réparations', detail: 'Réparations', life: 3000 });
              }
            }
          ]
        }
      ];
        
    /**
     * render method
     */
    render() {  

    return (
        <div className='panel-main-app-menu'>

            { /* Primereact style, uses CSS for display */ }
            <PrimereactStyle/>

            { /* Main application menu */ }
            <Menu 
                id="main-menu"
                model={ this.menuItems } 
                popup ref={el => this.menu = el}  
            />
            <Button 
                label="Menu" 
                icon="pi pi-bars"                 
                onClick={ (event) => this.menu.show(this ,event) } 
                aria-controls="popup_menu" 
                aria-haspopup
            />
        </div>
    );
  }
}
