export type Product = {
    id: number;
    name: string;
    codePrefix: string;
} & ({
    type: 'bit';
    bit: StoreBitfield;
} | {
    type: 'active';
});
export declare enum ProductID {
    SetOneNaturePermanentBankBackgrounds = 1,
    SetTwoDarkPermanentBankBackgrounds = 2,
    SetThreeTransparentAnimalsPermanentBankBackgrounds = 3,
    SetFourGirlsPermanentBankBackgrounds = 4,
    DynamicFarmingBackgroundPermanentBankBackgrounds = 5,
    DynamicToBBackgroundPermanentBankBackgrounds = 6,
    DynamicCoXBackgroundPermanentBankBackgrounds = 7,
    OneHourDoubleLoot = 8,
    ThreeHourDoubleLoot = 9,
    HalloweenItemIconPack = 10
}
export declare enum StoreBitfield {
    HasSetOneNaturePermanentBankBackgrounds = 1,
    HasSetTwoDarkPermanentBankBackgrounds = 2,
    HasSetThreeTransparentAnimalsPermanentBankBackgrounds = 3,
    HasSetFourGirlsPermanentBankBackgrounds = 4,
    HasDynamicFarmingBackgroundPermanentBankBackgrounds = 5,
    HasDynamicToBBackgroundPermanentBankBackgrounds = 6,
    HasDynamicCoXBackgroundPermanentBankBackgrounds = 7,
    HalloweenItemIconPack = 10
}
export declare const products: Product[];
//# sourceMappingURL=Store.d.ts.map