
import { DiyToolBookingInformations } from "./DiyBookingData";
import { DiyToolRepairInformations } from "./DiyRepairData";

/**
 * DiyTools categories
 */
export enum DiyToolCategory {
    SANDER='Ponceuse',            // PONCEUSE
    HEDGE_TRIMMER='Taille haie',  // TAILLE_HAIE
    DRILL='Perceuse'              // PERCEUSE
}

/**
 * DiyTools states
 */
export enum DiyToolState {
    NEW='Neuf',
    GOOD_STATE='Bon état',
    OLD='Vieux',
    BAD_STATE='Mauvais état',
    VERY_BAD_STATE='Très mauvais état'
}

/**
 * DiyTools list
 */
export interface DiyTools {
    diyTools: DiyTool[]
}

/**
 * DiyTool base class
 */
export interface DiyTool {
    // For listbox/dropdown components
    label: string;

    generalInfos: DiyToolGeneralInformations;
    stateInfos: DiyToolStateInformations;
    booked: boolean;
    currentBookingInfos?: DiyToolBookingInformations;
    currentRepairInfos?: DiyToolRepairInformations;
    bookingHistory?: DiyToolBookingInformations[];
    repairHistory?: DiyToolRepairInformations[];
}

/**
 * DiyTool general informations
 */
export interface DiyToolGeneralInformations {
    tradeMark: string;
    category: DiyToolCategory;
    description: string;
    instructionsForUse?: string;
    //instructionVideo : 
    place: string;
}

/**
 * DiyTool state informations (booking state, being repaired?, ...)
 */
export interface DiyToolStateInformations {
    state: DiyToolState
    isBeingRepaired: boolean;
    isBroken: boolean;
}
