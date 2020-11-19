import { DiyToolGeneralInformations } from "./DiyToolData";

/**
 * DiyRepairs class
 */
export interface DiyRepairs {
    repairs: DiyRepair[]
}

/**
 * DiyRepair class
 */
export interface DiyRepair {
    toolLabel: string;
    generalInfos: DiyToolGeneralInformations;
    repairInfos: DiyToolRepairInformations;
}

/**
 * DiyTool repair informations
 */
export interface DiyToolRepairInformations {
    repairDescription: string;
    repairCompanyName: string;
    contactFirstName: string;
    contactLastName: string;
    repairBackDate: Date;
    repairRating?: number;
}

/**
 * DiyTool repair company informations
 */
export interface DiyToolRepairCompanyInfos {
    repairCompanyName: string;
    repairCompanyAddress: string[];
    repairCompanyPhoneNumber: string;
}
