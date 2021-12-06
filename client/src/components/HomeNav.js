import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";
import ListCard from "./ListCard.js";
import { Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import DeleteModal from "./DeleteModal";
import WorkSpace from "./WorkspaceScreen";

export default function HomeNav() {
	const { store } = useContext(GlobalStoreContext);
	console.log("Home Screen was rendered");
	useEffect(() => {
		store.loadListUsers();
	}, []);

	function handleCreateNewList() {
		store.createNewList();
	}
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
					<ListCard key={list._id} list={list} enableToolbar={true} />
				))}
			</List>
		);
	}
	return (
		<div id="list-selector-container">
			<div id="list-selector-list">
				{!store.currentList && listCard}
				{store.currentList && <WorkSpace />}
			</div>
			<div id="list-selector-heading">
				<Fab
					color="primary"
					aria-label="add"
					id="add-list-button"
					onClick={handleCreateNewList}
					disabled={store.currentList ? true : false}
				>
					<AddIcon />
				</Fab>
				<Typography variant="h2">Your Lists</Typography>
			</div>
			<DeleteModal />
		</div>
	);
}
