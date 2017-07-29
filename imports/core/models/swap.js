'use strict';

import { Exchange } from '../enums/exchange.js'
import { Utils } from '../utils.js'

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
     * Clone object.
     * @param {object} override Override object.
     * @return {Swap} Swap object.
     */
    clone(override = new Object()) {
        return new Swap(
            Utils.getValue('long', override, this.long),
            Utils.getValue('short', override, this.short));
    }
}

/** Extension of Swap point data. */
export class SwapUtil {
    /**
     * Load from de-serialized object.
     * @param {object} raw Raw object.
     * @return {Swap} Swap object.
     */
    static load(raw = new Object()) {
        return new Swap().clone(raw);
    }

    /**
     * Get swap point.
     * @param {Swap} source Source object.
     * @param {number} exchange Exchange type.
     * @return {number} Swap point.
     */
    static point(source = new Swap(), exchange = Exchange.BUY) {
        return exchange === Exchange.BUY ? source.long : source.short;
    }
}