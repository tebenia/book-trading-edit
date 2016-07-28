import React from "react";
import {Link} from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import {Drawer} from "material-ui";
import {MenuItem} from "material-ui";
import {RaisedButton} from "material-ui";
import AvLibraryAdd from "material-ui/svg-icons/av/library-add";
import AvLibraryBooks from "material-ui/svg-icons/av/library-books";

const lightMuiTheme = getMuiTheme(lightBaseTheme);

const styles  = {
	link: {
		textDecoration: "none"
	}
};

class Navigation extends React.Component {
	constructor(props) {
		super(props);

		this.handleToggle = this.handleToggle.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			open: false
		};
	}

	handleToggle(){
		this.setState({
			open:!this.state.open 
		});
	}

	handleClose(){
		this.setState({
			open:false 
		});
	}

	render(){
		return (
			<MuiThemeProvider muiTheme={lightMuiTheme}>
				<div>
					<Drawer
						docked={false}
						width={200}
						open={this.state.open}
						onRequestChange={open => this.setState({
							open 
						})}
					>
						<Link to="/mybooks" style={styles.link}>
							<MenuItem leftIcon={<AvLibraryBooks/>} onTouchTap={this.handleClose}>
								My Books
							</MenuItem>
						</Link>
						<Link to="/books" style={styles.link}>
							<MenuItem leftIcon={<AvLibraryAdd/>} onTouchTap={this.handleClose}>
								Available Books
							</MenuItem>
						</Link>
						<Link to="/books/add" style={styles.link}>
							<MenuItem leftIcon={<AvLibraryAdd/>} onTouchTap={this.handleClose}>
								Add Books
							</MenuItem>
						</Link>
						<Link to="/addbooks" style={styles.link}>
							<MenuItem leftIcon={<AvLibraryAdd/>} onTouchTap={this.handleClose}>
								Add Books from Google
							</MenuItem>
						</Link>
						<Link to="/tradedbooks" style={styles.link}>
							<MenuItem leftIcon={<AvLibraryAdd/>} onTouchTap={this.handleClose}>
								Traded Books
							</MenuItem>
						</Link>
						<Link to="/trades" style={styles.link}>
							<MenuItem leftIcon={<AvLibraryAdd/>} onTouchTap={this.handleClose}>
								My Trades
							</MenuItem>
						</Link>
						<Link to="/myprofile" style={styles.link}>
							<MenuItem leftIcon={<AvLibraryAdd/>} onTouchTap={this.handleClose}>
								My Profile
							</MenuItem>
						</Link>
					</Drawer>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default Navigation;