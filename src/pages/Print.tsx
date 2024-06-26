import { useRef } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { BsArrowLeftCircle } from 'react-icons/bs';
import ReactToPrint from 'react-to-print';
import { Button, Detail, Flex, HighlightText, Overview } from '../components';
import { useAppSelector } from '../store/store';
import { getIsAdmin } from '../store/userSlice';
import { useGoBack } from '../hooks';
import { controls } from '../constants/sortControls';

const Print = () => {
	const {
		state: { year, month },
	} = useLocation();

	const goBack = useGoBack();
	const isAdmin = useAppSelector(getIsAdmin);
	const printRef = useRef(null);

	const query = { inOrder: controls[0], year, month, workerName: '' };

	return (
		<Container>
			<Flex justifyContent="space-between" margin="0 0 2rem 0">
				<GoBackButton type="button" onClick={goBack}>
					<BsArrowLeftCircle size="24" color="var(--color-gray-700)" />
					뒤로가기
				</GoBackButton>
				<Flex gap="1rem">
					<HighlightText color="white" bgColor="black">{`${year}월 ${month}월`}</HighlightText>

					<ReactToPrint
						trigger={() => (
							<PrintButton type="button" disabled={!isAdmin}>
								{isAdmin ? '출력하기' : 'Admin Only'}
							</PrintButton>
						)}
						content={() => printRef.current}
					/>
				</Flex>
			</Flex>
			<Data ref={printRef}>
				<Overview query={query} />
				<Detail query={query} />
			</Data>
		</Container>
	);
};

const Container = styled.div`
	margin: 1rem auto;
	padding: 3rem 0;

	@media screen and (min-width: 640px) {
		width: 640px;
	}

	@media screen and (min-width: 768px) {
		width: 768px;
	}
`;

const GoBackButton = styled(Button)`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	font-weight: 700;
	font-size: 15px;
	color: var(--color-gray-800);
	background-color: #e7e7e9;
	outline: 1px solid var(--color-white);
	border-radius: 9999px;
	transition: all 0.3s ease-in-out 0.15s;

	&:hover {
		outline: 2px solid #3a3d4a;
		outline-offset: 2px;
	}
`;

const PrintButton = styled(Button)<{ disabled: boolean }>`
	font-weight: 700;
	color: #fff;
	background-color: ${({ disabled }) => (disabled ? 'var(--color-gray-500)' : 'var(--color-green-50)')};
	border-radius: ${({ disabled }) => (disabled ? '8px' : '9999px')};
	transition: all 0.3s ease-in-out 0.15s;

	&:hover {
		background-color: ${({ disabled }) => (disabled ? 'var(--color-gray-500)' : 'var(--color-green-200)')};
	}
`;

const Data = styled.div`
	border-color: var(--color-dark);
`;

export default Print;
