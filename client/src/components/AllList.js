import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";
import ListCard from "./ListCard.js";
import List from "@mui/material/List";

export default function AllList() {
	const { store } = useContext(GlobalStoreContext);
	console.log("Home Screen was rendered");
	useEffect(() => {
		store.updateTab("all", "name");
	}, []);

	let listCard = "";
	if (store) {
		listCard = (
			<List
				sx={{
					width: "90%",
					left: "5%",
					overflowY: "auto",
					height: "90%",
				}}
			>
				{store.idNamePairs.map((list) => (
					<ListCard
						key={list._id}
						list={list}
						enableToolbar={false}
					/>
				))}
			</List>
		);
	}
	return (
		<div id="list-selector-container">
			<div id="list-selector-heading">All Status Bar</div>
			<div id="list-selector-list">{listCard}</div>
		</div>
	);
}
