import React from "react";
import ReactDOM from "react-dom";
import {Paper} from "material-ui";
import {TextField} from "material-ui";
import {Divider} from "material-ui";
import {insert, update} from "/imports/api/books/methods";

const styles = {
	paper: {
		width: 500,
		margin: 10,
		padding: 10
	}
};

class BookForm extends React.Component {
	constructor(props){
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();

		const bookId = this.props.book._id;
		//const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();
		const title = this.refs.titleInput.getValue().trim();
		const author = this.refs.authorInput.getValue().trim();
		const description = this.refs.descriptionInput.getValue().trim();
		const thumbnail = this.refs.thumbnailInput.getValue().trim();
		const publisher = this.refs.publisherInput.getValue().trim();
		const pageCount = parseInt(this.refs.pageCountInput.getValue().trim());

		const bookFields = {
			title,
			author,
			thumbnail,
			description,
			publisher,
			pageCount
		};

		if(bookId){
			bookFields.bookId = bookId
			update.call(bookFields);
		} else {
			insert.call(bookFields);
		}
		this.context.router.goBack();
	}

	render(){
		return (
			<Paper style={styles.paper} zDepth={4}>
				<form onSubmit={this.handleSubmit}>
					<label>Title:</label>
					<TextField 
						ref="titleInput"
						hintText="Book Title"
						defaultValue={this.props.book.title}
					/>
					<Divider />
					<label>Author:</label>
					<TextField 
						ref="authorInput"
						hintText="Book Author"
						defaultValue={this.props.book.author}
					/>
					<Divider />
					<label>Thumbnail:</label>
					<TextField 
						ref="thumbnailInput"
						hintText="Book Thumbnail"
						defaultValue={this.props.book.thumbnail}
					/>
					<Divider />
					<label>Description:</label>
					<TextField 
						ref="descriptionInput"
						hintText="Book Description"
						defaultValue={this.props.book.description}
						multiLine={true}
					/>
					<Divider />
					<label>Publisher:</label>
					<TextField 
						ref="publisherInput"
						hintText="Book Publisher"
						defaultValue={this.props.book.publisher}
					/>
					<Divider />
					<label>Page Count:</label>
					<TextField 
						ref="pageCountInput"
						hintText="Book Page Count"
						defaultValue={this.props.book.count}
					/>
					<Divider />
					<input type="submit"/>
				</form>
			</Paper>
		)
	}
}

BookForm.propTypes = {
	book: React.PropTypes.object
};

BookForm.defaultProps = {
	book : {
		title: ""
	}
};

BookForm.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default BookForm;