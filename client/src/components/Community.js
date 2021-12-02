import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";
import ListCard from "./ListCard.js";
import { Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";

export default function AllList() {
	const { store } = useContext(GlobalStoreContext);
	console.log("Home Screen was rendered");
	useEffect(() => {
		store.loadList();
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
			<div id="list-selector-heading">Community Status Bar</div>
			<div id="list-selector-list">{listCard}</div>
		</div>
	);
}
