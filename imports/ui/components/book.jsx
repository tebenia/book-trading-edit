import React from "react";
import {Link} from "react-router";
import {remove} from "/imports/api/books/methods";

class Book extends React.Component {
	constructor(props){
		super(props);

		this.handleDeleteClick = this.handleDeleteClick.bind(this);
	}

	handleDeleteClick(){
		remove.call({bookId:this.props.book._id});
	}

	render(){
		return (
			<div>
				<h1>{this.props.book.title}</h1>
				<button onClick={ this.handleDeleteClick }>Delete</button>
				<Link to={`/books/${this.props.book._id}`}>Edit</Link>
			</div>
		)
	}
}

Book.propTypes = {
	book: React.PropTypes.object
};

export default Book;