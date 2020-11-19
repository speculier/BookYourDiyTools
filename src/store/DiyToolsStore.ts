import { DiyToolCategory, DiyTools, DiyToolState } from '../model/DiyToolData';

/**
 * DiyToolsStore class
 */
export class DiyToolsStore {

	/**
	 * 
	 */
	constructor() {
	}

	/**
	 * getAllTools
	 */
	getAllTools(): DiyTools {

		const allTools:DiyTools = {
			diyTools: [
				{  label:'Taille haie 1',
					booked: false,
					generalInfos: { description: 'Taille haie nul à chier', place: 'C1', category: DiyToolCategory.HEDGE_TRIMMER, tradeMark: 'Kubota' }, 
					stateInfos: { state: DiyToolState.VERY_BAD_STATE, isBeingRepaired: false, isBroken: true },
					currentBookingInfos: { bookerFirstName: 'Anthony', bookerLastName: 'HAMEL', bookerPhoneNumber: '0612345678', bookerBackDate: new Date() },
					bookingHistory: 
					[
						{ bookerFirstName: 'Sébastien', bookerLastName: 'PECULIER', bookerPhoneNumber: '0612345678', bookerBackDate: new Date(), bookerRating:0 },
					],
					currentRepairInfos: { repairDescription: 'f', contactFirstName: 'Ioan', contactLastName: 'LE GUE', repairCompanyName: 'AAAA', repairBackDate: new Date(), repairRating:7 },
					repairHistory: 
					[ 
						{ repairDescription: 'c', contactFirstName: 'Patrick', contactLastName: 'CHOUPIN', repairCompanyName: 'REPARTOUBONJOUR', repairBackDate: new Date(), repairRating:10 },
						{ repairDescription: 'd', contactFirstName: 'Stéphane', contactLastName: 'PERNOT', repairCompanyName: 'CADEPANNE44', repairBackDate: new Date(), repairRating:5 },
						{ repairDescription: 'e', contactFirstName: 'Olivier', contactLastName: 'LABONNE', repairCompanyName: 'Olvier LABONNE', repairBackDate:  new Date(), repairRating:2 },
					]
				},
				{ label:'Taille haie 2',
				booked: false,
				generalInfos: { description: 'Taille haie en bon état', place: 'C2', category: DiyToolCategory.HEDGE_TRIMMER, tradeMark: 'Black & Decker' }, 
				stateInfos: { state: DiyToolState.GOOD_STATE, isBeingRepaired: false, isBroken: false },
				currentBookingInfos: { bookerFirstName: 'Christohe', bookerLastName: 'COUTINEAU', bookerPhoneNumber: '0612345678', bookerBackDate: new Date() },
				repairHistory: 
					[ 
						{ repairDescription: 'b', contactFirstName: 'Sébastien', contactLastName: 'PECULIER', repairCompanyName: 'DEPANNE2000', repairBackDate:  new Date(), repairRating:1 },
					]
			},
				{ label:'Taille haie 3',
				booked: false,
				generalInfos: { description: 'Taille haie vert', place: 'C3', category: DiyToolCategory.HEDGE_TRIMMER, tradeMark: 'Black & Decker' }, 
				stateInfos: { state: DiyToolState.NEW, isBeingRepaired: false, isBroken: false },
				currentBookingInfos: { bookerFirstName: 'Christohe', bookerLastName: 'OLIVAUD', bookerPhoneNumber: '0612345678', bookerBackDate: new Date() },
				},
				{ label:'Ponceuse 1',
					booked: false,
					generalInfos: { description: 'Ponceuse d\'angle', place: 'A1', category: DiyToolCategory.SANDER, tradeMark: 'Bosch' }, 
					stateInfos: { state: DiyToolState.NEW, isBeingRepaired: false, isBroken: false },
					currentBookingInfos: { bookerFirstName: 'Frédéric', bookerLastName: 'MARTIENNE', bookerPhoneNumber: '0612345678', bookerBackDate: new Date() },
				},
				{ label:'Perceuse Hilti sur batterie',
					booked: false,
					generalInfos: { description: 'Perceuse Hilti', place: 'H1', category: DiyToolCategory.DRILL, tradeMark: 'Hilti', instructionsForUse:'Instruction 1' }, 
					stateInfos: { state: DiyToolState.GOOD_STATE, isBeingRepaired: false, isBroken: true },
					currentBookingInfos: { bookerFirstName: 'Ioan', bookerLastName: 'LE GUE', bookerPhoneNumber: '0612345678', bookerBackDate: new Date() },
					bookingHistory: 
						[ 
							{ bookerFirstName: 'Thierry', bookerLastName: 'JILIBERT', bookerPhoneNumber: '060000000000', bookerBackDate: new Date(), bookerRating:10 },
							{ bookerFirstName: 'Freddy', bookerLastName: 'ROBERGE', bookerPhoneNumber: '061111111111', bookerBackDate: new Date(), bookerRating:5 },
							{ bookerFirstName: 'Guillaume', bookerLastName: 'BARANGER', bookerPhoneNumber: '073333333333', bookerBackDate: new Date(), bookerRating:3 },
						],
					currentRepairInfos: { repairDescription: 'a', contactFirstName: 'Johan', contactLastName: 'PECOT', repairCompanyName: 'BBBBBBBB', repairBackDate:  new Date(), repairRating:7 },
				}
			  ]  
		}

		return allTools;
	}
}
