import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {bookSearchByTitle} as mod from "./bookSearch";

Meteor.publish("bookSearch", function books(title){
	check(title, String);
	const results = bookSearchByTitle(title);

	results.forEach(result => {
		this.added("bookSearch", result.id, result);
	});

	this.ready();
});