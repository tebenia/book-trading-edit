import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import {TextField} from "material-ui";
import {FloatingActionButton} from "material-ui";
import ActionSearch from "material-ui/svg-icons/action/search";
import SearchList from "../containers/searchList";

const lightMuiTheme = getMuiTheme(lightBaseTheme);

const styles = {
	button: {
		marginLeft: 20
	}
};

class SearchForm extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			titleInput: null,
			doSearch: false
		};

		this.handleSearchTitleChange = this.handleSearchTitleChange.bind(this);
		this.handleSearchClick = this.handleSearchClick.bind(this);
	}

	handleSearchTitleChange(event){
		let titleInput = event.target.value;
		const doSearch = false;

		if(!titleInput){
			titleInput = null
		}

		this.setState({
			titleInput,
			doSearch 
		});
	}

	handleSearchClick(){
		this.setState({
			doSearch: true 
		});
	}

	renderSearchList(){
		if(this.state.doSearch){
			return <SearchList title={this.state.titleInput}/>;
		}
	}

	render(){
		return (
			<MuiThemeProvider muiTheme={lightMuiTheme}>
				<div>
					<TextField 
						name="searchTitleInput"
						ref="searchTitle"
						value={this.state.titleInput}
						onChange={this.handleSearchTitleChange}
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
					{this.renderSearchList()}
				</div>
			</MuiThemeProvider>
		);
	}
}

export default SearchForm;