'use strict';

import { Pair } from '../enums/pair.js'

/** Account data. */
export class Account {
    /**
     * Initialize new object.
     * @param {number} pair Currency pair (see Pair module)
     * @param {number} lot Lot unit.
     * @param {number} mul Initial multiply rate.
     * @param {number} step Step range of next action.
     * @param {number} martingale Martingale rate.
     */
    constructor(
        pair = Pair.USDJPY,
        lot = 10000,
        mul = 0.01,
        step = 1.0,
        martingale = 2) {
        this._pair = pair;
        this._lot = lot;
        this._mul = mul;
        this._step = step;
        this._martingale = martingale;
    }

    /** Currency pair. */
    get pair() {
        return this._pair;
    }

    /** Lot unit. */
    get lot() {
        return this._lot;
    }

    /** Initial multiply rate. */
    get mul() {
        return this._mul;
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
     * Load from de-serialized object.
     * @param {Object} raw Raw object.
     * @return {Account} Account object.
     */
    static load(raw = new Object()) {
        return new Account(
            raw["_pair"],
            raw["_lot"],
            raw["_mul"],
            raw["_step"],
            raw["_martingale"]);
    }
}