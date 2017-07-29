'use strict';

import { Swap } from './swap.js'
import { Pair, PairUtil } from '../enums/pair.js'
import { Utils } from '../utils.js'

const DEFAULT_PAIR = Pair.USDJPY;
const DEFAULT_LOT = 10000;
const DEFAULT_MUL = 0.01;
const DEFAULT_STEP = 1.0;
const DEFAULT_MARTINGALE = 2;

/** Account data. */
export class Account {
    /**
     * Initialize new object.
     * @param {number} pair Currency pair (see Pair module)
     * @param {Swap} swap Swap point to exchange.
     * @param {number} lot Lot unit.
     * @param {number} mul Initial multiply rate.
     * @param {number} step Step range of next action.
     * @param {number} martingale Martingale rate.
     */
    constructor(
        pair = DEFAULT_PAIR,
        swap = new Swap(),
        lot = DEFAULT_LOT,
        mul = DEFAULT_MUL,
        step = DEFAULT_STEP,
        martingale = DEFAULT_MARTINGALE) {
        this._pair = pair;
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
    clone(override = new Object()) {
        return new Account(
            Utils.getValue('pair', override, this.pair),
            Utils.getValue('swap', override, this.swap.clone()),
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
    static load(raw = new Object()) {
        return new Account().clone(raw);
    }

    /** Get stringed currency pair. */
    static getStrPair(account = new Account()) {
        return PairUtil.toStr(account.pair);
    }
}