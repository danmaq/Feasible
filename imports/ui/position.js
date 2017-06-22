'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './position.html';

Template.body.helpers({

});

Template.body.events({
    'click .delete' () {
        Meteor.call('positions.remove', this._id);
    },
});