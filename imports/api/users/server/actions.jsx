import {Accounts} from "meteor/accounts-base";
import {AddressTemplate} from "../addresses";

Accounts.onCreateUser((options, user) => {
	const fullName = options.profile.name;
	const tradePoints = 5;
	const shippingAddress = AddressTemplate;

	user.fullName = fullName;
	user.tradePoints = tradePoints;
	user.shippingAddress = shippingAddress;

	return user;
});