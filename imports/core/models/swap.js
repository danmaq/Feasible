'use strict';

import { Model } from './model.js';
import { Exchange } from '../enums/exchange.js';

/** Swap point data. */
export class Swap extends Model {
    /** Initialize new object. */
    constructor({ long = 0, short = 0 } = {}) {
        super();
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
    innerClone(override = {}) {
        const result =
            new Swap({
                "long": this.importValue('long', override),
                "short": this.importValue('short', override)
            });
        return result;
    }

    /**
     * Load from de-serialized object.
     * @param {object} raw Raw object.
     * @return {Swap} Swap object.
     */
    static load(raw = {}) {
        return new Swap().clone(raw);
    }
}

/** Extension of Swap point data. */
export class SwapUtil {
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