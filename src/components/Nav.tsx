import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { RiCloseFill, RiMenuFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useScrollTopEffect, useSetUser, useSideNavActive } from '../hooks';
import { Flex, NavLink, ThemeButton, SideNav, UserProfile } from '.';
import { useAppSelector } from '../store/store';
import { getIsAdmin, getUser } from '../store/userSlice';
import { logOut } from '../service/auth';
import routes from '../constants/routes';

const Nav = () => {
	const navigate = useNavigate();

	const {
		active,
		actions: { toggle, close },
	} = useSideNavActive();

	const username = useAppSelector(getUser);
	const isAdmin = useAppSelector(getIsAdmin);
	const { setLogoutUser } = useSetUser();

	const handleLogout = async () => {
		try {
			await logOut();
			setLogoutUser();
			toast.success('성공적으로 로그아웃 되었습니다.');
		} catch (e) {
			toast.error('문제가 발생하였습니다.');
			console.error(e);
		} finally {
			navigate(routes.HOME);
		}
	};

	useScrollTopEffect(active);

	return (
		<>
			<Container isAdmin={isAdmin}>
				<Logo to={routes.HOME} onClick={close} aria-label="logo">
					<h1 className="underlined">
						<img src="./dta.png" alt="logo" />
					</h1>
				</Logo>
				<NavLinkContainer>
					<Flex justifyContent="space-between" gap="0.25rem">
						<Navigation to={routes.OVERVIEW}>월별 개요</Navigation>
						<Navigation to={routes.DETAILS}>월별 상세</Navigation>
						{isAdmin && <Navigation to={routes.SEARCH_WORKERS}>일용직 검색</Navigation>}
						<Navigation to={routes.REGISTER}>일용직 등록</Navigation>
						{username ? <UserProfile name={username} isAdmin={isAdmin} onLogout={handleLogout} /> : <Login to={routes.LOGIN}>로그인</Login>}
					</Flex>
					<ThemeButton />
				</NavLinkContainer>
				<NavToggleButton onClick={toggle}>
					{active ? <RiCloseFill size="35" color="var(--text-color)" /> : <RiMenuFill size="32" color="var(--text-color)" />}
				</NavToggleButton>
			</Container>
			{active && <SideNav onLogout={handleLogout} />}
			{active && <Overlay onClick={close} />}
		</>
	);
};

const Container = styled.nav<{ isAdmin: boolean }>`
	position: sticky;
	top: 0;
	display: flex;
	justify-content: space-between;
	gap: 1rem;
	margin: 0 auto;

	max-width: 1280px;
	height: 80px;
	border-bottom: 1px solid var(--text-color);
	backdrop-filter: blur(8px);
	z-index: 9900;

	@media screen and (min-width: 640px) {
		padding: 0 1rem;
	}
`;

const Logo = styled(Link)`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;

	h1 {
		width: 45px;
		height: 45px;

		img {
			display: block;
			width: 100%;
			height: 100%;
		}
	}

	@media screen and (min-width: 640px) {
		padding: 0;
	}
`;

const NavLinkContainer = styled.div`
	display: none;
	justify-content: space-between;
	align-items: center;
	gap: 3rem;
	margin: 0.4rem 0 0;

	@media screen and (min-width: 768px) {
		display: flex;
	}
`;

const Navigation = styled(NavLink)`
	&:hover {
		color: var(--btn-hover-color);
		background-color: var(--option-hover-bg-color);
		transition: all 0.3s ease-in-out 0.15s;
	}
`;

const Login = styled(NavLink)`
	margin-left: 1rem;
	color: var(--btn-text-color);
	background-color: var(--btn-bg-color);

	&:hover {
		background-color: var(--btn-hover-bg-color);
		transition: all 0.3s ease-in-out 0.15s;
	}
`;

const NavToggleButton = styled.button`
	display: inline-flex;
	align-items: center;
	margin-left: auto;
	margin-right: 1rem;

	@media screen and (min-width: 768px) {
		display: none;
	}
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	backdrop-filter: blur(10px);
	z-index: 99;
`;

export default Nav;
