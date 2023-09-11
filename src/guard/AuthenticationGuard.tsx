import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../service/firebase';
import { useSetUser } from '../hooks';
import routes from '../constants/routes';
import { Route } from '../constants/routes';

interface AuthenticationGuardProps {
	redirectTo: Route<typeof routes>;
	element: ReactNode;
}

const AuthenticationGuard = ({ redirectTo, element }: AuthenticationGuardProps) => {
	const { name: username, setLogoutUser } = useSetUser();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			if (!user) {
				setIsLoggedIn(false);
				setLogoutUser();
				return;
			}

			setIsLoggedIn(true);
		});
	}, []);

	if (!username) {
		return <Navigate to={redirectTo} />;
	}

	return !isLoggedIn ? null : username ? element : <Navigate to={redirectTo} />;
};

export default AuthenticationGuard;