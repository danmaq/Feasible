'set strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { OperationUtil } from '../../core/enums/operation.js';

import Direction from '../../core/models/direction.js';

import './direction.html';

/** Get template data. */
const getData = () => Template.instance().data;

const getDirection = () => Direction.load(getData());

Template.direction.helpers({
    "strOperation": () => {
        return OperationUtil.toStr(getDirection().operation)},
});
