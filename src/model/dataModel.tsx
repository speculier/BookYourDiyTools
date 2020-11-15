import { getEnabledCategories } from "trace_events";

export interface DiyTools {
    diyTools: DiyTool[]
}

export enum DiyToolCategory
{
    SANDER='Ponceuse',            // PONCEUSE
    HEDGE_TRIMMER='Taille haie',  // TAILLE_HAIE
    DRILL='Perceuse'              // PERCEUSE
}

export enum DiyToolState
{
    NEW='New',
    GOOD_STATE='Good state',
    OLD='Old',
    BAD_STATE='Bad state',
    VERY_BAD_STATE='Very bad state'
}

export interface DiyTool
{
    // For listbox component
    label: string;

    generalInfos: DiyToolGeneralInformations;
    stateInfos: DiyToolStateInformations;
    booked: boolean;
    currentBookingInfos?: DiyToolBookingInformations;
    bookingHistory?: DiyToolBookingInformations[];
}

export interface DiyToolGeneralInformations
{
    tradeMark: string;
    category: DiyToolCategory;
    description: string;
    instructionsForUse?: string;
    //instructionVideo : 
    place: string;
}

export interface DiyToolStateInformations
{
    state: DiyToolState
    isBeingRepaired: boolean;
    isBroken: boolean;
}

export interface DiyToolBookingInformations
{
    currentBookerFirstName: string;
    currentBookerLastName: string;
    currentBookerPhoneNumber: string;
    currentBookerBackDate: Date;
}
