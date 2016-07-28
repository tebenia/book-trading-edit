import React from "react";
import {Paper} from "material-ui";
import {Card, CardActions, CardTitle, CardText} from "material-ui/Card";
import {FlatButton} from "material-ui";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";

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
		this.handleTradeClick = this.handleTradeClick.bind(this);
	}

	handleAddClick(){
		this.props.book.addBookToCollection();
		this.context.router.push("/mybooks");
	}

	handleEditClick(){
		this.context.router.push(`/books/${this.props.book._id}`);
	}

	handleDeleteClick(){
		this.props.book.remove();
	}

	handleTradeClick(){
		this.props.book.requestTrade();
		this.context.router.push("/mytrades");
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
			if(actions.includes("trade")){
				actionButtons.push(<FlatButton key="action_trade" label="Request Trade" onClick={this.handleTradeClick}/>);
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
							<CardText /*expandable={true}*/>
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
	book: React.PropTypes.object.isRequired,
	actions: React.PropTypes.array
};

Book.defaultProps = {
	actions: []
};

Book.contextTypes = {
   router: React.PropTypes.object.isRequired
};

export default Book;