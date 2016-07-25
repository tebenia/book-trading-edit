import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Users} from "./users";
import {AddressSchema} from "./addresses";

const userProfileValidator = new SimpleSchema({
	fullname: {
		type: String
	},
	shippingAddress: {
		type : AddressSchema
	}
}).validator();

export const updateProfile = new ValidatedMethod({
	name:"users.profile.update",
	validate: userProfileValidator,
	run({fullname, shippingAddress}){
		if (!this.userId) {
			throw new Meteor.Error("users.profile.update.accessDenied",
				"Please Login first"
			);
		}
		Users.update(this.userId, {$set: {fullname, shippingAddress}});
	}
});