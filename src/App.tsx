import './styles/font.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Global } from '@emotion/react';
import GlobalStyle from './styles/GlobalStyle';
import { Layout, ErrorBoundary } from './components';
import AuthenticationGuard from './guard/AuthenticationGuard';
import { store } from './store/store';
import { getWorkersDetailLoader, getWorkersOverviewLoader } from './loaders';
import { routes } from './constants';
import { loadLazy } from './utils';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
			suspense: true,
		},
	},
});

const router = createBrowserRouter([
	{
		path: routes.HOME,
		element: <Layout />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				index: true,
				element: <AuthenticationGuard redirectTo={routes.LOGIN} element={loadLazy('Home')} />,
			},
			{
				path: routes.REGISTER,
				element: <AuthenticationGuard redirectTo={routes.LOGIN} element={loadLazy('Register')} />,
			},
			{ path: routes.DASHBOARD, element: <AuthenticationGuard redirectTo={routes.LOGIN} element={loadLazy('Dashboard')} /> },
			{
				path: routes.OVERVIEW,
				loader: getWorkersOverviewLoader(queryClient),
				element: <AuthenticationGuard redirectTo={routes.LOGIN} element={loadLazy('OverView')} />,
			},
			{
				path: routes.DETAILS,
				loader: getWorkersDetailLoader(queryClient),
				element: <AuthenticationGuard redirectTo={routes.LOGIN} element={loadLazy('Details')} />,
			},
			{
				path: routes.WORKER,
				element: <AuthenticationGuard redirectTo={routes.LOGIN} element={loadLazy('Worker')} />,
			},
			{
				path: routes.LOGIN,
				element: loadLazy('SignIn'),
			},
		],
	},
	{
		path: routes.PRINT,
		element: <AuthenticationGuard redirectTo={routes.LOGIN} element={loadLazy('Print')} />,
	},
	{
		path: '/*',
		element: loadLazy('NotFound'),
	},
]);

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ReduxProvider store={store}>
				<Global styles={GlobalStyle} />
				<RouterProvider router={router} />
				<ReactQueryDevtools initialIsOpen={false} />
			</ReduxProvider>
		</QueryClientProvider>
	);
};

export default App;
