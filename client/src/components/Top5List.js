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
	const listItemStyle = { paddingTop: "0", paddingBottom: "0" };
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
							primary={"Shine on You Crazy Diamond"}
							secondary={"10 Votes"}
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
							primary={"Shine on You Crazy Diamond"}
							secondary={"100 votes"}
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
							primary={"Shine on You Crazy Diamond"}
							secondary={"100 votes"}
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
							primary={"Shine on You Crazy Diamond"}
							secondary={"5 Votes"}
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
							primary={"Shine on You Crazy Diamond"}
							secondary={"100 votes"}
						/>
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
