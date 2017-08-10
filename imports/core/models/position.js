'use strict';

import { IdModel } from './idModel.js';
import { Exchange, ExchangeUtil } from '../enums/exchange.js';
import { Rate, RateUtil } from './rate.js';

/** Position model. */
export class Position extends IdModel {
    /**
     * Initialize new object.
     * @param {string} accountId Key of account.
     * @param {Rate} rate Rate at ordered.
     * @param {number} quantity Ordered quantity.
     * @param {number} exchange Exchange type.
     * @param {number} takeProfit Take profit.
     */
    constructor(
        accountId = '',
        rate = new Rate(),
        quantity = 1,
        exchange = Exchange.BUY,
        takeProfit = Number.NaN) {
        super();
        this._accountId = accountId;
        this._rate = rate;
        this._quantity = quantity;
        this._exchange = exchange;
        this._takeProfit = takeProfit;
    }

    /** Key of account. */
    get accountId() {
        return this._accountId;
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
     * Clone object.
     * @param {object} override Override object.
     * @return {Position} Position object.
     */
    innerClone(override = {}) {
        const result =
            new Rate(
                this.importValue('accountId', override),
                Rate.load(this.importValue('rate', override)),
                this.importValue('quantity', override),
                this.importValue('exchange', override),
                this.importValue('takeProfit', override));
        return result;
    }

    /**
     * Export object data for Mongo.
     * @return {object} data object.
     */
    exportWithoutId() {
        let result = super.exportWithoutId();
        result._rate = this.rate.exportWithoutId();
        return result;
    }

    /**
     * Load from de-serialized object.
     * @param {object} raw Raw object.
     * @return {Position} Position object.
     */
    static load(raw = {}) {
        return new Position().clone(raw);
    }
}

/** Extension of Position model. */
export class PositionUtil {
    /**
     * Get stringed exchange type.
     * @param {Position} source Source object.
     * @return {string} Stringed exchange type.
     */
    static strExchange(source = new Position()) {
        return ExchangeUtil.toStr(source.exchange);
    }

    /**
     * Get gain point.
     * @param {Position} source Source object.
     * @param {Rate} rate Current rate.
     * @return {number} Gain point.
     */
    static gain(source = new Position(), rate = new Rate()) {
        const traded = source.rate.tick;
        // TODO: Swap calculation.
        const ex = source.exchange;
        return RateUtil.gain(source.rate, rate, ex) * source.quantity;
    }

    /**
     * Can be take profit.
     * @param {Rate} rate Current rate.
     * @return {boolean} If can be take profit, return true.
     */
    static profit(source = new Position(), rate = new Rate()) {
        const ex = source.exchange;
        const sp = RateUtil.stopPoint(source.rate, ex);
        const tp = source.takeProfit;
        return ex === Exchange.BUY ? sp >= tp : sp <= tp;
    }
}