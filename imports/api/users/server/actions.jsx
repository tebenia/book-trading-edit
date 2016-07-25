import {Accounts} from "meteor/accounts-base";
import {AddressTemplate} from "../addresses";

Accounts.onCreateUser((options, user) => {
	const fullname = user.profile.name;
	const tradePoints = 5;
	const shippingAddress = AddressTemplate;

	user.fullname = fullname;
	user.tradePoints = tradePoints;
	user.shippingAddress = shippingAddress;

	return user;
});