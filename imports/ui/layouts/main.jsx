import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import {AppBar} from "material-ui";
import AccountsUIWrapper from "../components/accountsUIWrapper";
import Navigation from "../components/navigation";

const lightMuiTheme = getMuiTheme(lightBaseTheme);

class MainLayout extends React.Component {
	constructor(props) {
		super(props);

		this.handleMenuClick = this.handleMenuClick.bind(this);
	}

	handleMenuClick(){
		this.refs.navBar.handleToggle();
	}

	render(){
		return(
			<MuiThemeProvider muiTheme={lightMuiTheme}>
				<div>
					<AppBar
						title="Book Trading App"
						iconElementRight={<AccountsUIWrapper/>}
						onLeftIconButtonTouchTap={this.handleMenuClick}
					/>
					<Navigation ref="navBar"/>
					{this.props.children}
				</div>
			</MuiThemeProvider>
		);
	}
}

MainLayout.propTypes = {
	children: React.PropTypes.object
}

export default MainLayout;
