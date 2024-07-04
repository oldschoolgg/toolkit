"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = exports.StoreBitfield = exports.ProductID = void 0;
var ProductID;
(function (ProductID) {
    ProductID[ProductID["SetOneNaturePermanentBankBackgrounds"] = 1] = "SetOneNaturePermanentBankBackgrounds";
    ProductID[ProductID["SetTwoDarkPermanentBankBackgrounds"] = 2] = "SetTwoDarkPermanentBankBackgrounds";
    ProductID[ProductID["SetThreeTransparentAnimalsPermanentBankBackgrounds"] = 3] = "SetThreeTransparentAnimalsPermanentBankBackgrounds";
    ProductID[ProductID["SetFourGirlsPermanentBankBackgrounds"] = 4] = "SetFourGirlsPermanentBankBackgrounds";
    ProductID[ProductID["DynamicFarmingBackgroundPermanentBankBackgrounds"] = 5] = "DynamicFarmingBackgroundPermanentBankBackgrounds";
    ProductID[ProductID["DynamicToBBackgroundPermanentBankBackgrounds"] = 6] = "DynamicToBBackgroundPermanentBankBackgrounds";
    ProductID[ProductID["DynamicCoXBackgroundPermanentBankBackgrounds"] = 7] = "DynamicCoXBackgroundPermanentBankBackgrounds";
    ProductID[ProductID["OneHourDoubleLoot"] = 8] = "OneHourDoubleLoot";
    ProductID[ProductID["ThreeHourDoubleLoot"] = 9] = "ThreeHourDoubleLoot";
    ProductID[ProductID["HalloweenItemIconPack"] = 10] = "HalloweenItemIconPack";
})(ProductID || (exports.ProductID = ProductID = {}));
var StoreBitfield;
(function (StoreBitfield) {
    StoreBitfield[StoreBitfield["HasSetOneNaturePermanentBankBackgrounds"] = 1] = "HasSetOneNaturePermanentBankBackgrounds";
    StoreBitfield[StoreBitfield["HasSetTwoDarkPermanentBankBackgrounds"] = 2] = "HasSetTwoDarkPermanentBankBackgrounds";
    StoreBitfield[StoreBitfield["HasSetThreeTransparentAnimalsPermanentBankBackgrounds"] = 3] = "HasSetThreeTransparentAnimalsPermanentBankBackgrounds";
    StoreBitfield[StoreBitfield["HasSetFourGirlsPermanentBankBackgrounds"] = 4] = "HasSetFourGirlsPermanentBankBackgrounds";
    StoreBitfield[StoreBitfield["HasDynamicFarmingBackgroundPermanentBankBackgrounds"] = 5] = "HasDynamicFarmingBackgroundPermanentBankBackgrounds";
    StoreBitfield[StoreBitfield["HasDynamicToBBackgroundPermanentBankBackgrounds"] = 6] = "HasDynamicToBBackgroundPermanentBankBackgrounds";
    StoreBitfield[StoreBitfield["HasDynamicCoXBackgroundPermanentBankBackgrounds"] = 7] = "HasDynamicCoXBackgroundPermanentBankBackgrounds";
    StoreBitfield[StoreBitfield["HalloweenItemIconPack"] = 10] = "HalloweenItemIconPack";
})(StoreBitfield || (exports.StoreBitfield = StoreBitfield = {}));
exports.products = [
    {
        id: ProductID.SetOneNaturePermanentBankBackgrounds,
        name: 'Set 1 (Nature) Permanent Bank Background Unlock',
        type: 'bit',
        codePrefix: 'BG',
        bit: StoreBitfield.HasSetOneNaturePermanentBankBackgrounds
    },
    {
        id: ProductID.SetTwoDarkPermanentBankBackgrounds,
        name: 'Set 2 (Dark) Permanent Bank Background Unlock',
        type: 'bit',
        codePrefix: 'BG',
        bit: StoreBitfield.HasSetTwoDarkPermanentBankBackgrounds
    },
    {
        id: ProductID.SetThreeTransparentAnimalsPermanentBankBackgrounds,
        name: 'Set 3 (Transparent Animals) Permanent Bank Background Unlock',
        type: 'bit',
        codePrefix: 'BG',
        bit: StoreBitfield.HasSetThreeTransparentAnimalsPermanentBankBackgrounds
    },
    {
        id: ProductID.SetFourGirlsPermanentBankBackgrounds,
        name: 'Set 4 (Girls) Permanent Bank Background Unlock',
        type: 'bit',
        codePrefix: 'BG',
        bit: StoreBitfield.HasSetFourGirlsPermanentBankBackgrounds
    },
    {
        id: ProductID.DynamicFarmingBackgroundPermanentBankBackgrounds,
        name: 'Dynamic Farming Background - Permanent Bank Background Unlock',
        type: 'bit',
        codePrefix: 'BG',
        bit: StoreBitfield.HasDynamicFarmingBackgroundPermanentBankBackgrounds
    },
    {
        id: ProductID.DynamicToBBackgroundPermanentBankBackgrounds,
        name: 'Dynamic ToB Background - Permanent Bank Background Unlock',
        type: 'bit',
        codePrefix: 'BG',
        bit: StoreBitfield.HasDynamicToBBackgroundPermanentBankBackgrounds
    },
    {
        id: ProductID.DynamicCoXBackgroundPermanentBankBackgrounds,
        name: 'Dynamic CoX Background - Permanent Bank Background Unlock',
        type: 'bit',
        codePrefix: 'BG',
        bit: StoreBitfield.HasDynamicCoXBackgroundPermanentBankBackgrounds
    },
    {
        id: ProductID.OneHourDoubleLoot,
        name: 'One Hour Double Loot (Single Use)',
        type: 'active',
        codePrefix: 'DOUBLE'
    },
    {
        id: ProductID.ThreeHourDoubleLoot,
        name: 'Three Hour Double Loot (Single Use)',
        type: 'active',
        codePrefix: 'DOUBLE'
    },
    {
        id: ProductID.HalloweenItemIconPack,
        name: 'Halloween Item Icon and Background Pack',
        type: 'bit',
        codePrefix: 'BG',
        bit: StoreBitfield.HalloweenItemIconPack
    }
];
//# sourceMappingURL=Store.js.map