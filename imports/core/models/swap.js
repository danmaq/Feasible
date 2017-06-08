'use strict';

import { Exchange } from '../enums/exchange.js'

/** Swap point data. */
export class Swap {
    /**
     * Initialize new object.
     * @param long Long swap.
     * @param short Short swap.
     */
    constructor(long = 0, short = 0) {
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

    /** Get swap point. */
    point(exchange = Exchange.Buy) {
        return exchange === Exchange.Buy ? this.long : this.short;
    }
}