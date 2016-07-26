import React from "react";
import {Link} from "react-router";
import {Paper} from "material-ui";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import {FlatButton} from "material-ui";
import {Divider} from "material-ui";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import {remove} from "/imports/api/books/methods";

const lightMuiTheme = getMuiTheme(lightBaseTheme);

const styles = {
	paper: {
		width: 350,
		margin: 10,
		display: "inline-block"
	},
	actions : {
		textAlign: "center"
	},
	thumbnailContainer: {
		textAlign: "center"
	},
	thumbnail: {
		height: 200,
		width: "auto"
	}
};

class Book extends React.Component {
	constructor(props){
		super(props);

		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleAddClick = this.handleAddClick.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
	}

	handleAddClick(){
		this.props.book.addBookToCollection();
		this.context.router.push("/mybooks");
	}

	handleEditClick(){
		this.context.router.push(`/books/${this.props.book._id}`);
	}

	handleDeleteClick(){
		remove.call({bookId:this.props.book._id});
	}

	renderActions(){
		const book = this.props.book;
		const actions = this.props.actions;
		const actionButtons = [];

		if(book.editableByCurrentUser()){
			if(actions.includes("edit")){
				actionButtons.push(<FlatButton key="action_edit" label="Edit" onClick={this.handleEditClick}/>);
			}
			if(actions.includes("delete")){
				actionButtons.push(<FlatButton key="action_delete" label="Delete" onClick={this.handleDeleteClick}/>);
			}
			if(actions.includes("add")){
				actionButtons.push(<FlatButton key="action_add" label="Add" onClick={this.handleAddClick}/>);
			}
			if(actionButtons.length > 0){
				return (
					<MuiThemeProvider muiTheme={lightMuiTheme}>
						<div>
							<CardActions style={styles.actions}>
								{actionButtons}
							</CardActions>
						</div>
					</MuiThemeProvider>
				);
			}
		}	
	}

	render(){
		return (
			<MuiThemeProvider muiTheme={lightMuiTheme}>
				<div>
					<Paper style={styles.paper} zDepth={4}>
						<Card>
							<CardTitle 
								title={this.props.book.title} 
								subtitle={this.props.book.author}
								//showExpandableButton={true}
							/>
							<CardText style={styles.thumbnailContainer}>
								<img src={this.props.book.thumbnail} alt={this.props.book.title} style={styles.thumbnail}/>
							</CardText>
							<CardText expandable={true}>
								<p>{this.props.book.description}</p>
								<br/>
								<p><b>Publisher:</b>{this.props.book.publisher}</p>
								<p><b>Pages:</b>{this.props.book.pageCount}</p>
							</CardText>
							{this.renderActions()}
						</Card>
					</Paper>
				</div>
			</MuiThemeProvider>
		)
	}
}

Book.propTypes = {
	book: React.PropTypes.object.isRequired
};

Book.contextTypes = {
   router: React.PropTypes.object.isRequired
};

export default Book;