
export interface DiyTools {
    diyTools: DiyTool[]
}

export enum DiyToolCategory
{
    PONCEUSE,
    TAILLE_HAIE,
    PERCEUSE
}

export enum DiyToolState
{
    NEUF,
    BON_ETAT,
    VIEUX,
    MAUVAIS_ETAT,
    TRES_MAUVAIS_ETAT
}

export interface DiyTool
{
    generalInfos: DiyToolGeneralInformations;
    stateInfos: DiyToolStateInformations;
    booked: boolean;
    bookingInfos?: DiyToolBookingInformations;
}

export interface DiyToolGeneralInformations
{
    label: string;
    tradeMark: string;
    category: DiyToolCategory;
    description: string;
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
    bookerFirstName: string;
    bookerLastName: string;
    phoneNb: string;
    backDate: Date;
}
