'use strict';

import { Pair, PairUtil } from '../enums/pair.js';

import { Model } from './model.js';
import { Rate } from './rate.js';
import { Swap } from './swap.js';

/** Account data. */
export class Account extends Model {
    /**
     * Initialize new object.
     * @param {number} pair Currency pair (see Pair module)
     * @param {Rate} rate Exchange rate data.
     * @param {Swap} swap Swap point to exchange.
     * @param {number} lot Lot unit.
     * @param {number} mul Initial multiply rate.
     * @param {number} step Step range of next action.
     * @param {number} martingale Martingale rate.
     */
    constructor(
        pair = Pair.USDJPY,
        rate = new Rate(),
        swap = new Swap(),
        lot = 10000,
        mul = 0.01,
        step = 1.0,
        martingale = 2) {
        super();
        this._pair = pair;
        this._rate = rate;
        this._swap = swap;
        this._lot = lot;
        this._mul = mul;
        this._step = step;
        this._martingale = martingale;
    }

    /** Currency pair. */
    get pair() {
        return this._pair;
    }

    /** Exchange rate data. */
    get rate() {
        return this._rate;
    }

    /** Swap point. */
    get swap() {
        return this._swap;
    }

    /** Lot unit. */
    get lot() {
        return this._lot;
    }

    /** Initial multiply rate. */
    get mul() {
        return this._mul;
    }

    /** Step range of next action (PIPS). */
    get step() {
        return this._step;
    }

    /** Martingale rate. */
    get martingale() {
        return this._martingale;
    }

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {Account} Account object.
     */
    innerClone(override = {}) {
        const result =
            new Account(
                this.importValue('pair', override),
                Rate.load(this.importValue('rate', override)),
                Swap.load(this.importValue('swap', override)),
                this.importValue('lot', override),
                this.importValue('mul', override),
                this.importValue('step', override),
                this.importValue('martingale', override));
        return result;
    }

    /**
     * Export object data for Mongo.
     * @return {object} data object.
     */
    exportWithoutId() {
        let result = super.exportWithoutId();
        result._rate = this.rate.exportWithoutId();
        result._swap = this.swap.exportWithoutId();
        return result;
    }

    /**
     * Load from de-serialized object.
     * @param {object} raw Raw object.
     * @return {Account} Account object.
     */
    static load(raw = {}) {
        return new Account().clone(raw);
    }
}

/** Extension of Account data. */
export class AccountUtil {}