'use strict';

import { Operation } from '../enums/operation.js';

import Model from './model.js';
import Position from './position.js';
import Order from './order.js';

/** Structure data. */
const structure =
    Object.freeze({
        "_operation": Number,
        "_position": Position.structure,
        "_order": Order.structure,
    });

/** Direction data. */
export default class Direction extends Model {
    /** Initialize new object. */
    constructor({
        operation = Operation.ORDER,
        position = new Position(),
        order = new Order(),
    } = {}) {
        super();
        this._operation = operation;
        this._position = position;
        this._order = order;
    }

    /** Operation type. */
    get operation() {
        return this._operation;
    }

    /** New position model. */
    get position() {
        return this._position;
    }

    /** New order model. */
    get order() {
        return this._order;
    }

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {Direction} Direction object.
     */
    clone(override = {}) {
        const srcPosition = this.getValue('position', override);
        const srcOrder = this.getValue('order', override);
        const result =
            new Direction({
                "operation": this.getValue('operation', override),
                "position": srcPosition ? Position.load(srcPosition) : null,
                "order": srcOrder ? Order.load(srcOrder) : null
            });
        return result;
    }

    /** Structure data. */
    static get structure() {
        return structure;
    }

    /** Create empty object. */
    static empty = () => new Direction({ "position": null, "order": null });

    /** Load from de-serialized object. */
    static load = (raw = {}) => Direction.empty().clone(raw);
}