import FilterListIcon from "@mui/icons-material/FilterList";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useContext } from "react";
import { GlobalStoreContext } from "../store/index.js";
const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "right",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "right",
		}}
		{...props}
	/>
))(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color:
			theme.palette.mode === "light"
				? "rgb(55, 65, 81)"
				: theme.palette.grey[300],
		boxShadow:
			"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
		"& .MuiMenu-list": {
			padding: "4px 0",
		},
		"& .MuiMenuItem-root": {
			"& .MuiSvgIcon-root": {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			"&:active": {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		},
	},
}));

export default function CustomizedMenus() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const { store } = useContext(GlobalStoreContext);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const pubDes = () => {
		store.sortList("publishDec");
		handleClose();
	};
	const pubAsc = () => {
		store.sortList("publishAsc");
		handleClose();
	};

	const views = () => {
		store.sortList("views");
		handleClose();
	};

	const likes = () => {
		store.sortList("likes");
		handleClose();
	};

	const dislikes = () => {
		store.sortList("dislikes");
		handleClose();
	};

	return (
		<div style={{ position: "absolute", right: "20px" }}>
			<Button
				id="demo-customized-button"
				aria-controls="demo-customized-menu"
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				variant="contained"
				disableElevation
				onClick={handleClick}
				endIcon={<KeyboardArrowDownIcon />}
			>
				SORT BY
				<FilterListIcon />
			</Button>
			<StyledMenu
				id="demo-customized-menu"
				MenuListProps={{
					"aria-labelledby": "demo-customized-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={pubDes} disableRipple>
					Publish By (Newest)
				</MenuItem>
				<MenuItem onClick={pubAsc} disableRipple>
					Publish By (Oldest)
				</MenuItem>
				<MenuItem onClick={views} disableRipple>
					Views
				</MenuItem>
				<MenuItem onClick={likes} disableRipple>
					Likes
				</MenuItem>
				<MenuItem onClick={dislikes} disableRipple>
					Dislikes
				</MenuItem>
			</StyledMenu>
		</div>
	);
}
