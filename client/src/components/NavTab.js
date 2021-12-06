import * as React from "react";
import Box from "@mui/material/Box";
import { Tab, Tabs } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import FunctionsIcon from "@mui/icons-material/Functions";

import { Link, useRouteMatch } from "react-router-dom";
import SearchBar from "./SearchBar";
import SortByMenu from "./SortByMenu";
import { GlobalStoreContext } from "../store";
import { useContext } from "react";
function MyTabs() {
	// You need to provide the routes in descendant order.
	// This means that if you have nested routes like:
	// users, users/new, users/edit.
	// Then the order should be ['users/add', 'users/edit', 'users'].
	const routeMatch = useRouteMatch(["/home", "/all", "/user", "/community"]);
	const currentTab = routeMatch?.path;
	return (
		<Tabs value={currentTab}>
			<Tab
				icon={<HomeIcon />}
				label="Home"
				value="/home"
				to="/home"
				component={Link}
				sx={{ fontSize: "10px" }}
			/>
			<Tab
				icon={<PeopleIcon />}
				label="All List"
				value="/all"
				to="/all"
				component={Link}
				sx={{ fontSize: "10px" }}
			/>
			<Tab
				icon={<PersonIcon />}
				label="User List"
				value="/user"
				to="/user"
				component={Link}
				sx={{ fontSize: "10px" }}
			/>
			<Tab
				icon={<FunctionsIcon />}
				label="Community"
				value="/community"
				to="/community"
				component={Link}
				sx={{ fontSize: "10px" }}
			/>
		</Tabs>
	);
}

export default function TabNav() {
	const { store } = useContext(GlobalStoreContext);
	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				position: "relative",
			}}
		>
			{!store.currentList || (
				<Box
					sx={{
						width: "100%",
						height: "100%",
						zIndex: 100,
						bgcolor: "rgba(216,216,216,.5)",
						position: "absolute",
					}}
				></Box>
			)}
			<MyTabs />
			<SearchBar />
			<SortByMenu />
		</Box>
	);
}
