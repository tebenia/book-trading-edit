import React from "react";
import TradeList from "./tradeList";

class TradePage extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<div>
				<TradeList actions={this.props.actions}/>
			</div>
		);
	}
}

TradePage.propsTypes = {
	actions: React.PropTypes.array
};

TradePage.defaultProps = {
	actions: []
};

export default TradePage;