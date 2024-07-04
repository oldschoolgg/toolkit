export interface SimpleTableItem<T> {
    item: T;
    weight: number;
}
export declare class SimpleTable<T> {
    length: number;
    table: SimpleTableItem<T>[];
    totalWeight: number;
    constructor();
    add(item: T, weight?: number): this;
    delete(item: T): this;
    roll(): SimpleTableItem<T>['item'] | null;
    rollOrThrow(): SimpleTableItem<T>['item'];
}
//# sourceMappingURL=SimpleTable.d.ts.map