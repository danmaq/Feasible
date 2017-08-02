'use strict';

import { Swap, SwapUtil } from './swap.js';
import { Rate, RateUtil } from './rate.js';
import { Pair, PairUtil } from '../enums/pair.js';
import { Utils } from '../utils.js';

/** Default currency pair value. */
const DEFAULT_PAIR = Pair.USDJPY;

/** Default lot unit value. */
const DEFAULT_LOT = 10000;

/** Default initial multiply rate value. */
const DEFAULT_MUL = 0.01;

/** Default Step range value of next action. */
const DEFAULT_STEP = 1.0;

/** Default martingale rate value. */
const DEFAULT_MARTINGALE = 2;

/** Account data. */
export class Account {
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
        pair = DEFAULT_PAIR,
        rate = new Rate(),
        swap = new Swap(),
        lot = DEFAULT_LOT,
        mul = DEFAULT_MUL,
        step = DEFAULT_STEP,
        martingale = DEFAULT_MARTINGALE) {
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
    clone(override = {}) {
        return new Account(
            Utils.getValue('pair', override, this.pair),
            RateUtil.load(Utils.getValue('rate', override, this.rate)),
            SwapUtil.load(Utils.getValue('swap', override, this.swap)),
            Utils.getValue('lot', override, this.lot),
            Utils.getValue('mul', override, this.mul),
            Utils.getValue('step', override, this.step),
            Utils.getValue('martingale', override, this.martingale));
    }
}

/** Extension of Account data. */
export class AccountUtil {
    /**
     * Load from de-serialized object.
     * @param {object} raw Raw object.
     * @return {Account} Account object.
     */
    static load(raw = {}) {
        return new Account().clone(raw);
    }

    /** Get stringed currency pair. */
    static getStrPair(account = new Account()) {
        return PairUtil.toStr(account.pair);
    }
}