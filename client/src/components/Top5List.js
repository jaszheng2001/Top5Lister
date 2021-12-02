import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CommentCard from "./CommentCard";
import CommentField from "./CommentField";

export default function Top5List(props) {
	const listItemStyle = { paddingTop: "0", paddingBottom: "0" };
	const { items, comments } = props;
	return (
		<div id="list-wrapper">
			<div id="top5list" className="top5list-inner">
				<List sx={{ color: "#d4af36", justifyContent: "center" }}>
					<ListItem sx={listItemStyle}>
						<ListItemIcon sx={{ color: "#d4af36" }}>
							<Typography variant="h4">1.</Typography>
						</ListItemIcon>
						<ListItemText
							primaryTypographyProps={{ fontSize: "1.4rem" }}
							secondaryTypographyProps={{
								fontSize: ".7rem",
								color: "#d4af36",
							}}
							primary={items[0].value || items[0]}
							secondary={items[0].votes || ""}
						/>
					</ListItem>
					<ListItem sx={listItemStyle}>
						<ListItemIcon style={{ color: "#d4af36" }}>
							<Typography variant="h4">2.</Typography>
						</ListItemIcon>
						<ListItemText
							primaryTypographyProps={{ fontSize: "1.4rem" }}
							secondaryTypographyProps={{
								fontSize: ".7rem",
								color: "#d4af36",
							}}
							primary={items[1].value || items[1]}
							secondary={items[1].votes || ""}
						/>
					</ListItem>
					<ListItem sx={listItemStyle}>
						<ListItemIcon style={{ color: "#d4af36" }}>
							<Typography variant="h4">3.</Typography>
						</ListItemIcon>
						<ListItemText
							primaryTypographyProps={{ fontSize: "1.4rem" }}
							secondaryTypographyProps={{
								color: "#d4af36",
								fontSize: ".7rem",
							}}
							primary={items[2].value || items[2]}
							secondary={items[2].votes || ""}
						/>
					</ListItem>
					<ListItem sx={listItemStyle}>
						<ListItemIcon style={{ color: "#d4af36" }}>
							<Typography variant="h4">4.</Typography>
						</ListItemIcon>
						<ListItemText
							primaryTypographyProps={{ fontSize: "1.4rem" }}
							secondaryTypographyProps={{
								color: "#d4af36",
								fontSize: ".7rem",
							}}
							primary={items[3].value || items[3]}
							secondary={items[3].votes || ""}
						/>
					</ListItem>
					<ListItem sx={listItemStyle}>
						<ListItemIcon style={{ color: "#d4af36" }}>
							<Typography variant="h4">5.</Typography>
						</ListItemIcon>
						<ListItemText
							primaryTypographyProps={{ fontSize: "1.4rem" }}
							secondaryTypographyProps={{
								color: "#d4af36",
								fontSize: ".7rem",
							}}
							primary={items[4].value || items[4]}
							secondary={items[4].votes || ""}
						/>
					</ListItem>
				</List>
			</div>
			<div id="comment-container" className="top5list-inner">
				<div id="comment-wrapper">
					{comments.map((el) => (
						<CommentCard comment={el} id={el._id} />
					))}
				</div>
				<CommentField />
			</div>
		</div>
	);
}
