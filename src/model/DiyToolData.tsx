
import { DiyToolBookingInformations } from "./DiyBookingData";
import { DiyToolRepairInformations } from "./DiyRepairData";

/**
 * DiyTool categories
 */
export interface DiyToolCategory {
    id: number;
    label: string;
}

/**
 * DiyTool states
 */
export interface DiyToolState {
    id: number;
    label: string;
}

/**
 * DiyTools list
 */
export interface DiyTools {
    diyTools: DiyTool[];
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
    place: string;
}

/**
 * DiyTool state informations (booking state, being repaired?, ...)
 */
export interface DiyToolStateInformations {
    state: DiyToolState;
    isBeingRepaired: boolean;
    isBroken: boolean;
}
