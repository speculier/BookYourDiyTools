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
    repairCompanyName: string;
    contactFirstName: string;
    contactLastName: string;
    repairDate: Date;
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
