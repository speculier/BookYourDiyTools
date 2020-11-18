import { DiyToolGeneralInformations } from "./DiyToolData";

/**
 * DiyBookings class
 */
export interface DiyBookings {
    bookings: DiyBooking[]
}

/**
 * DiyBooking class
 */
export interface DiyBooking {
    toolLabel: string;
    generalInfos: DiyToolGeneralInformations;
    bookingInfos: DiyToolBookingInformations;
}

/**
 * DiyTool booking informations
 */
export interface DiyToolBookingInformations {
    bookerFirstName: string;
    bookerLastName: string;
    bookerPhoneNumber: string;
    bookerBackDate: Date;
    bookerRating?: number;
}
