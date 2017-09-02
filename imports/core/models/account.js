'use strict';

import IdModel from './idModel.js';
import Position from './position.js';
import Order from './order.js';
import Preference from './preference.js';
import Rate from './rate.js';
import Swap from './swap.js';

/** Structure data. */
const structure =
    Object.freeze({
        ...IdModel.structure,
        _rate: Rate.structure,
        _swap: Swap.structure,
        _preference: Preference.structure,
        _positions: Object.freeze([Position.structure]),
        _orders: Object.freeze([Order.structure])
    });

/** Account data. */
export default class Account extends IdModel {
    /** Empty object. */
    static empty =
        Object.freeze(new Account({ positions: [], orders: [] }));

    /** Initialize new object. */
    constructor({
        rate = new Rate(),
        swap = new Swap(),
        preference = new Preference(),
        positions = [new Position()],
        orders = [new Order()]
    } = {}) {
        super();
        this._rate = rate;
        this._swap = swap;
        this._preference = preference;
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
                rate: Rate.load(this.getValue('rate', override)),
                swap: Swap.load(this.getValue('swap', override)),
                preference: Preference.load(this.getValue('preference', override)),
                positions: this.getValue('positions', override).map(Position.load),
                orders: this.getValue('orders', override).map(Order.load),
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

    /** Structure data. */
    static get structure() {
        return structure;
    }

    /** Load from de-serialized object. */
    static load = (raw = {}) => Account.empty.clone(raw);
}