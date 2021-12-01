import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const card = (
	<CardContent
		sx={{
			padding: "10px",
			bgcolor: "#d4af36",
			"&:last-child": { paddingBottom: "10px" },
		}}
	>
		<Typography
			sx={{ fontSize: 12, color: "#2c2f70", fontWeight: "600" }}
			gutterBottom
		>
			Username
		</Typography>
		<Typography variant="body2">lorem ipsum dsfsd snfs;dalndsn</Typography>
	</CardContent>
);

export default function OutlinedCard() {
	return (
		<Box sx={{ minWidth: 275, paddingBottom: "10px" }}>
			<Card
				variant="outlined"
				style={{ borderRadius: "10px", borderColor: "black" }}
			>
				{card}
			</Card>
		</Box>
	);
}
