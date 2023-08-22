import "./App.css";
import {
	SideNavbar,
	DashboardPage,
	Session,
	Error404,
	LandingPage,
	Signup,
	Login,
	LabAccessPage,
} from "./views";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {RoutesPathName} from "./constants";
import {ProtectedRoute} from "./components";
import NonProtectedRoute from "./components/non-protected-route";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useContext} from "react";
import {AuthContext} from "./contexts";

const LayoutWithSidebar = () => {
	return (
		<div>
			<ToastContainer/>
			<div className="flex">
				<SideNavbar/>
				<Outlet/>
			</div>
		</div>
	);
};

const router = createBrowserRouter([
	{
		path: RoutesPathName.LANDING_PAGE,
		index: true,
		Component: LandingPage,
		errorElement: <Error404/>,
	},
	{
		path: RoutesPathName.LOGIN_PAGE,
		// Component: Login,
		element: (
			<NonProtectedRoute>
				<Login/>
			</NonProtectedRoute>
		),
	},
	{
		path: `${RoutesPathName.ACCEPT_PAGE}/:labId`,
		// Component: Login,
		element: (
			<ProtectedRoute>
				<LabAccessPage/>
			</ProtectedRoute>
		),
	},
	{
		path: RoutesPathName.SIGNUP_PAGE,
		// Component: Signup,
		element: (
			<NonProtectedRoute>
				<Signup/>
			</NonProtectedRoute>
		),
	},
	{
		path: "/",
		element: <LayoutWithSidebar/>,
		children: [
			{
				path: RoutesPathName.DASHBOARD_PAGE,
				element: (
					<ProtectedRoute>
						<DashboardPage/>
					</ProtectedRoute>
				),
			},
			{
				path: `${RoutesPathName.SESSION_PAGE}/:labId`,
				element: (
					<ProtectedRoute>
						<Session/>
					</ProtectedRoute>
				),
			},
		],
	},
]);

function App() {
	const {user} = useContext(AuthContext);

	if (user === undefined) {
		return <div>Initializing....</div>;
	}

	return <RouterProvider router={router}/>;
}

export default App;
