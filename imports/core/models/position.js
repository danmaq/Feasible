'use strict';

import IdModel from './idModel.js';
import Rate from './rate.js';
import Swap from './swap.js';

import { Exchange } from '../enums/exchange.js';

/** Structure data. */
const structure =
    Object.freeze({
        ...IdModel.structure,
        "_tick": Date,
        "_price": Number,
        "_quantity": Number,
        "_exchange": Number,
        "_takeProfit": Number
    });

/** Position model. */
export default class Position extends IdModel {
    /** Initialize new object. */
    constructor({
        id = '',
        tick = new Date(),
        price = 0,
        quantity = 1,
        exchange = Exchange.BUY,
        takeProfit = Number.NaN
    } = {}) {
        super(id);
        this._tick = tick;
        this._price = price;
        this._quantity = quantity;
        this._exchange = exchange;
        this._takeProfit = takeProfit;
    }

    /** Date-Time at ordered. */
    get tick() {
        return this._tick;
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

    /** Take profit. */
    get takeProfit() {
        return this._takeProfit;
    }

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {Position} Position object.
     */
    clone(override = {}) {
        return super.clone(override);
    }

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {Position} Position object.
     */
    innerClone(override = {}) {
        const keys = ['tick', 'price', 'quantity', 'exchange', 'takeProfit'];
        return new Position(this.getValues(keys, override));
    }

    /** Structure data. */
    static get structure() {
        return structure;
    }

    /** Load from de-serialized object. */
    static load = (raw = {}) =>
        new Position({ "id": IdModel.randomId() }).clone(raw);

    /** Get gain point. */
    static gain = ({
        src = new Position(),
        rate = new Rate(),
        swap = new Swap(),
    } = {}) => {
        const gap = rate.tick.getTime() - src.tick.getTime();
        const days = (gap / 86400000) >> 0;
        const swapPoint = Swap.point(swap, src.exchange) * days;
        const stop = Rate.stopPrice(rate, src.exchange);
        return (src.price - stop + swapPoint) * src.quantity;
    };

    /** Can be take profit. */
    static profit = ({ src = new Position(), rate = new Rate() } = {}) => {
        const ex = src.exchange;
        const sp = Rate.stopPrice(rate, ex);
        const tp = src.takeProfit;
        return !Number.isNaN(tp) && ex === Exchange.BUY ? sp >= tp : sp <= tp;
    };
}