import { monthOfToday, yearOfToday } from '../constants/day';
import { ControlValues } from '../constants/sortControls';
import { WorkerWithId, getWorkersDetailByPage } from '../service/workData';

type Pagination<T> = {
	paginationData: T[];
	totalPayment: number;
};

interface WorkersQueryData {
	workers: WorkerWithId[];
	totalLength: number;
}

type WorkersQueryPaginationData = ReturnType<typeof getWorkersDetailByPage>;

interface WorkerQuery {
	inOrder: ControlValues;
	year: number;
	month: number;
	workerName: string;
}

interface WorkersPaginationQuery extends WorkerQuery {
	pageParam: number;
}

type WorkersDetailBySort = ReturnType<typeof sortByNameAndWorkedDate>;

const workerQuery: WorkerQuery = {
	inOrder: 'desc',
	year: yearOfToday,
	month: monthOfToday,
	workerName: '',
};

const sortByNameAndWorkedDate = (workers: WorkerWithId[]) =>
	Object.values(
		workers.reduce((acc, worker) => {
			const { workerName } = worker;
			if (!acc[workerName]) {
				acc[workerName] = [];
			}

			acc[workerName].push(worker);
			return acc;
		}, {} as { [key: string]: WorkerWithId[] }),
	)
		.flatMap((groupedWorkers, pos) =>
			groupedWorkers
				.sort((prev, curr) => prev.workedDate - curr.workedDate)
				.map((worker, idx) => ({ ...worker, position: pos, isFirstIdxOfArr: idx === 0 })),
		)
		.sort((prev, curr) => prev.workerName.toLowerCase().localeCompare(curr.workerName.toLowerCase()) && prev.position - curr.position);

export type { Pagination, WorkersQueryData, WorkersQueryPaginationData, WorkerQuery, WorkersPaginationQuery, WorkersDetailBySort };
export { workerQuery, sortByNameAndWorkedDate };
