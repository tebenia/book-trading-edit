import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {insert} from "./methods";

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
	author: {
		type: String,
		label: "Author"
	},
	thumbnail: {
		type: String,
		label: "Thumbnail URL"
	},
	publisher: {
		type: String,
		label: "Book Publisher",
		optional: true
	},
	description: {
		type: String,
		label: "Book Description",
		optional: true
	},
	pageCount: {
		type: Number,
		label: "Page Number",
		optional: true
	},
	userId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		autoValue(){
			return this.userId;
		}
	},
	traded: {
		type: Boolean,
		label: "Has this book been traded?",
		defaultValue: false
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
	},
	addBookToCollection(){
		insert.call({
			title: this.title,
			author: this.author,
			thumbnail: this.thumbnail,
			description: this.description,
			pageCount: this.pageCount,
			publisher: this.publisher
		});
	}
});

Books.attachSchema(Books.schema);