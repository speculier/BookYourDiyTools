import { DiyToolBookingInformations, DiyToolGeneralInformations } from "./DiyToolData";

/**
 * Bookings class
 */
export interface Bookings {
    bookings: Booking[]
}

/**
 * Booking class
 */
export interface Booking
{
    toolLabel: string;
    generalInfos: DiyToolGeneralInformations;
    bookingInfos: DiyToolBookingInformations;
}

