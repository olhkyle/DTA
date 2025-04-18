import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BsArrowLeft } from 'react-icons/bs';
import { Button, Circle, Flex, HighlightText, Text } from '../components';
import { useGetWorkersDetailQuery, useMediaQuery, useTheme } from '../hooks';
import { useAppSelector } from '../store/store';
import { getIsAdmin } from '../store/userSlice';
import { getBarChartData, getChartOptions, routes } from '../constants';
import { formatCurrencyUnit } from '../utils';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WorkerPage = () => {
	const {
		state: {
			worker: { workerName, workedDate, registrationNumberFront },
		},
	} = useLocation();
	const navigate = useNavigate();

	const [year, month] = [workedDate.getFullYear(), workedDate.getMonth() + 1];
	const [theme] = useTheme();
	const isAdmin = useAppSelector(getIsAdmin);

	const [isTabletScreen, isMobileScreen] = [useMediaQuery('(min-width: 1024px)'), useMediaQuery('(max-width: 640px)')];

	const { data } = useGetWorkersDetailQuery({
		inOrder: 'asc',
		year,
		month,
		workerName,
	});

	const chartOptions = getChartOptions({
		title: `${month}월 [원 / ₩]`,
		theme,
	});

	const chartData = getBarChartData({
		theme,
		labels: (data?.workers ?? []).map(({ workedDate }) => workedDate.getDate() + '일'),
		barPercentage: isTabletScreen ? 0.6 : 0.4,
		data: (data?.workers ?? []).map(({ payment }) => payment),
	});

	return (
		<Container>
			<GoBackButton type="button" onClick={() => navigate(routes.DETAILS, { state: { month: month - 1 } })}>
				<BsArrowLeft size="24" color="var(--text-color)" />
			</GoBackButton>

			<ProfileContainer>
				<div css={{ position: 'absolute', top: '-8px', left: '-4px' }}>
					<Circle size={16} bgColor="var(--text-color)" />
				</div>
				<Flex gap="16px" justifyContent="space-between" margin="0 0 16px">
					<Text typo={isMobileScreen ? 'h6' : 'h5'} color="var(--text-color)">
						{workerName}
					</Text>
					<Text typo={isMobileScreen ? 'h7' : 'h6'} color="var(--disabled-text-color)">
						{isAdmin ? registrationNumberFront : '******'}
					</Text>
				</Flex>
				<Flex gap="16px" margin="0 0 8px">
					<Text typo={isMobileScreen ? 'p' : 'h7'} color="var(--disabled-text-color)">
						{`${month}월 일한 횟수`}
					</Text>

					<Flex gap="5px">
						<HighlightText color="var(--text-color)" bgColor="var(--bg-color)">
							{data?.workers.length}
						</HighlightText>
						<Text typo={isMobileScreen ? 'p' : 'h7'} color="var(--disabled-text-color)">
							회
						</Text>
					</Flex>
				</Flex>
				<Flex gap="16px">
					<Text typo={isMobileScreen ? 'p' : 'h7'} color="var(--disabled-text-color)">
						{`${month}월 총 지급 금액`}
					</Text>
					<Flex gap="5px">
						<HighlightText color="var(--text-color)" bgColor="var(--bg-color)">
							{formatCurrencyUnit(data?.sumOfPayment)}
						</HighlightText>
						<Text typo={isMobileScreen ? 'p' : 'h7'} color="var(--disabled-text-color)">
							원
						</Text>
					</Flex>
				</Flex>
			</ProfileContainer>
			<Flex justifyContent={'center'} width={'100%'} height={isMobileScreen ? '360px' : '500px'}>
				<Bar data={chartData} options={chartOptions} />
			</Flex>
		</Container>
	);
};

const Container = styled.section`
	margin: 32px auto;
	padding: 0 var(--padding-md);
	max-width: 1280px;
	width: 100%;
`;

const ProfileContainer = styled.div`
	position: relative;
	margin: 32px 0 64px auto;
	padding: calc(var(--padding-md) * 0.75) calc(var(--padding-md) * 1.25);
	width: 90dvw;
	border: 1px solid var(--border-color);
	border-radius: var(--radius);
	background-color: var(--btn-light-bg-color);

	@media screen and (min-width: 640px) {
		width: 50dvw;
	}
`;

const GoBackButton = styled(Button)`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	padding: calc(0.3 * var(--padding-md));
	font-weight: var(--fw-semibold);
	background-color: var(--btn-light-bg-color);
	outline: 1px solid var(--outline-light-color);
	outline-offset: 2px;
	transition: background-color 0.15s ease-in-out;

	&:hover {
		background-color: var(--btn-hover-light-bg-color);
	}
`;

export default WorkerPage;
