import React, { useContext, useEffect, useState } from "react";

import HomeNav from "./HomeNav";
import NavTab from "./NavTab";
import UserList from "./UserList";

import { MemoryRouter, Route, Switch } from "react-router-dom";
import AllList from "./AllList";
import Community from "./Community";
import ErrorModal from "./ErrorModal";
/*
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
	return (
		<MemoryRouter initialEntries={["/home"]} initialIndex={0}>
			<NavTab />
			<Switch>
				<Route exact path="/home" component={HomeNav} />
				<Route exact path="/all" component={AllList} />
				<Route exact path="/user" component={UserList} />
				<Route exact path="/community" component={Community} />
			</Switch>
			<ErrorModal />
		</MemoryRouter>
	);
};

export default HomeScreen;
