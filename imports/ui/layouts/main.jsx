import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import {AppBar} from "material-ui";
import AccountsUIWrapper from "../components/accountsUIWrapper";
import Navigation from "../components/navigation";

const lightMuiTheme = getMuiTheme(lightBaseTheme);

const MainLayout = ({children}) => (
	<MuiThemeProvider muiTheme={lightMuiTheme}>
		<div>
			<AppBar 
				title="App"
				iconElementRight={<AccountsUIWrapper/>}
				zDepth={4}
			/>
			<Navigation/>
			{children}
		</div>
	</MuiThemeProvider>
);

MainLayout.PropTypes = {
	children: React.PropTypes.object
}

export default MainLayout;
