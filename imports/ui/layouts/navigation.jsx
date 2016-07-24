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
	navBar : {
		top: 64
	},
	link: {
		textDecoration: "none"
	}
}

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
						containerStyle={styles.navBar}
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
								Add Search
							</MenuItem>
						</Link>
					</Drawer>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default Navigation;