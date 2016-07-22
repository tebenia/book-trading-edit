import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const Books = new Mongo.Collection("books");

Books.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Books.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Books.schema = new SimpleSchema({
	title: {
		type: String,
		label: "Title"
	},
	userId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	createdAt: {
		type: Date,
		label: 'The date this book was created',
		denyUpdate: true,
		autoValue(){
			if(this.isInsert){
				return new Date();
			} else if (this.isUpsert){
				return {
					$setOnInsert: new Date()
				};
			}
			this.unset();
		}
	}
});

Books.helpers({
	editableByCurrentUser(userId){
		return this.userId === Meteor.userId();
	}
});

Books.attachSchema(Books.schema);