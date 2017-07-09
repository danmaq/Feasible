'use strict';

import { Swap } from './swap.js'
import { Pair } from '../enums/pair.js'

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
     * Load from de-serialized object.
     * @param {object} raw Raw object.
     * @return {Account} Account object.
     */
    static load(raw = new Object()) {
        const KEY_PAIR = '_pair';
        const KEY_SWAP = '_swap';
        const KEY_LOT = '_lot';
        const KEY_MUL = '_mul';
        const KEY_STEP = '_step';
        const KEY_MARTIN = '_martingale';
        return new Account(
            KEY_PAIR in raw ? raw[KEY_PAIR] : DEFAULT_PAIR,
            KEY_SWAP in raw ? Swap.load(raw[KEY_SWAP]) : new Swap(),
            KEY_LOT in raw ? raw[KEY_LOT] : DEFAULT_LOT,
            KEY_MUL in raw ? raw[KEY_MUL] : DEFAULT_MUL,
            KEY_STEP in raw ? raw[KEY_STEP] : DEFAULT_STEP,
            KEY_MARTIN in raw ? raw[KEY_MARTIN] : DEFAULT_MARTINGALE);
    }
}