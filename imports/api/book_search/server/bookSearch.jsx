import {Meteor} from "meteor/meteor";

const google = require("googleapis");
const books = google.books("v1");

function googleBookSearchByTitle(title, callback){
	books.volume.list({
		auth: Meteor.settings.google.api_key;
		q: title
	}, callback);
}

const wrappedGoogleBookSearchByTitle = Meteor.wrapAsync(googleBookSearchByTitle);

const BookSearchByTitle(titleSearch){
	const results = wrappedGoogleBookSearchByTitle(titleSearch);

	let resultsList = [];

	if(results){
		resultsList = results.map(item => {
       const id = item.id;
       const volume = item.volumeInfo;
       const title = volume.title;
       const author = volume.authors[0];
       const publisher = volume.publisher;
       const publishedDate = volume.publishedDate;
       const pageCount = volume.pageCount;
 
       let thumbnail = '';
 
       if (volume.imageLinks && volume.imageLinks.thumbnail) {
         thumbnail = volume.imageLinks.thumbnail;
       }

       return {
        id,
        title,
        author,
        pageCount,
        publisher,
        publishedDate,
        thumbnail
      };
	});
	return resultsList;
}