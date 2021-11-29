import React, { useContext, useEffect, useState } from "react";

import HomeNav from "./HomeNav";
import NavTab from "./NavTab";
import RegisterScreen from "./RegisterScreen";

import { MemoryRouter, Route, Switch } from "react-router-dom";
/*
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
	return (
		<MemoryRouter initialEntries={["/home"]} initialIndex={0}>
			<NavTab />
			<Switch>
				<Route exact path="/home" component={HomeNav} />
				<Route exact path="/me" component={RegisterScreen} />
				<Route exact path="/all" component={RegisterScreen} />
				<Route exact path="/community" component={RegisterScreen} />
			</Switch>
		</MemoryRouter>
	);
};

export default HomeScreen;
