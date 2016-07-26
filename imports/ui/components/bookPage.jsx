import React from "react";
import SearchForm from "./searchForm";
import BookList from "../containers/bookList";

class BookPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: ""
		}

		this.doSearch = this.doSearch.bind(this);
	}

	doSearch(title){
		this.setState({
			title 
		});
	}

	render(){
		return(
			<div>
				<SearchForm doSearch={this.doSearch}/>
				<BookList 
					publication={this.props.publication}
					title={this.state.title}
					actions={this.props.actions}
				/>
			</div>
		);
	}
}

BookPage.propTypes = {
	publication: React.PropTypes.string.isRequired,
	actions: React.PropTypes.array
};

BookPage.defaultProps = {
	actions: []
};

export default BookPage;