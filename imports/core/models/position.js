'use strict';

import { Exchange } from '../enums/exchange.js'
import { Rate } from './rate.js'

class Position {
    /**
     * Initialize new object.
     * @param rate Rate at ordered.
     * @param quantity Ordered quantity.
     * @param exchange Exchange type.
     * @param takeProfit Take profit.
     */
    constructor(
        rate = new Rate(),
        quantity = 1,
        exchange = Exchange.Buy,
        takeProfit = Number.NaN) {
        this._rate = rate;
        this._quantity = quantity;
        this._exchange = exchange;
        this._takeProfit = takeProfit;
    }

    /** Rate at ordered. */
    get rate() {
        return this._rate;
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
        return this.rate.gain(rate, this.exchange) * this.quantity;
    }

    isProfit(rate = new Rate()) {

    }
}