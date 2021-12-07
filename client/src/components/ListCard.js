import { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import AuthContext from "../auth";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownTwoToneIcon from "@mui/icons-material/ThumbDownTwoTone";
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

	const { store } = useContext(GlobalStoreContext);
	const { auth } = useContext(AuthContext);

	const like = list.likes.includes(auth.user.username);
	const dislike = list.dislikes.includes(auth.user.username);

	const cardContentStyle = {
		paddingBottom: 0,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	};
	const handleExpandClick = () => {
		setExpanded(!expanded);
		if (!expanded) {
			store.increaseView(list._id);
		}
	};

	const handleEdit = () => {
		store.setItemEditActive(list);
	};

	const handleDelete = () => {
		store.markListForDeletion(list);
	};

	const handleLikeClicked = () => {
		if (like) {
			store.updateRating(list._id, "unlike");
		} else {
			store.updateRating(list._id, "like");
		}
	};

	const handleDislikeClicked = () => {
		if (dislike) {
			store.updateRating(list._id, "undislike");
		} else {
			store.updateRating(list._id, "dislike");
		}
	};
	return (
		<Card
			sx={{
				width: "100%",
				margin: "10px 0",
				padding: "0 15px 15px 15px",
				boxSizing: "border-box",
				borderRadius: "10px",
				bgcolor: list.published ? "linen" : "#d4d4f5",
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
						<IconButton
							aria-label="edit"
							size="large"
							onClick={handleEdit}
							disabled={list.published}
						>
							<EditIcon fontSize="inherit" />
						</IconButton>
						<IconButton
							aria-label="delete"
							size="large"
							sx={{ margin: 0 }}
							onClick={handleDelete}
						>
							<DeleteIcon fontSize="inherit" />
						</IconButton>
					</div>
				)}
			</CardContent>
			<CardContent sx={{ ...cardContentStyle, paddingTop: 0 }}>
				<Typography variant="p">
					{list.username ? "By: " + list.username : ""}
				</Typography>
				<Typography variant="p">
					{list.published || store.tab === "community"
						? "Published: " +
						  new Date(list.updatedAt).toDateString()
						: ""}
				</Typography>
			</CardContent>
			<CardActions disableSpacing sx={{ padding: "0 10px" }}>
				<div id="rate-btn-wrapper">
					<div
						id="like-btn-wrapper"
						style={{ display: "flex", alignItems: "center" }}
					>
						<IconButton color="primary" onClick={handleLikeClicked}>
							{like ? (
								<ThumbUpIcon style={{ color: "black" }} />
							) : (
								<ThumbUpTwoToneIcon
									style={{ color: "black" }}
								/>
							)}
						</IconButton>
						<div>
							<Typography variant="p" color="text.secondary">
								{list.likes.length}
							</Typography>
						</div>
					</div>
					<div
						id="dislike-btn-wrapper"
						style={{ display: "flex", alignItems: "center" }}
					>
						<IconButton
							color="primary"
							onClick={handleDislikeClicked}
						>
							{dislike ? (
								<ThumbDownIcon style={{ color: "black" }} />
							) : (
								<ThumbDownTwoToneIcon
									style={{ color: "black" }}
								/>
							)}
						</IconButton>
						<Typography variant="p" color="text.secondary">
							{list.dislikes.length}
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
				<Top5List
					listId={list._id}
					items={list.items}
					comments={list.comments}
				/>
			</Collapse>
		</Card>
	);
}
