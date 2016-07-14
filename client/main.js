import React from "react";
import { mount } from "react-mounter";
import injectTapEventPlugin from "react-tap-event-plugin";
import {Routes} from "../imports/startup/client/index";

injectTapEventPlugin();

Meteor.startup(() => {
	mount(Routes);
});