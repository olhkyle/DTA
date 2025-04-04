import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import {
	Input,
	Text,
	Button,
	NativeSelect,
	Flex,
	DatePicker,
	SmallLoading,
	RegisterSchema,
	registerSchema,
	SubmitHandler,
	ModalLayout,
} from '../../components';
import { WorkerWithId } from '../../service/workData';
import { useOverlayFixed, useEditWorkerMutation, useRemoveWorkerMutation } from '../../hooks';
import { useAppSelector } from '../../store/store';
import { QueryRefetch } from '../../store/modalSlice';
import { getIsAdmin } from '../../store/userSlice';
import { unformatCurrencyUnit } from '../../utils';

interface DetailModalProps {
	data: WorkerWithId;
	isOpen: boolean;
	onClose: () => void;
	refetch: QueryRefetch;
	order: `modal-${number}`;
}

const DetailModal = ({ data: worker, isOpen, onClose, refetch, order }: DetailModalProps) => {
	const navigate = useNavigate();
	const isAdmin = useAppSelector(getIsAdmin);

	const [isEditMode, setIsEditMode] = useState(false);
	const [selectedDay, setSelectedDay] = useState<Date | undefined>();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		mode: 'onSubmit',
		defaultValues: {
			workerName: worker.workerName,
			registrationNumberFront: worker.registrationNumberFront,
			registrationNumberBack: worker.registrationNumberBack,
			workspace: worker.workspace,
			businessNumber: worker.businessNumber,
			remittanceType: worker.remittanceType,
			payment: worker.payment,
			memo: worker.memo,
		},
	});

	const { mutate: editMutate, isLoading: isEditMutateLoading } = useEditWorkerMutation(worker.id);
	const { mutate: removeMutate, isLoading: isRemoveMutateLoading } = useRemoveWorkerMutation(worker.id);

	useOverlayFixed(isOpen);

	useEffect(() => {
		if (worker?.workedDate) {
			setSelectedDay(worker.workedDate);
		}
	}, [worker]);

	const toggleAllFieldsDisabled = () => {
		if (!isAdmin) {
			toast.warn('Update Feature is Admin Only');
			return;
		}

		if (isEditMode) {
			// 수정 모드를 끌 때 원래 값으로 reset
			setValue('workerName', worker.workerName);
			setValue('registrationNumberFront', worker.registrationNumberFront);
			setValue('registrationNumberBack', worker.registrationNumberBack);
			setValue('workspace', worker.workspace);
			setValue('businessNumber', worker.businessNumber);
			setValue('remittanceType', worker.remittanceType);
			setValue('payment', worker.payment);
			setValue('memo', worker.memo);
			setSelectedDay(worker.workedDate);
		}

		setIsEditMode(prev => !prev);
	};

	const handleRemoveWorkerButton = () => {
		if (!isAdmin) {
			toast.warn('Delete Feature is Admin Only');
			return;
		}

		removeMutate(
			{ id: worker.id },
			{
				onSuccess: () => {
					toast.success('성공적으로 삭제 되었습니다.');
					onClose();
					refetch();
				},
				onError: e => {
					console.error(e);
					toast.error('삭제하는데 문제가 발생하였습니다.');
				},
			},
		);
	};

	const onSubmit: SubmitHandler<RegisterSchema> = fields => {
		if (!isEditMode) {
			toast.warn('수정 모드에서만 저장할 수 있습니다.');
			return;
		}

		if (!selectedDay) {
			toast.error('작업일자를 선택해 주세요');
			return;
		}

		editMutate(
			{
				id: worker.id,
				workedDate: selectedDay,
				...fields,
				payment: unformatCurrencyUnit(fields.payment),
			},
			{
				onSuccess: () => {
					toast.success('성공적으로 수정되었습니다.');
					onClose();
					refetch();
				},
				onError: e => {
					console.error(e);
					toast.error('수정하는데 문제가 발생하였습니다.');
				},
			},
		);
	};

	return (
		<>
			<ModalLayout title={'👨🏻‍💻 일용직 수정'} order={order} onClose={onClose}>
				<ActionButtons gap="16px">
					<ModifyButton type="button" onClick={toggleAllFieldsDisabled}>
						{isEditMode ? '수정취소' : '수정하기'}
					</ModifyButton>
					<ViewWorkerDetailButton
						type="button"
						onClick={() => {
							onClose();
							navigate(`/worker/${worker.id}`, { state: { worker } });
						}}>
						일용직 상세보기
					</ViewWorkerDetailButton>
				</ActionButtons>
				<Group aria-disabled={isEditMode}>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Input label="성 명" bottomText={errors?.workerName?.message}>
							<Input.TextField
								type="text"
								placeholder="이름을 입력하세요"
								{...register('workerName')}
								error={errors?.workerName?.message}
								disabled={!isEditMode}
							/>
						</Input>
						<CustomFlex alignItems="flex-start" gap="16px">
							{isAdmin ? (
								<>
									<Input label="주민등록번호 앞 자리" bottomText={errors?.registrationNumberFront?.message}>
										<Input.TextField
											type="text"
											placeholder="주민등록번호 앞 6자리"
											{...register('registrationNumberFront')}
											error={errors?.registrationNumberFront?.message}
											disabled={!isEditMode}
										/>
									</Input>
									<Input label="주민등록번호 뒷 자리" bottomText={errors?.registrationNumberBack?.message}>
										<Input.TextField
											type="text"
											placeholder="주민등록번호 뒤 7자리"
											{...register('registrationNumberBack')}
											error={errors?.registrationNumberBack?.message}
											disabled={!isEditMode}
										/>
									</Input>
								</>
							) : (
								<Flex direction="column" alignItems="flex-start" gap="8px">
									<div css={{ fontSize: '17px', fontWeight: 'var(--fw-medium)' }}>주민등록번호</div>
									<CustomFlex gap="16px">
										<Confidential>Classified</Confidential>
										<Confidential>Classified</Confidential>
									</CustomFlex>
								</Flex>
							)}
						</CustomFlex>

						<DatePicker selectedDay={selectedDay} setSelectedDay={setSelectedDay} disabled={!isEditMode} />

						<CustomFlex alignItems="flex-start" gap="16px">
							<Input label="근로 지역" bottomText={errors?.workspace?.message}>
								<Input.TextField
									type="text"
									placeholder="작업 공간 이름"
									{...register('workspace')}
									error={errors?.workspace?.message}
									disabled={!isEditMode}
								/>
							</Input>
							<Input label="사업개시번호" bottomText={errors?.businessNumber?.message}>
								<Input.TextField
									type="text"
									placeholder="000-00-00000-0"
									{...register('businessNumber')}
									error={errors?.businessNumber?.message}
									disabled={!isEditMode}
								/>
							</Input>
						</CustomFlex>

						<CustomFlex alignItems="flex-start" gap="16px">
							<NativeSelect label="송금 유형" bottomText={errors?.remittanceType?.message}>
								<NativeSelect.Field
									id="송금 유형"
									{...register('remittanceType')}
									error={errors?.remittanceType?.message}
									disabled={!isEditMode}
								/>
							</NativeSelect>
							<Controller
								name="payment"
								control={control}
								render={({ field: { name, value, onChange, onBlur }, fieldState: { error } }) => (
									<Input label="지급 금액" bottomText={error?.message} rightText="원">
										<Input.ControlledTextField
											type="text"
											placeholder="지급 금액"
											name={name}
											value={
												value
													? value
															.toString()
															.replace(/,/gi, '')
															.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
													: ''
											}
											onChange={onChange}
											onBlur={onBlur}
											error={error?.message}
											disabled={!isEditMode}
										/>
									</Input>
								)}
							/>
						</CustomFlex>
						<Input label="메모/기타" bottomText={errors?.memo?.message}>
							<Input.TextField
								type="text"
								placeholder="기타 필요한 사항을 기입하세요."
								{...register('memo')}
								error={errors?.memo?.message}
								disabled={!isEditMode}
							/>
						</Input>
						{isEditMode && (
							<UpdateButton type="submit" id="update" disabled={!isEditMode} aria-label="update-button">
								{isEditMutateLoading ? <SmallLoading /> : '수정하기'}
							</UpdateButton>
						)}
						<Flex direction="column" margin="32px 0" width="100%">
							<Text color="var(--btn-hover-color)">
								해당 정보가 불필요하다면 <strong css={{ textDecoration: 'underline' }}>삭제하기</strong>를 클릭해 주세요🫨
							</Text>
							<DeleteButton type="button" id="delete" aria-label="delete-button" onClick={handleRemoveWorkerButton}>
								{isRemoveMutateLoading ? <SmallLoading /> : '삭제하기'}
							</DeleteButton>
						</Flex>
					</Form>
				</Group>
			</ModalLayout>
		</>
	);
};

const ActionButtons = styled(Flex)`
	position: sticky;
	top: -1px;
	min-height: 48px;
	background-color: var(--color-white);
	z-index: var(--modal-index);
`;

const ModifyButton = styled(Button)`
	padding: var(--padding-sm) calc(var(--padding-sm) * 1.5);
	color: var(--bg-color);
	background-color: var(--color-green-50);

	&:hover {
		background-color: var(--color-green-200);
	}
`;

const ViewWorkerDetailButton = styled(Button)`
	padding: var(--padding-sm) calc(var(--padding-sm) * 1.5);
	color: var(--bg-color);
	background-color: var(--color-orange-100);

	&:hover {
		background-color: var(--color-orange-200);
	}
`;

const Group = styled.div`
	margin: 16px 0 0;
	padding: var(--padding-md);
	background-color: var(--color-white);
	border-radius: var(--radius);

	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */

	::-webkit-scrollbar {
		display: none;
	}

	&[aria-disabled='false'] {
		background-color: var(--color-gray-opacity-50);
	}

	@media screen and (min-width: 640px) {
		margin-top: 16px;
	}
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const CustomFlex = styled(Flex)`
	flex-direction: column;

	@media screen and (min-width: 640px) {
		flex-direction: row;
	}
`;

const Confidential = styled.div`
	margin: 0;
	padding: calc(var(--padding-sm) * 1.5) var(--padding-md);
	min-width: 250px;
	width: 100%;
	font-size: var(--fz-rp);
	font-weight: var(--fw-medium);
	line-height: 24px;
	border: none;
	border-radius: var(--radius);
	background-color: var(--outline-color);
	backdrop-filter: blur(4px);
	color: var(--color-gray-500);
`;

const UpdateButton = styled(Button)`
	margin: 16px auto 0;
	width: 100%;
	color: var(--btn-text-color);
	background-color: var(--color-green-300);

	&:hover {
		background-color: var(--color-green-200);
	}
`;

const DeleteButton = styled(Button)`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	gap: 0.4rem;
	margin: 16px auto 0;
	width: 100%;
	color: var(--bg-color);
	border: 1px solid var(--text-color);
	background-color: var(--btn-bg-color);
	transition: all 0.1s ease-in-out;

	&:hover {
		background-color: var(--btn-hover-bg-color);
	}
`;

export default DetailModal;
