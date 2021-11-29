import "./App.css";
import { React } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from "./auth";
import { GlobalStoreContextProvider } from "./store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
	AppBanner,
	HomeWrapper,
	RegisterScreen,
	WorkspaceScreen,
	LoginScreen,
} from "./components";
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/

let theme = createTheme({
	palette: {
		primary: {
			main: "#b6b4b4e1",
		},
		secondary: {
			main: "#edf2ff",
		},
	},
});

const App = () => {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<GlobalStoreContextProvider>
					<ThemeProvider theme={theme}>
						<AppBanner />
						<Switch>
							<Route path="/" exact component={HomeWrapper} />
							<Route
								path="/register/"
								exact
								component={RegisterScreen}
							/>
							<Route
								path="/login/"
								exact
								component={LoginScreen}
							/>
							<Route
								path="/top5list/:id"
								exact
								component={WorkspaceScreen}
							/>
						</Switch>
					</ThemeProvider>
				</GlobalStoreContextProvider>
			</AuthContextProvider>
		</BrowserRouter>
	);
};

export default App;
