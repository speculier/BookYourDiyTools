
export interface DiyTools {
    diyTools: DiyTool[]
}
//export type DiyTools = DiyTool[];

export enum DiyToolCategory
{
    SANDER,         // PONCEUSE
    HEDGE_TRIMMER,  // TAILLE_HAIE
    DRILL           // PERCEUSE
}

export enum DiyToolState
{
    NEW,
    GOOD_STATE,
    OLD,
    BAD_STATE,
    VERY_BAD_STATE
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
    instructionsForUse?: string[];
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
    currentPhoneNb: string;
    backDate: Date;
}
