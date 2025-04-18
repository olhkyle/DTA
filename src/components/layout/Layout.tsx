import { Suspense } from 'react';
import styled from '@emotion/styled';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Footer, Main, Nav, ScrollToTopButton, ModalContainer, LayoutLoading, OpenSearchWorkerModalButton } from '..';
import { useScrollTopEffect } from '../../hooks';
import { routes } from '../../constants';
import { useAppSelector } from '../../store/store';
import { getUser } from '../../store/userSlice';

const Layout = () => {
	const { pathname } = useLocation();
	const user = useAppSelector(getUser);

	useScrollTopEffect(pathname);

	const isLoggined = user.name.length > 0 && user.nickname !== 'test-id' && user.isAdmin;

	return (
		<Suspense fallback={<LayoutLoading type={'lg'} asChild={false} />}>
			<Nav />
			<Main>
				<Suspense fallback={<LayoutLoading type={'lg'} />}>
					<Outlet />
				</Suspense>
			</Main>
			{pathname !== routes.LOGIN && <Footer />}
			<ScrollToTopButton topPosToShow={300} />
			<StyledToastContainer position="bottom-center" autoClose={1500} closeOnClick={true} pauseOnHover={false} limit={1} />
			{isLoggined && <OpenSearchWorkerModalButton />}
			<ModalContainer />
		</Suspense>
	);
};

const StyledToastContainer = styled(ToastContainer)`
	.Toastify__toast {
		color: var(--text-color);
		border-radius: calc(var(--radius) * 1.5);
		background-color: var(--bg-color);
		border: 1px solid var(--border-color);
	}
`;

export default Layout;
