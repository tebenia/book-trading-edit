import React from "react";
import {Paper} from "material-ui";
import {TextField} from "material-ui";

import {updateProfile} from "/imports/api/users/methods";

const styles = {
	paper: {
		width: 500,
		margin: 10,
		padding: 10
	}
};

class UserProfile extends React.Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();
	}

	render(){
		return(
			<h1>User Profile</h1>
		);
	}
}

export default UserProfile;