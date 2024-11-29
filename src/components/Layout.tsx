import { Suspense } from 'react';
import styled from '@emotion/styled';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Footer, Main, Nav, ScrollToTopButton, ModalContainer, LayoutLoading } from '.';
import { useScrollTopEffect } from '../hooks';
import routes from '../constants/routes';

const Layout = () => {
	const { pathname } = useLocation();

	useScrollTopEffect(pathname);

	return (
		<>
			<Nav />
			<Main>
				<Suspense fallback={<LayoutLoading type="lg" />}>
					<Outlet />
				</Suspense>
			</Main>
			{pathname !== routes.LOGIN && <Footer />}
			<ScrollToTopButton topPosToShow={300} />
			<StyledToastContainer position="bottom-center" autoClose={1500} closeOnClick={true} pauseOnHover={false} limit={1} />
			<ModalContainer />
		</>
	);
};

const StyledToastContainer = styled(ToastContainer)`
	.Toastify__toast {
		color: var(--text-color);
		border-radius: calc(var(--radius) * 1.5);
		background-color: var(--bg-color);
		border: 1px solid var(--outline-color);
	}
`;

export default Layout;
