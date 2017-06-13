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

    /**
     * Load from de-serialized object.
     * @param raw Raw object.
     * @return Swap object.
     */
    static
    load(raw = new Object()) {
        return new Swap(raw["long"], raw["short"]);
    }

    /** Get swap point. */
    point(exchange = Exchange.BUY) {
        return exchange === Exchange.BUY ? this.long : this.short;
    }
}