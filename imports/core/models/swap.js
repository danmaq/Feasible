'use strict';

import Model from './model.js';
import { Exchange, ExchangeUtil } from '../enums/exchange.js';

/** Structure data. */
const structure = Object.freeze({ "_long": Number, "_short": Number });

/** Swap point data. */
export default class Swap extends Model {
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
    clone(override = {}) {
        const keys = ['long', 'short'];
        return new Swap(this.getValues(keys, override));
    }

    /** Structure data. */
    static get structure() {
        return structure;
    }

    /** Load from de-serialized object. */
    static load = (raw = {}) => new Swap().clone(raw);

    /** Get swap point. */
    static point = (src = new Swap(), exchange = Exchange.BUY) =>
        exchange === Exchange.BUY ? src.long : src.short;
}