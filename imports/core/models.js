'use strict';

const Pair = Object.freeze({
    EURCHF: 0,
    GBPJPY: 1,
    AUDNZD: 2,
});

class Account {
    constructor(pair, step, mul) {
        this._pair = pair;
        this._step = step;
        this._mul = mul;
    }

    /** Pair. */
    get pair() {
        return this._pair;
    }

    /** Step rate (PIPS). */
    get step() {
        return this._step;
    }

    /** Initial multiply rate. */
    get mul() {
        return this._mul;
    }
}