'use strict';

/** Order modek */
class Order {
    /**
     * Initialize new object.
     * @param rate Rate instance.
     * @param quantity Ordered quantity.
     * @param exType Exchange type.
     */
    constructor(rate, quantity, exType) {
        this._rate = rate;
        this._quantity = quantity;
        this._exType = exType;
    }

    /** Rate instance. */
    get rate() {
        return this._rate;
    }

    /** Ordered quantity. */
    get quantity() {
        return this._quantity;
    }

    /** Exchange type. */
    get exchangeType() {
        return this._exType;
    }
}