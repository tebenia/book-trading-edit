import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Books} from "./books";

export const insert = new ValidatedMethod({
	name: "books.insert",
	validate: new SimpleSchema({
		title: {
			type: String
		}
	}).validator(),
	run({title}) {
		if(!this.userId){
			throw new Meteor.Error("books.insert.accessDenied",
				"Please Login first"
			);
		}
		const book = {
			title,
			userId: this.userId
		};
		Books.insert(book);
	}
});

export const update = new ValidatedMethod({
	name: "books.update",
	validate: new SimpleSchema({
		bookId: {
			type: String
		},
		title: {
			type: String
		}
	}).validator(),
	run({bookId, title}){
		const book = Books.findOne(bookId);

		if(!book){
			throw new Meteor.Error("books.update.accessDenied",
				"Error 404"
			);
		}

		if(!book.editableBy(this.userId)){
			throw new Meteor.Error("books.update.accessDenied",
				"You can't edit this"
			);
		}
		Books.update(book, {$set:{title}});
	}
});

export const remove = new ValidatedMethod({
	name: "books.remove",
	validate: new SimpleSchema({
		bookId: {
			type: String
		}
	}).validator(),
	run({bookId}) {
		const book = Books.findOne(bookId);

		if(!book){
			throw new Meteor.Error("books.remove.accessDenied",
				"Error 404"
			);
		}

		if(!book.editableBy(this.userId)){
			throw new Meteor.Error("books.remove.accessDenied",
				"You can't remove this"
			);
		}
		Books.remove(bookId);
	}
});