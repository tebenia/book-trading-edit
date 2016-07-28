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

class Trades extends React.Component {
	constructor(props) {
		super(props);

		this.handleAcceptClick = this.handleAcceptClick.bind(this);
		this.handleRejectClick = this.handleRejectClick.bind(this);
		this.handleShipClick = this.handleShipClick.bind(this);
		this.handleCancelClick = this.handleCancelClick.bind(this);
		this.handleReceiveClick = this.handleReceiveClick.bind(this);
	}

	handleAcceptClick(){
		this.props.trade.accept();
	}
	handleRejectClick(){
		this.props.trade.reject();
	}

	handleShipClick(){
		this.props.trade.ship();
	}

	handleCancelClick(){
		this.props.trade.cancel();
	}

	handleReceiveClick(){
		this.props.trade.receive();
	}

	renderActions(){
		const trade = this.props.trade;
		const actions = this.props.actions;
		const actionButtons = [];

		if (trade.isBookOwner()) {
			if (actions.includes("accept") && trade.canAccept()) {
				actionButtons.push(<FlatButton key="action_accept" label="Accept Trade" onClick={this.handleAcceptClick}/>);
			}

			if (actions.includes("reject") && trade.canReject()) {
				actionButtons.push(<FlatButton key="action_reject" label="Reject Trade" onClick={this.handleRejectClick}/>);
			}

			if (actions.includes("ship") && trade.canShip()) {
				actionButtons.push(<FlatButton key="action_ship" label="Ship Trade" onClick={this.handleShipClick}/>);
			}
		}

		if (trade.isTradeCreator()) {
			if (actions.includes("cancel") && trade.canCancel()) {
				actionButtons.push(<FlatButton key="action_cancel" label="Cancel Trade" onClick={this.handleCancelClick}/>);
			}

			if (actions.includes("receive") && trade.canReceive()) {
				actionButtons.push(<FlatButton key="action_receive" label="Receive Trade" onClick={this.handleReceiveClick}/>);
			}
		}

		if (actionButtons.length > 0) {
			return (
				<CardActions style={styles.actions}>
					{actionButtons}
				</CardActions>
			);
		}		
	}

	render(){
		return(
			<MuiThemeProvider muiTheme={lightMuiTheme}>
				<div>	
					<Paper style={styles.paper} zDepth={4}>
						<Card>
							<CardTitle 
								title={this.props.book.title}
								subtitle={this.props.book.author}
								showExpandableButton={true}
							/>
							<CardText style={styles.thumbnailContainer}>
								<img src={this.props.book.thumbnail} style={styles.thumbnail} alt={this.props.book.title}/>
							</CardText>
							<CardText expandable={true}>
								<p>{this.props.book.description}</p>
								<br/>
								<p>
									<b>Publisher: </b> {this.props.book.publisher}
								</p>
								<p>
									<b>Page Count: </b> {this.props.book.pageCount}
								</p>
							</CardText>
							{this.renderActions()}
						</Card>
					</Paper>
				</div>
			</MuiThemeProvider>
		);
	}
}

Trades.propTypes = {
	book: React.PropTypes.object.isRequired,
	trade: React.PropTypes.object.isRequired,
	actions: React.PropTypes.array
};

Trades.defaultProps = {
	actions: []
};

Trades.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

export default Trades;