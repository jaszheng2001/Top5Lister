import { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { GlobalStoreContext } from "../store";

const style = {
	position: "absolute",
	padding: "30px",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function DeleteModal() {
	const { store } = useContext(GlobalStoreContext);

	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(store.listMarkedForDeletion !== null);
	}, [store.listMarkedForDeletion]);

	return (
		<div>
			<Modal
				open={open}
				onClose={() => {}}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h4"
						component="h2"
						align="center"
						padding="15px"
					>
						{`Delete ${
							store.listMarkedForDeletion &&
							store.listMarkedForDeletion.name
						} List?`}
					</Typography>
					<Typography align="center">
						<Button onClick={store.deleteMarkedList}>
							Confirm
						</Button>
						<Button onClick={store.unmarkListForDeletion}>
							Cancel
						</Button>
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}
