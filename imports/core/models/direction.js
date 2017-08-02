'use strict';

import { Operation } from '../enums/operation.js';

/** Direction data. */
export class Direction {
    /**
     * Initialize new object.
     * @param {number} operation Operation type.
     * @param {string} positionId Position model ID.
     * @param {string} orderId Order model ID.
     */
    constructor(
        operation = Operation.ORDER,
        positionId = '',
        orderId = '',
    ) {
        this._operation = operation;
        this._positionId = positionId;
        this._orderId = orderId;
    }

    /** Operation type. */
    get operation() {
        return this._operation;
    }

    /** Position model ID. */
    get positionId() {
        return this._positionId;
    }

    /** Order model ID. */
    get orderId() {
        return this._orderId;
    }

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {Direction} Direction object.
     */
    clone(override = {}) {
        const result =
            new Direction(
                Utils.getValue('operation', override, this.operation),
                Utils.getValue('positionId', override, this.positionId),
                Utils.getValue('orderId', override, this.orderId));
        return result;
    }
}

/** Extension of Direction data. */
export class DirectionUtil {
    /**
     * Load from de-serialized object.
     * @param {object} raw Raw object.
     * @return {Direction} Direction object.
     */
    static load(raw = {}) {
        return new Direction().clone(raw);
    }
}