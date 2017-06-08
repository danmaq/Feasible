'use strict';

import { Exchange } from '../enums/exchange.js'
import { Rate } from './rate.js'

/** Position model. */
export class Position {
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

    /** Take profit. */
    get takeProfit() {
        return this._takeProfit;
    }

    /** Get gain. */
    gain(rate = new Rate()) {
        return this.rate.gain(rate, this.exchange) * this.quantity;
    }

    /** Can be take profit. */
    isProfit(rate = new Rate()) {
        const ex = this.exchange;
        const sp = this.rate.stopPoint(ex);
        const tp = this.takeProfit;
        return ex === Exchange.Buy ? sp >= tp : sp <= tp;
    }
}