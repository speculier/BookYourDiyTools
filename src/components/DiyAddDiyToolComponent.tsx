
import React from 'react';
import { DiyToolsStore } from '../store/DiyToolsStore';

import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from '@bit/primefaces.primereact.dropdown';
import { Button } from 'primereact/components/button/Button';
import 'primeflex/primeflex.css';
import { DiyToolState, DiyTool, DiyToolCategory } from '../model/DiyToolData';

/**
 * Props for DiyTools class
 */
interface IPropsAddDiyTool { 
    gotoDiyToolsAction : () => JSX.Element;
}

/**
 * DiyAddDiyToolComponent class
 */
@observer export class DiyAddDiyToolComponent extends React.Component< IPropsAddDiyTool, {} > {
    
    private diyStore:DiyToolsStore = new DiyToolsStore();

    @observable private displayAddDiytool: boolean = false;
    @observable private selectedState: DiyTool | undefined;
    @observable private currentLabel: string = "";
    @observable private currentTrademark: string = "";
    @observable private currentDescription: string = "";
    @observable private currentPlace: string = "";
    @observable private currentCategory!: DiyToolCategory;
    @observable private currentState!: DiyToolState;
    @observable private currentInsructions: string = "";
    @observable private allDiyStates: Array<DiyToolState> = [];
    @observable private allDiyCategories: Array<DiyToolCategory> = [];

    /**
     * constructor
     * @param props 
     */
    constructor(props: IPropsAddDiyTool) {
        
        // Props
        super(props);

        // New! Needed since mobx 6
        // https://stackoverflow.com/questions/67034998/component-not-re-rendering-when-updating-the-state-in-mobx
        makeObservable(this);

        // Initialize state list
        this.diyStore.getAllDiyToolStates().then( (result: DiyToolState[]) => {
            this.allDiyStates = result;
            this.currentState = this.allDiyStates[0];
        } );

        // Initialize category list
        this.diyStore.getAllDiyToolCategories().then( (result: DiyToolCategory[]) => {
            this.allDiyCategories = result;
            this.currentCategory = this.allDiyCategories[0];
        } );
    }
    
    /**
     * resetFields
     */
     private resetFields() {
        this.currentLabel = "";
        this.currentTrademark = "";
        this.currentDescription = "";
        this.currentPlace = "";
        this.currentCategory = this.allDiyCategories[0];
        this.currentState = this.allDiyStates[0];
        this.currentInsructions = "";         
     }

    /**
     * addDiyTool
     */
    private addDiyTool() {

        console.log(this.currentLabel);
        console.log(this.currentTrademark);
        console.log(this.currentDescription);
        console.log(this.currentPlace);
        console.log(this.currentCategory.label);
        console.log(this.currentState.label);
        console.log(this.currentInsructions);

        this.resetFields();
    }

    /**
     * render method
     */
    public render (): JSX.Element { 

        return ( 
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="label6">Nom:</label>
                    <InputText id="label6" 
                                type="text" 
                                value={ this.currentLabel } 
                                title="Identication texte de l'outil" 
                                onChange={e => { this.currentLabel = e.currentTarget.value } }/>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="trademark6">Marque:</label>
                    <InputText id="trademark6" 
                                type="text" 
                                value={ this.currentTrademark } 
                                title="Marque de l'outil" 
                                onChange={e => { this.currentTrademark = e.currentTarget.value } } />
                </div>
                <div className="p-field p-col-12">
                    <label htmlFor="Description">Description:</label>
                    <InputTextarea id="Description"
                                    type="text"
                                    value={ this.currentDescription }
                                    title="Description de l'outil"
                                    onChange={e => { this.currentDescription = e.currentTarget.value } } />
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <label htmlFor="place">Emplacement (ex: C2) :</label>
                    <InputText id="place" 
                                type="text"
                                value={ this.currentPlace }
                                title="Emplacement de l'outil"
                                onChange={e => { this.currentPlace = e.currentTarget.value } }/>
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <label htmlFor="category">Catégorie:</label>
                    <Dropdown inputId="category" 
                                optionLabel= { "label" }
                                value={ this.currentCategory } 
                                options={ this.allDiyCategories } 
                                onChange={ (e) => { this.currentCategory = e.target.value } } 
                    />
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <label htmlFor="state">Etat général:</label>
                    <Dropdown inputId="state" 
                                optionLabel = { "label" }
                                value={ this.currentState } 
                                options={ this.allDiyStates } 
                                onChange={ (e) => { this.currentState = e.target.value } } 
                    />
                </div>
                <div className="p-field p-col-12">
                    <label htmlFor="instructionsForUse">Notice:</label>
                    <InputTextarea id="instructionsForUse" 
                                    type="text"
                                    value={ this.currentInsructions }
                                    title="Notice de l'outil"
                                    onChange={e => { this.currentInsructions = e.currentTarget.value } }/>
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <Button onClick={(event) => { this.addDiyTool(); return this.props.gotoDiyToolsAction() } } label='Valider' minLength={10} className='button-addtool-and-again'/><br/>
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <Button onClick={(event) => { return this.addDiyTool(); } } label='Valider et nouvel ajout' minLength={10} className='button-addtool'/><br/>
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <Button onClick={(event) => { return this.props.gotoDiyToolsAction() } } label='Annuler' minLength={10} className='button-cancel'/><br/>
                </div>
            </div>
         );
    }
}
