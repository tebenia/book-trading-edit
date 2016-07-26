import React from "react";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import Index from "/imports/ui/components/index";
import MainLayout from "/imports/ui/layouts/main";
import BookForm from "/imports/ui/components/bookForm";
import BookEdit from "/imports/ui/containers/bookEdit";
import BooksAvailable from "/imports/ui/components/booksAvailable";
import BooksTraded from "/imports/ui/components/booksTraded";
import BooksOwned from "/imports/ui/components/booksOwned";
import BooksAddSearch from "/imports/ui/components/booksAddSearch";
import UserProfile from "/imports/ui/containers/userProfile";

export const Routes = () =>(
	<Router history={browserHistory}>
		<Route path="/" component={MainLayout}>
			<IndexRoute component={Index}/>
			<Route path="/books" component={BooksAvailable}/>
			<Route path="/mybooks" component={BooksOwned}/>
			<Route path="/books/add" component={BookForm}/>
			<Route path="/books/:id" component={BookEdit}/>
			<Route path="/addbooks" component={BooksAddSearch}/>
			<Route path="/tradedbooks" component={BooksTraded}/>
			<Route path="/myProfile" component={UserProfile}/>
		</Route>
	</Router>
);