import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Paper} from "material-ui";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import {TextField} from "material-ui";
import {FloatingActionButton} from "material-ui";
import ActionSearch from "material-ui/svg-icons/action/search";

const lightMuiTheme = getMuiTheme(lightBaseTheme);

const styles = {
	button: {
		marginLeft: 20
	},
	paper: {
		width: 350,
		margin: 10,
		padding: 10
	}
};

class SearchForm extends React.Component {
	constructor(props){
		super(props);

		this.handleSearchKeyDown = this.handleSearchKeyDown.bind(this);
		this.handleSearchClick = this.handleSearchClick.bind(this);
	}

	handleSearchClick(){
		const titleInput = this.refs.searchTitle.getValue();
		this.props.doSearch(titleInput);
	}

	handleSearchKeyDown(event){
		if(event.keyCode === 13){
			this.handleSearchClick();
		}
	}

	render(){
		return (
			<MuiThemeProvider muiTheme={lightMuiTheme}>
				<div>
					<Paper style={styles.paper} zDepth={4}>
						<TextField 
							name="searchTitleInput"
							ref="searchTitle"
							onKeyDown={this.handleSearchKeyDown}
							hintText="Type books you are looking for..."
						/>
						<FloatingActionButton
							mini={true}
							style={
								styles.button
							}
							onClick={this.handleSearchClick}
						>
							<ActionSearch/>
						</FloatingActionButton>
					</Paper>
				</div>
			</MuiThemeProvider>
		);
	}
}

SearchForm.propTypes = {
	doSearch: React.PropTypes.func
};

export default SearchForm;