'use strict';

import { Exchange } from '../enums/exchange.js'
import { Rate } from './rate.js'

/** Position model. */
export class Position {
    /**
     * Initialize new object.
     * @param {Rate} rate Rate at ordered.
     * @param {number} quantity Ordered quantity.
     * @param {number} exchange Exchange type.
     * @param {number} takeProfit Take profit.
     */
    constructor(
        rate = new Rate(),
        quantity = 1,
        exchange = Exchange.BUY,
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

    /**
     * Load from de-serialized object.
     * @param {object} raw Raw object.
     * @return {Position} Position object.
     */
    static load(raw = new Object()) {
        return new Position(
            Rate.load(raw["rate"]),
            raw["quantity"],
            raw["exchange"],
            raw["takeProfit"]);
    }

    /**
     * Get gain point.
     * @param {Rate} rate Current rate.
     * @return {number} Gain point.
     */
    gain(rate = new Rate()) {
        var traded = this.rate.tick;
        // TODO: Swap calculation.
        return this.rate.gain(rate, this.exchange) * this.quantity;
    }

    /**
     * Can be take profit.
     * @param {Rate} rate Current rate.
     * @return {boolean} If can be take profit, return true.
     */
    isProfit(rate = new Rate()) {
        const ex = this.exchange;
        const sp = this.rate.stopPoint(ex);
        const tp = this.takeProfit;
        return ex === Exchange.BUY ? sp >= tp : sp <= tp;
    }
}