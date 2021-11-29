import { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";
import Button from "@mui/material/Button";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import CloseIcon from "@mui/icons-material/HighlightOff";

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
	const { store } = useContext(GlobalStoreContext);
	const [hasUndo, setHasUndo] = useState(store.tps.hasTransactionToUndo());
	const [hasRedo, setHasRedo] = useState(store.tps.hasTransactionToRedo());

	useEffect(() => {
		setHasRedo(store.tps.hasTransactionToRedo());
		setHasUndo(store.tps.hasTransactionToUndo());
	}, [store.tps, store.tps.mostRecentTransaction]);

	function handleUndo() {
		store.undo();
	}
	function handleRedo() {
		store.redo();
	}
	function handleClose() {
		store.closeCurrentList();
	}
	let editStatus = false;
	if (store.isListNameEditActive) {
		editStatus = true;
	}
	return (
		<div id="edit-toolbar">
			<Button
				id="undo-button"
				onClick={handleUndo}
				variant="contained"
				disabled={!hasUndo}
			>
				<UndoIcon />
			</Button>
			<Button
				id="redo-button"
				onClick={handleRedo}
				variant="contained"
				disabled={!hasRedo}
			>
				<RedoIcon />
			</Button>
			<Button
				disabled={editStatus}
				id="close-button"
				onClick={handleClose}
				variant="contained"
			>
				<CloseIcon />
			</Button>
		</div>
	);
}

export default EditToolbar;
