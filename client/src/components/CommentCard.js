import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function OutlinedCard(props) {
	return (
		<Box sx={{ minWidth: 275, paddingBottom: "10px" }}>
			<Card
				variant="outlined"
				style={{ borderRadius: "10px", borderColor: "black" }}
			>
				<CardContent
					sx={{
						padding: "10px",
						bgcolor: "#d4af36",
						"&:last-child": { paddingBottom: "10px" },
					}}
				>
					<Typography
						sx={{
							fontSize: 12,
							color: "#2c2f70",
							fontWeight: "600",
						}}
						gutterBottom
					>
						{props.comment.username}
					</Typography>
					<Typography variant="body2">
						{props.comment.comment}
					</Typography>
				</CardContent>
			</Card>
		</Box>
	);
}
