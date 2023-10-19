export interface Product {
	id: number;
	name: string;
	type: 'bit';
	codePrefix: 'BG';
}

export enum ProductID {
	SetOneNaturePermanentBankBackgrounds = 1,
	SetTwoDarkPermanentBankBackgrounds = 2,
	SetThreeTransparentAnimalsPermanentBankBackgrounds = 3,
	SetFourGirlsPermanentBankBackgrounds = 4,
	DynamicFarmingBackgroundPermanentBankBackgrounds = 5,
	DynamicToBBackgroundPermanentBankBackgrounds = 6,
	DynamicCoXBackgroundPermanentBankBackgrounds = 7
}

export const products: Product[] = [
	{
		id: ProductID.SetOneNaturePermanentBankBackgrounds,
		name: 'Set 1 (Nature) Permanent Bank Background Unlock',
		type: 'bit',
		codePrefix: 'BG'
	},
	{
		id: ProductID.SetTwoDarkPermanentBankBackgrounds,
		name: 'Set 2 (Dark) Permanent Bank Background Unlock',
		type: 'bit',
		codePrefix: 'BG'
	},
	{
		id: ProductID.SetThreeTransparentAnimalsPermanentBankBackgrounds,
		name: 'Set 3 (Transparent Animals) Permanent Bank Background Unlock',
		type: 'bit',
		codePrefix: 'BG'
	},
	{
		id: ProductID.SetFourGirlsPermanentBankBackgrounds,
		name: 'Set 4 (Girls) Permanent Bank Background Unlock',
		type: 'bit',
		codePrefix: 'BG'
	},
	{
		id: ProductID.DynamicFarmingBackgroundPermanentBankBackgrounds,
		name: 'Dynamic Farming Background - Permanent Bank Background Unlock',
		type: 'bit',
		codePrefix: 'BG'
	},
	{
		id: ProductID.DynamicToBBackgroundPermanentBankBackgrounds,
		name: 'Dynamic ToB Background - Permanent Bank Background Unlock',
		type: 'bit',
		codePrefix: 'BG'
	},
	{
		id: ProductID.DynamicCoXBackgroundPermanentBankBackgrounds,
		name: 'Dynamic CoX Background - Permanent Bank Background Unlock',
		type: 'bit',
		codePrefix: 'BG'
	}
];
