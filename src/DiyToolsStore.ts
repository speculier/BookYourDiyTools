import { DiyToolCategory, DiyTools, DiyToolState } from './dataModel';

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
					bookingHistory: 
					[ 
						{ currentBookerFirstName: 'Sébastien', currentBookerLastName: 'PECULIER', currentBookerPhoneNumber: '0612345678', currentBookerBackDate: new Date() },
					]
				},
				{ label:'Taille haie 2',
				booked: false,
				generalInfos: { description: 'Taille haie en bon état', place: 'C2', category: DiyToolCategory.HEDGE_TRIMMER, tradeMark: 'Black & Decker' }, 
				stateInfos: { state: DiyToolState.GOOD_STATE, isBeingRepaired: false, isBroken: false }
				},
				{ label:'Taille haie 3',
				booked: false,
				generalInfos: { description: 'Taille haie vert', place: 'C3', category: DiyToolCategory.HEDGE_TRIMMER, tradeMark: 'Black & Decker' }, 
				stateInfos: { state: DiyToolState.NEW, isBeingRepaired: false, isBroken: false }
				},
				{ label:'Ponceuse 1',
					booked: false,
					generalInfos: { description: 'Ponceuse d\'angle', place: 'A1', category: DiyToolCategory.SANDER, tradeMark: 'Bosch' }, 
					stateInfos: { state: DiyToolState.NEW, isBeingRepaired: false, isBroken: false }
				},
				{ label:'Perceuse Hilti sur batterie',
					booked: false,
					generalInfos: { description: 'Perceuse Hilti', place: 'H1', category: DiyToolCategory.DRILL, tradeMark: 'Hilti', instructionsForUse:'Instruction 1' }, 
					stateInfos: { state: DiyToolState.GOOD_STATE, isBeingRepaired: false, isBroken: true },
					bookingHistory: 
						[ 
							{ currentBookerFirstName: 'Thierry', currentBookerLastName: 'JILIBERT', currentBookerPhoneNumber: '060000000000', currentBookerBackDate: new Date() },
							{ currentBookerFirstName: 'Freddy', currentBookerLastName: 'ROBERGE', currentBookerPhoneNumber: '061111111111', currentBookerBackDate: new Date() },
							{ currentBookerFirstName: 'Guillaume', currentBookerLastName: 'BARANGER', currentBookerPhoneNumber: '073333333333', currentBookerBackDate: new Date() },
						]
				}
			  ]  
		}

		return allTools;
	}
}
