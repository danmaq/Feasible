'use strict';

import { Exchange } from '../enums/exchange.js'

const DEFAULT_LONG = 0;
const DEFAULT_SHORT = 0;

/** Swap point data. */
export class Swap {
    /**
     * Initialize new object.
     * @param {number} long Long swap.
     * @param {number} short Short swap.
     */
    constructor(long = DEFAULT_LONG, short = DEFAULT_SHORT) {
        this._long = long;
        this._short = short;
    }

    /** Long swap. */
    get long() {
        return this._long;
    }

    /** Short swap. */
    get short() {
        return this._short;
    }

    /**
     * Load from de-serialized object.
     * @param {object} raw Raw object.
     * @return {Swap} Swap object.
     */
    static load(raw = new Object()) {
        const KEY_LONG = '_long';
        const KEY_SHORT = '_short';
        return new Swap(
            KEY_LONG in raw ? raw[KEY_LONG] : DEFAULT_LONG,
            KEY_SHORT in raw ? raw[KEY_SHORT] : DEFAULT_SHORT);
    }

    /**
     * Get swap point.
     * @param {number} exchange Exchange type.
     * @return {number} Swap point.
     */
    point(exchange = Exchange.BUY) {
        return exchange === Exchange.BUY ? this.long : this.short;
    }
}