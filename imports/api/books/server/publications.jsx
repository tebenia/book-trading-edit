import {Meteor} from "meteor/meteor";
import {Books} from "../books";
import {check} from "meteor/check";
import {bookSearchByTitle} from "./bookSearch";

Meteor.publish("books", function books(){
	return Books.find();
});

Meteor.publish("booksAvailable", function books(title){
	check(title, String);
	const query = {};

	if(this.userId){
		query.userId = {$ne: this.userId};
	}

	if (title) {
		query.title = {$regex:title, $options:"i"};
	}

	return Books.find(query);
});

Meteor.publish('booksOwned', function books(title) {
	check(title, String);

	if (!this.userId) {
		return this.ready();
	}

	const query = {};

	if(this.userId){
		query.userId = this.userId;
	}

	if (title) {
		query.title = {$regex:title, $options:"i"};
	}

	return Books.find(query);
});

Meteor.publish('booksAddSearch', function books(title) {
	check(title, String);
	if (title) {
		const results = bookSearchByTitle(title);

		results.forEach(result => {
			this.added('books', result._id, result);
		});
	}
	return this.ready();
});