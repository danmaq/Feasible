'use strict';

import { Pair } from '../enums/pair.js'

/** Account data. */
export class Account {
    /**
     * Initialize new object.
     * @param {number} pair Currency pair (see Pair module)
     * @param {number} step Step range of next action.
     * @param {number} mul Initial multiply rate.
     */
    constructor(pair = Pair.USDJPY, step = 1.0, mul = 2) {
        this._pair = pair;
        this._step = step;
        this._mul = mul;
    }

    /** Currency pair. */
    get pair() {
        return this._pair;
    }

    /** Step range of next action (PIPS). */
    get step() {
        return this._step;
    }

    /** Initial multiply rate. */
    get mul() {
        return this._mul;
    }

    /**
     * Load from de-serialized object.
     * @param {Object} raw Raw object.
     * @return {Account} Account object.
     */
    static load(raw = new Object()) {
        return new Account(raw["_pair"], raw["_step"], raw["_mul"]);
    }
}