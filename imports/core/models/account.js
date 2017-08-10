'use strict';

import { Pair, PairUtil } from '../enums/pair.js';

import { IdModel } from './idModel.js';
import { Rate } from './rate.js';
import { Swap } from './swap.js';

/** Account data. */
export class Account extends IdModel {
    /** Initialize new object. */
    constructor({pair = Pair.USDJPY,
        rate = new Rate(),
        swap = new Swap(),
        lot = 10000,
        multiply = 0.01,
        step = 1.0,
        martingale = 2
    } = {}) {
        super();
        this._pair = pair;
        this._rate = rate;
        this._swap = swap;
        this._lot = lot;
        this._multiply = multiply;
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
    get multiply() {
        return this._multiply;
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
            new Account({
                "pair": this.importValue('pair', override),
                "rate": Rate.load(this.importValue('rate', override)),
                "swap": Swap.load(this.importValue('swap', override)),
                "lot": this.importValue('lot', override),
                "multiply": this.importValue('multiply', override),
                "step": this.importValue('step', override),
                "martingale": this.importValue('martingale', override)
            });
        return result;
    }

    /**
     * Export object data for Mongo.
     * @return {object} data object.
     */
    exportWithoutId() {
        let result = super.exportWithoutId();
        result._rate = this.rate.exportWithoutId();
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