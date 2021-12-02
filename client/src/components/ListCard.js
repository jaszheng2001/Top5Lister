import { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Top5List from "./Top5List";

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default function ListCard(props) {
	const { list, enableToolbar } = props;
	const [expanded, setExpanded] = React.useState(false);

	const cardContentStyle = {
		paddingBottom: 0,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	};
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card
			sx={{
				width: "100%",
				margin: "10px 0",
				padding: "0 10px",
				boxSizing: "border-box",
				borderRadius: "10px",
				bgcolor: "#d4d4f5",
			}}
		>
			<CardContent sx={cardContentStyle}>
				<Typography
					variant="h6"
					color="text.primary"
					sx={{ margin: "auto 0" }}
				>
					{list.name}
				</Typography>
				{!enableToolbar || (
					<div>
						<IconButton aria-label="edit" size="large">
							<EditIcon fontSize="inherit" />
						</IconButton>
						<IconButton
							aria-label="delete"
							size="large"
							sx={{ margin: 0 }}
						>
							<DeleteIcon fontSize="inherit" />
						</IconButton>
					</div>
				)}
			</CardContent>
			<CardContent sx={{ ...cardContentStyle, paddingTop: 0 }}>
				<Typography variant="p">By: {list.username}</Typography>
				<Typography variant="p">Published: January 2021</Typography>
			</CardContent>
			<CardActions disableSpacing sx={{ padding: "0 10px" }}>
				<div id="rate-btn-wrapper">
					<div
						id="like-btn-wrapper"
						style={{ display: "flex", alignItems: "center" }}
					>
						<IconButton color="primary">
							<ThumbUpIcon />
						</IconButton>
						<div>
							<Typography variant="p" color="text.secondary">
								{list.likes}
							</Typography>
						</div>
					</div>
					<div
						id="dislike-btn-wrapper"
						style={{ display: "flex", alignItems: "center" }}
					>
						<IconButton color="primary">
							<ThumbDownIcon />
						</IconButton>
						<Typography variant="p" color="text.secondary">
							{list.dislikes}
						</Typography>
					</div>
					<div style={{ display: "flex", alignItems: "center" }}>
						<VisibilityIcon sx={{ paddingRight: "8px" }} />
						<Typography variant="p" color="text.secondary">
							{list.views}
						</Typography>
					</div>
				</div>
				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<Top5List items={list.items} comments={list.comments} />
			</Collapse>
		</Card>
	);
}
