'use strict';

/** Account data. */
class Account {
    /**
     * Initialize new object.
     * @param pair Currency pair (see Pair module)
     * @param step Step range of next action.
     * @param mul Initial multiply rate.
     */
    constructor(pair, step, mul) {
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
}