'use strict';

import { Operation } from '../enums/operation.js';

import IdModel from './idModel.js';
import Position from './position.js';
import Order from './order.js';

/** Structure data. */
const structure =
    Object.freeze({
        ...IdModel.structure,
        "_operation": Number,
        "_position": Position.structure,
        "_order": Order.structure,
    });

/** Direction data. */
export default class Direction extends IdModel {
    /** Initialize new object. */
    constructor({
        id = '',
        operation = Operation.ORDER,
        position = new Position(),
        order = new Order(),
    } = {}) {
        super(id);
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
        return super.clone(override);
    }

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {Direction} Direction object.
     */
    innerClone(override = {}) {
        const result =
            new Direction({
                "operation": this.getValue('operation', override),
                "position": Position.load(this.getValue('position', override)),
                "order": Order.load(this.getValue('order', override))
            });
        return result;
    }

    /** Structure data. */
    static get structure() {
        return structure;
    }

    /** Load from de-serialized object. */
    static load = (raw = {}) =>
        new Direction({ "id": IdModel.randomId() }).clone(raw);
}