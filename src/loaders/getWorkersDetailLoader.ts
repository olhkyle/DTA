import { QueryClient } from '@tanstack/react-query';
import { workerQuery } from '../queries/workerQuery';
import getPaginationQuery from '../queries/getWorkersDetailByPageQuery';

const getWorkersDetailLoader = (queryClient: QueryClient) => async () => {
	const query = getPaginationQuery(workerQuery);

	return await queryClient.fetchInfiniteQuery(query);
};

export default getWorkersDetailLoader;
