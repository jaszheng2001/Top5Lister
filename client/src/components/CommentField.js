import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

export default function CommentField() {
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
				height: "25%",
				boxSizing: "border-box",
			}}
			onSubmit={handleSubmit}
		>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="Add Comment"
				inputProps={{ "aria-label": "Comment" }}
				onChange={handleTextChange}
			/>
			<IconButton type="submit" sx={{ p: "10px" }} aria-label="Comment">
				<SendIcon />
			</IconButton>
		</Paper>
	);
}
