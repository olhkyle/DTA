import { Dispatch, SetStateAction, useState } from 'react';
import { useClickOutside, useId } from '../../hooks';
import styled from '@emotion/styled';
import { BiSolidDownArrow } from 'react-icons/bi';
import { BsCheck } from 'react-icons/bs';

interface SelectProps {
	data: readonly number[];
	value: number;
	setValue: Dispatch<SetStateAction<number>>;
	unit?: string;
	width: number;
}

const Select = ({ data, value: current, setValue, unit, width }: SelectProps) => {
	const [open, setOpen] = useState(false);

	const generatedId = useId('custom-select');
	const generatedListId = useId('custom-select-list');

	const ref = useClickOutside(() => setOpen(false));

	const isCurrent = (value: number) => (current === value ? true : false);

	return (
		<Container tabIndex={0} width={width} ref={ref}>
			<Trigger
				type="button"
				id={generatedId}
				onClick={() => setOpen(!open)}
				aria-controls={generatedListId}
				aria-expanded={open}
				tabIndex={0}
				width={width}>
				<span>
					{current} {unit}
				</span>
				<BiSolidDownArrow size="14" />
			</Trigger>
			{open && (
				<Options id={generatedListId} role="listbox" aria-labelledby={generatedId}>
					{data.map(item => (
						<Option
							key={item}
							onClick={() => {
								setValue(item);
								setOpen(false);
							}}
							isCurrent={isCurrent(item)}
							data-selected={isCurrent(item)}
							tabIndex={0}>
							<span>{isCurrent(item) && <BsCheck size="20" />}</span>
							{item}
							{unit}
						</Option>
					))}
				</Options>
			)}
		</Container>
	);
};

const Container = styled.div<{ width: number }>`
	position: relative;
	z-index: 10;
`;

const Trigger = styled.button<{ width: number }>`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	gap: 0.2rem;
	padding: 0.5rem 0.65rem;
	font-size: 14px;
	font-weight: 600;
	line-height: 1.2;
	border: 1px solid var(--outline-color);
	border-radius: var(--radius);
	color: var(--text-color);

	&:hover {
		outline: 2px solid var(--text-color);
		outline-offset: 2px;
	}

	@media screen and (min-width: 640px) {
		gap: 0.4rem;
		padding: 0.75rem 1.4rem;
		font-size: 16px;
	}

	@media screen and (min-width: 720px) {
		font-size: 19px;
	}
`;

const Options = styled.ul`
	position: absolute;
	top: 110%;
	border: 1px solid var(--outline-color);
	border-radius: var(--radius);
	background-color: var(--bg-color);
	overflow-y: scroll;
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */

	::-webkit-scrollbar {
		display: none;
	}
`;

const Option = styled.li<{ isCurrent: boolean }>`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	gap: 0.2rem;
	width: 100%;
	padding: 0.5rem 0.4rem 0.5rem 0.1rem;
	font-size: 15px;
	font-weight: ${({ isCurrent }) => (isCurrent ? 700 : 500)};
	color: var(--text-color);
	cursor: pointer;

	&:hover {
		background-color: var(--color-green-50);
		color: var(--color-white);
	}

	@media screen and (min-width: 640px) {
		padding: 0.5rem 1rem 0.5rem 0;
		font-size: 17px;
	}

	@media screen and (min-width: 720px) {
		font-size: 19px;
	}

	span {
		display: inline-flex;
		align-items: center;
		width: 20px;
	}
`;

export default Select;
