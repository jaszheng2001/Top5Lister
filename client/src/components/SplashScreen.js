import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Copyright from "./Copyright";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import EmailIcon from "@mui/icons-material/Email";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";

export default function SplashScreen() {
	let boxStyle = {
		width: "30%",
		bgcolor: "#d1d1d1",
		height: "80%",
		alignSelf: "center",
		borderRadius: "10px",
		margin: "5%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		border: "black solid .5px",
	};

	let BtnStyle = {
		color: "black",
		border: ".5px solid black",
		width: "70%",
		bgcolor: "#dbdbdb",
		"&.MuiButtonBase-root:hover": {
			border: ".5px solid black",
			color: "black",
		},
	};
	return (
		<Container
			maxWidth="100%"
			sx={{
				background: "linear-gradient(0deg, #cbcbcb, #FFFFFF)",
				height: "90%",
				display: "flex",
				justifyContent: "space-around",
			}}
		>
			<Box component="div" sx={{ ...boxStyle }}>
				<Typography
					variant="h3"
					sx={{ textAlign: "center", padding: "0 10%" }}
				>
					Top5Lister
				</Typography>
				<Box
					component="div"
					sx={{ display: "flex", justifyContent: "center" }}
				>
					<ThumbUpIcon
						fontSize="large"
						sx={{ padding: "15px 25px" }}
					/>
					<ThumbDownIcon
						fontSize="large"
						sx={{ padding: "15px 25px" }}
					/>
				</Box>
				<Typography
					variant="p"
					sx={{ textAlign: "center", padding: "0 10%" }}
				>
					Have a favorite Top 5 List? Share the List with the World!
					Connect with the community and vote on your favorite list!
				</Typography>
			</Box>
			<Box
				component="div"
				sx={{
					...boxStyle,
					width: "40%",
				}}
			>
				<Box
					component="div"
					sx={{
						paddingTop: "40px",
						paddingBottom: "40px",
						width: "100%",
						height: "200px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around",
						alignItems: "center",
					}}
				>
					<Typography variant="h4" sx={{ textAlign: "center" }}>
						Welcome
					</Typography>
					<Button variant="outlined" sx={BtnStyle} href="login">
						Login with Email
						<EmailIcon
							sx={{ position: "absolute", right: "40px" }}
						/>
					</Button>
					<Button variant="outlined" sx={BtnStyle}>
						Login as Guest{" "}
						<NoAccountsIcon
							sx={{ position: "absolute", right: "40px" }}
						/>
					</Button>
					<Link
						href="register"
						sx={{
							color: "black",
							textDecorationColor: "black",
						}}
					>
						Don't have an account? Sign up
					</Link>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Box>
		</Container>
	);
}
