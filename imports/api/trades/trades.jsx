import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {cancel, ship, receive, accept, reject} from "./methods";

export const Trades = new Mongo.Collection("trades");

Trades.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Trades.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Trades.schema = new SimpleSchema({
	bookId: {
		type: SimpleSchema.RegEx.Id,
		label: "ID of book to be traded"
	},
	bookOwnerUserId: {
		type: String,
		label: "UserId of the owner of the book",
	},
	userId: {
		type: String,
		label: "ID of user initiating trade",
		regEx: SimpleSchema.RegEx.Id,
		autoValue(){
			return this.userId;
		}
	},
	accepted: {
		type: Boolean,
		label: "Has the trade been accepted",
		defaultValue: false
	},
	shipped: {
		type: Boolean,
		label: "Has the trade been shipped",
		defaultValue: false
	},
	received: {
		type: Boolean,
		label: "Has the trade been received",
		defaultValue: false
	},
	createdAt: {
		type: Date,
		label: 'The date this trade was created',
		denyUpdate: true,
		autoValue(){
			if(this.isInsert){
				return new Date();
			} else if (this.isUpsert){
				return {
					$setOnInsert: new Date()
				};
			}
			this.unset();
		}
	}
});

Trades.helpers({
	isTradeCreator(){
		return this.userId === Meteor.userId();
	},
	book(){
		return Books.findOne(this.bookId);
	},
	isbookOwner(){
		return this.bookOwnerUserId == Meteor.userId();
	},
	cancel(){
		cancel.call({tradeId: this._id});
	},
	canCancel(){
		if(this.accepted || this.rejected || this.isbookOwner()){
			return false;
		}
		return true;
	},
	accept(){
		accept.call({tradeId: this._id});
	},
	canAccept(){
		if(this.accepted || this.rejected || this.isbookOwner()){
			return false;
		}
		return true;
	},
	reject(){
		reject.call({tradeId: this._id});
	},
	canReject(){
		if(this.accepted || this.shipped || this.isbookOwner()){
			return false;
		}
		return true;
	},
	ship(){
		ship.call({tradeId: this._id});
	},
	canShip(){
		if(this.accepted || this.isbookOwner()){
			return false;
		}
		return true;
	},
	receive(){
		receive.call({tradeId: this._id});
	},
	canReceive(){
		if(this.shipped || this.isTradeCreator()){
			return false;
		}
		return true;
	}
});

Trades.attachSchema(Trades.schema);