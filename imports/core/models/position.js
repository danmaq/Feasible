'use strict';

import { Exchange } from '../enums/exchange.js'
import { Rate } from './rate.js'

class Position {
    /**
     * Initialize new object.
     * @param price Price at ordered.
     * @param quantity Ordered quantity.
     * @param exchange Exchange type.
     * @param takeProfit Take profit.
     */
    constructor(
        price = 0,
        quantity = 1,
        exchange = Exchange.Buy,
        takeProfit = Number.NaN) {
        this._price = price;
        this._quantity = quantity;
        this._exchange = exchange;
        this._takeProfit = takeProfit;
    }

    /** Price at ordered. */
    get price() {
        return this._price;
    }

    /** Ordered quantity. */
    get quantity() {
        return this._quantity;
    }

    /** Exchange type. */
    get exchange() {
        return this._exchange;
    }

    /** Exchange type. */
    get takeProfit() {
        return this._takeProfit;
    }

    gain(rate = new Rate()) {
        const stopPoint = Number(rate.getStopPoint(this.exchange));
    }
}