import React from "react";
import SearchForm from "./searchForm";
import BookList from "../containers/bookAddSearchList";

class BooksAddSearch extends React.Component {
	constructor(props) {
		super(props);
	
	this.state = {
		title:""
	};

	this.doSearch = this.doSearch.bind(this);
	}

	doSearch(title){
		this.setState({
			title 
		});
	}

	render(){
		return (
			<div>
				<SearchForm doSearch={this.doSearch}/>
				<BookList title={this.state.title} actions={["add"]}/>
			</div>
		);
	}
}

export default BooksAddSearch;