import { Flex, RegisterForm } from '../components';

const Register = () => {
	return (
		<section>
			<Flex margin={'0 auto'} width={'100%'} padding={'0 var(--padding-md)'} maxWidth={'600px'}>
				<RegisterForm />
			</Flex>
		</section>
	);
};

export default Register;
