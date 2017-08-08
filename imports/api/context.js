'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Model } from '../core/models/model.js';

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
     * @param {Model} model Model object.
     * @param {object} additional Additional data.
     * @return {object} Inserted object.
     */
    insertCollection(model = new Model(), additional = {}) {
        const recorsd = {...Context.recordData(model), ...additional };
        this.collection.insert(record);
        return record;
    }

    /**
     * Update object.
     * @param {Model} model Model object.
     * @param {object} additional Additional data.
     * @return {object} Inserted object.
     */
    updateCollection(model = new Model(), additional = {}) {
        const recorsd = {...Context.recordData(model), ...additional };
        this.collection.update(model.id, record);
        return record;
    }

    /**
     * Create record data.
     * @param {Model} model Data model object. 
     * @return {object} record data.
     */
    static recordData(model = new Model()) {
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