'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import IdModel from '../core/models/idModel.js';

/** API Context. */
export class Context {
    /**
     * Initialize new object.
     * @param {string} collectionName DB Collection name.
     */
    constructor(collectionName = '') {
        this._collection = new Mongo.Collection(collectionName);
        if (Meteor.isServer) {
            const getAll = () => this.collection.find(Context.uidData());
            Meteor.publish(collectionName, getAll);
        }
    }

    /** Collection object. */
    get collection() {
        return this._collection;
    }

    /**
     * Insert object.
     * @param {IdModel} model Model object.
     * @param {object} additional Additional data.
     * @return {object} Inserted object.
     */
    insertCollection(model = new IdModel(), additional = {}) {
        const record = {...Context.recordData(model), ...additional };
        this.collection.insert(record);
        return record;
    }

    /**
     * Update object.
     * @param {IdModel} model Model object.
     * @param {object} additional Additional data.
     * @return {object} Inserted object.
     */
    updateCollection(model = new IdModel(), additional = {}) {
        const record = {...Context.recordData(model), ...additional };
        this.collection.update(model.id, record);
        return record;
    }

    /**
     * Create record data.
     * @param {IdModel} model Data model object. 
     * @return {object} record data.
     */
    static recordData(model = new IdModel()) {
        return {...model.exportWithoutId(), ...Context.uidData() };
    }

    /**
     * Create user-ID data.
     * @return {object} user-ID data.
     */
    static uidData() {
        return { "owner": Meteor.userId() };
    }

    /** Assert already sign-in. */
    static checkSignIn() {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
    }
}