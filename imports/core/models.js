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
    pair() {
        return this._pair;
    }
    step() {
        return this._step;
    }
    mul() {
        return this._mul;
    }
}