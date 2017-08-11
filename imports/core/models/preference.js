'use strict';

import Model from './model.js';

/** Account preference model. */
export default class Preference extends Model {
    /** Initialize new object. */
    constructor({
        pair = Pair.USDJPY,
        column = 3,
        lot = 10000,
        multiply = 0.01,
        step = 1.0,
        martingale = 2,
    } = {}) {
        super();
        this._pair = pair;
        this._column = column;
        this._lot = lot;
        this._multiply = multiply;
        this._step = step;
        this._martingale = martingale;
    }

    /** Currency pair. */
    get pair() {
        return this._pair;
    }

    /** Column of pips. */
    get column() {
        return this._column;
    }

    /** Lot unit. */
    get lot() {
        return this._lot;
    }

    /** Initial multiply rate. */
    get multiply() {
        return this._multiply;
    }

    /** Step range of next action (PIPS). */
    get step() {
        return this._step;
    }

    /** Martingale rate. */
    get martingale() {
        return this._martingale;
    }

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {Preference} Account preference object.
     */
    clone(override = {}) {
        const keys = ['pair', 'column', 'lot', 'multiply', 'martingale'];
        return new Preference(this.getValues(keys, override));
    }

    /** Load from de-serialized object. */
    static load = (raw = {}) => new Preference().clone(raw);

    /** Culculate minimum step. */
    static minStep = (preference = new Preference()) =>
        Math.pow(10, -preference.column);
}