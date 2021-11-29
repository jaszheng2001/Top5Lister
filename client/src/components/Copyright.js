import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"© Developed and Maintained by "}
			<Link color="inherit" href="https://www.jaszheng.com">
				Jason Zheng
			</Link>
			{" " + new Date().getFullYear()}
			{"."}
		</Typography>
	);
}
