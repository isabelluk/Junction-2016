import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Cards = new Mongo.Collection('cards');

Meteor.methods({
  'body.remove'(_id) {
    //stack of cards which has to be deleted.
    Cards.remove(_id);
  },
});
