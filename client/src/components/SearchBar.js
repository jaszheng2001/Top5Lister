import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export default function SearchBar() {
	const [text, setText] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(text);
	};

	const handleTextChange = (e) => {
		setText(e.target.value);
	};
	return (
		<Paper
			component="form"
			sx={{
				p: "1px 2px",
				display: "flex",
				alignItems: "center",
				width: 550,
				margin: "10px",
				height: "80%",
				boxSizing: "border-box",
			}}
			onSubmit={handleSubmit}
		>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="Search"
				inputProps={{ "aria-label": "search" }}
				onChange={handleTextChange}
			/>
			<IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
				<SearchIcon />
			</IconButton>
		</Paper>
	);
}
