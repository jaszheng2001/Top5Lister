import { React, useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
	const { store } = useContext(GlobalStoreContext);
	const [text, setText] = useState(props.text);
	let { index, edit } = props;

	function handleUpdateText(event) {
		setText(event.target.value);
		edit(index, event.target.value);
	}

	return (
		<InputBase
			fullWidth
			id={"item-" + (index + 1)}
			name="item"
			autoComplete="Top 5 List Item"
			className="top5-item"
			value={text}
			onChange={handleUpdateText}
			sx={{ marginTop: 0, marginBottom: 0 }}
			inputProps={{ style: { fontSize: 30, fontWeight: 400 } }}
		/>
	);
}

export default Top5Item;
