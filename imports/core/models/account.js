'use strict';

import { Pair, PairUtil } from '../enums/pair.js';

import IdModel from './idModel.js';
import Direction from './direction.js';
import Position from './position.js';
import Order from './order.js';
import Preference from './order.js';
import Rate from './rate.js';
import Swap from './swap.js';

/** Account data. */
export default class Account extends IdModel {
    /** Empty object. */
    static empty =
        Object.freeze(
            new Account({
                "directions": [], "positions": [], "orders": [] }));

    /** Initialize new object. */
    constructor({
        rate = new Rate(),
        swap = new Swap(),
        preference = new Preference(),
        directions = [new Order()],
        positions = [new Position()],
        orders = [new Order()]
    } = {}) {
        super();
        this._rate = rate;
        this._swap = swap;
        this._directions = directions;
        this._positions = positions;
        this._orders = orders;
    }

    /** Exchange rate data. */
    get rate() {
        return this._rate;
    }

    /** Swap point. */
    get swap() {
        return this._swap;
    }

    /** Others preference. */
    get preference() {
        return this._preference;
    }

    /** Directions collection. */
    get directions() {
        return this._directions;
    }

    /** Positions collection. */
    get positions() {
        return this._positions;
    }

    /** Orders collection. */
    get orders() {
        return this._orders;
    }

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {Account} Account object.
     */
    clone(override = {}) {
        return super.clone(override);
    }

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {Account} Account object.
     */
    innerClone(override = {}) {
        const result =
            new Account({
                "rate": Rate.load(this.getValue('rate', override)),
                "swap": Swap.load(this.getValue('swap', override)),
                "preference": Preference.load(this.getValue('preference', override)),
                "directions": this.getValue('directions', override),
                "positions": this.getValue('positions', override),
                "orders": this.getValue('orders', override),
            });
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

    /** Load from de-serialized object. */
    static load = (raw = {}) => Account.empty.clone(raw);

    /** Culculate minimum step. */
    static minStep = (account = new Account()) =>
        Math.pow(10, -account.column);
}
