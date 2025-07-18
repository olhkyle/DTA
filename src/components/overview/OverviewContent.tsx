import styled from '@emotion/styled';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BsBoxSeam } from 'react-icons/bs';
import { EmptyIndicator, Flex, HighlightText } from '..';
import { useGetWorkersOverviewQuery, useMediaQuery, useTheme } from '../../hooks';
import { type DisplayValues, displayType, getBarChartData, getChartOptions, SortOption } from '../../constants';
import { sortWorkerData } from '../../service/utils';
import { formatCurrencyUnit } from '../../utils';
import { useAppSelector } from '../../store/store';
import { getIsAdmin } from '../../store/userSlice';

interface OverviewContentProps {
	year: number;
	month: number;
	workerName: string;
	currentSort: SortOption;
	currentDisplayType: DisplayValues;
}

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OverviewContent = ({ year, month, workerName, currentSort, currentDisplayType }: OverviewContentProps) => {
	const data = useGetWorkersOverviewQuery({ year, month, workerName });
	const [theme] = useTheme();
	const isAdmin = useAppSelector(getIsAdmin);

	const isMobile = useMediaQuery('(max-width: 640px)');
	const chartOptions = getChartOptions({ title: `${month}월 일용직 [${isMobile ? '1000' : ''}원/₩]`, theme });

	const chartData = getBarChartData({
		theme,
		labels: sortWorkerData(data?.workers ?? [], currentSort).map(({ workerName }) => workerName),
		barPercentage: 0.75,
		data: sortWorkerData(data?.workers ?? [], currentSort).map(({ sumOfPayment }) =>
			isMobile ? [...`${sumOfPayment}`].slice(0, 4).join('') : sumOfPayment,
		),
	});

	return (
		<>
			{data?.workers.length === 0 ? (
				<EmptyIndicator decoration={<BsBoxSeam size={60} color="var(--color-gray-500)" />} label={'해당 월에는 작업한 일용직이 없습니다'} />
			) : currentDisplayType === displayType.LIST ? (
				<Table>
					<thead>
						<tr>
							<th aria-label="tableHead-index">#</th>
							<th aria-label="tableHead-workerName">성 명</th>
							<th aria-label="tableHead-monthOfWorkedDate">해당 월</th>
							<th aria-label="tableHead-sumOfPayment">
								금 액<span>(원)</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{sortWorkerData(data?.workers ?? [], currentSort).map(({ workerName, workedDate, sumOfPayment }, idx) => (
							<tr key={workerName}>
								<td aria-label="tableBody-index">
									<span>{idx + 1}</span>
								</td>
								<td aria-label="tableBody-workerName">{workerName}</td>
								<td aria-label="tableBody-monthOfWorkedDate">{workedDate.getMonth() + 1}월</td>
								<td aria-label="tableBody-sumOfPayment">{isAdmin ? formatCurrencyUnit(sumOfPayment) : 'Classified'}</td>
							</tr>
						))}
					</tbody>
				</Table>
			) : (
				<Flex direction={'column'} margin={'48px 0'} width={'100%'} height={isMobile ? '360px' : '500px'}>
					<Bar data={chartData} options={chartOptions} />
					<ResponsiveFlex justifyContent={'flex-end'} margin={'32px 0'}>
						<HighlightText color={'var(--disabled-text-color)'} bgColor={'var(--btn-light-bg-color)'} fontSize={'var(--fz-sm)'}>
							💡 현재 화면 사이즈에서는 차트의 정확한 데이터를 파악하기 어렵습니다
						</HighlightText>
					</ResponsiveFlex>
				</Flex>
			)}
		</>
	);
};

const Table = styled.table`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	margin: 32px auto 96px;
	width: 100%;
	text-align: center;
	border: 1px solid var(--color-gray-300);
	border-radius: var(--radius);

	thead > tr,
	tbody > tr {
		display: grid;
		grid-template-columns: 1fr 2fr 1.5fr 3fr;
	}

	tr {
		padding: 16px 0;
	}

	thead > tr {
		border-bottom: 1px solid var(--color-gray-300);
	}

	tbody > tr {
		border-bottom: 1px solid var(--border-color);
	}

	th {
		font-size: var(--fz-rp);

		span {
			font-size: var(--fz-rp);
		}

		@media screen and (min-width: 720px) {
			font-size: var(--fz-h7);
		}
	}

	td {
		position: relative;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: var(--fz-rp);
	}

	td[aria-label='tableBody-index'] > span {
		display: inline-block;
		width: 24px;
		color: var(--color-gray-800);
		background-color: var(--color-gray-100);
		border: 1px solid var(--color-gray-opacity-200);
		border-radius: calc(var(--radius) * 0.5);
	}

	@media screen and (max-width: 640px) {
		border-color: var(--color-white);
	}
`;

const ResponsiveFlex = styled(Flex)`
	display: none;

	@media screen and (min-width: 640px) {
		font-size: var(--fz-rp);
	}

	@media screen and (max-width: 768px) {
		display: flex;
	}
`;

export default OverviewContent;
