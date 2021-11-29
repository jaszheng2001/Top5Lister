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

export default function Top5List() {
	return (
		<div id="list-wrapper">
			<div id="top5list" className="top5list-inner">
				<List sx={{ color: "#d4af36" }}>
					<ListItem>
						<ListItemIcon sx={{ color: "#d4af36" }}>
							<Typography variant="h4">1.</Typography>
						</ListItemIcon>
						<Typography variant="h5">
							Shine on You Crazy Diamond
						</Typography>
					</ListItem>
					<ListItem>
						<ListItemIcon style={{ color: "#d4af36" }}>
							<Typography variant="h4">2.</Typography>
						</ListItemIcon>
						<Typography variant="h5">
							Shine on You Crazy Diamond
						</Typography>
					</ListItem>
					<ListItem>
						<ListItemIcon style={{ color: "#d4af36" }}>
							<Typography variant="h4">3.</Typography>
						</ListItemIcon>
						<Typography variant="h5">
							Shine on You Crazy Diamond
						</Typography>
					</ListItem>
					<ListItem>
						<ListItemIcon style={{ color: "#d4af36" }}>
							<Typography variant="h4">4.</Typography>
						</ListItemIcon>
						<Typography variant="h5">
							Shine on You Crazy Diamond
						</Typography>
					</ListItem>
					<ListItem>
						<ListItemIcon style={{ color: "#d4af36" }}>
							<Typography variant="h4">5.</Typography>
						</ListItemIcon>
						<Typography variant="h5">ITEM 5</Typography>
					</ListItem>
				</List>
			</div>
			<div id="comment-container" className="top5list-inner">
				<div id="comment-wrapper">
					<CommentCard />
					<CommentCard />
					<CommentCard />
				</div>
				<CommentField />
			</div>
		</div>
	);
}
