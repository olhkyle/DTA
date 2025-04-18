import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { SearchInput, SearchInfo, ModalLayout } from '..';
import { getSpecificWorker } from '../../service/workData';
import { useLoading, useOverlayFixed } from '../../hooks';

export interface RecentSearch {
	workerName: string;
	registrationNumber: string;
}

interface SearchWorkerModalProps {
	isOpen: boolean;
	order: `modal-${number}`;
	onClose: () => void;
}

const SearchWorkerModal = ({ isOpen, order, onClose }: SearchWorkerModalProps) => {
	const [workerName, setWorkerName] = useState<string>('');
	const [recentSearchList, setRecentSearchList] = useState<RecentSearch[]>([]);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const { Loading, isLoading, startTransition } = useLoading();

	useOverlayFixed(isOpen);

	const handleSearchResult = async () => {
		try {
			const data = await startTransition(
				getSpecificWorker({
					workerName: workerName,
				}),
			);

			if (!data) {
				return toast.warn('검색 결과가 없습니다.');
			}

			const registrationNumber = data.registrationNumberFront + '-' + data.registrationNumberBack;

			setRecentSearchList(recentSearchList => {
				if (recentSearchList.find(item => item.workerName === workerName)) {
					return [...recentSearchList];
				}
				return [...recentSearchList, { workerName, registrationNumber }];
			});
		} catch (e) {
			console.error(e);
			toast.error('검색에 문제가 발생하였습니다.');
		} finally {
			inputRef.current?.blur();
		}
	};

	return (
		<ModalLayout title={'일용직 찾기'} order={order} onClose={onClose}>
			<SearchInput
				ref={inputRef}
				value={workerName}
				setValue={setWorkerName}
				clearValue={() => {
					setWorkerName('');
				}}
				onSearchButtonClick={handleSearchResult}
				onKeyDown={(e: React.SyntheticEvent) => {
					if (e.nativeEvent instanceof KeyboardEvent) {
						if (e.nativeEvent.key === 'Enter') {
							handleSearchResult();
							return;
						}
					}

					if ((e.target as HTMLInputElement).value.length === 0) {
						setWorkerName('');
					}
				}}
			/>

			<SearchInfo recentSearchList={recentSearchList} loader={<Loading />} isLoading={isLoading} />
		</ModalLayout>
	);
};

export default SearchWorkerModal;
