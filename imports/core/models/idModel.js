'use strict'

import { Mongo } from 'meteor/mongo';

import Model from './model.js';

/** Structure data. */
const structure = Object.freeze({ "_id": String });

/** Mongo model data. */
export default class IdModel extends Model {
    /**
     * Initialize new object.
     * @param {String} id unique key.
     */
    constructor(id = '') {
        super();
        this._id = id;
    }

    /** Key string for Mongo. */
    get id() {
        return this._id;
    }

    /**
     * Export object data for Mongo.
     * @return {object} data object.
     */
    exportWithoutId() {
        let result = Object.assign({}, this);
        delete result['_id'];
        return result;
    }

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {IdModel} Model object.
     */
    clone(override = {}) {
        const model = this.innerClone(override);
        model._id = this.getValue('id', override);
        return model;
    }

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {IdModel} Model object.
     */
    innerClone(override = {}) {
        return new IdModel();
    }

    /** Structure data. */
    static get structure() {
        return structure;
    }

    /** Generate random ID. */
    static randomId = () => new Mongo.ObjectID().valueOf();

    /** Remove collection matched data. */
    static remove = (id = '', collection = [new IdModel()]) =>
        collection.filter(m => m.id !== id);
}