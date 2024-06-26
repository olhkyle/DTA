import styled from '@emotion/styled';
import { Flex } from '.';

interface LoadingProps {
	type?: 'sm' | 'md' | 'lg';
	size?: number;
	margin?: string;
}

type LoadingSvgProps = Omit<LoadingProps, 'margin'>;

const LoadingSvg = ({ type = 'md', size = 50 }: LoadingSvgProps) => (
	<Svg
		type={type}
		size={size}
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		css={{
			margin: 'auto',
			background: 'none',
			display: 'block',
			shapeRendering: 'auto',
		}}
		viewBox="0 0 100 100"
		preserveAspectRatio="xMidYMid">
		<circle cx="50" cy="50" fill="none" stroke="#46df8e" strokeWidth="7" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
			<animateTransform
				attributeName="transform"
				type="rotate"
				repeatCount="indefinite"
				dur="1s"
				values="0 50 50;360 50 50"
				keyTimes="0;1"
			/>
		</circle>
	</Svg>
);

const Loading = ({ type = 'md', size = 50, margin = '5rem 0' }: LoadingProps) => {
	return (
		<>
			{type === 'sm' ? (
				<LoadingSvg type={type} size={size} />
			) : type === 'lg' ? (
				<Flex margin="0 auto" width={100} height={100}>
					<LoadingSvg type={type} size={size} />
				</Flex>
			) : (
				<Flex justifyContent="center" alignItems="center" margin={margin}>
					<LoadingSvg type={type} size={size} />
				</Flex>
			)}
		</>
	);
};

const Svg = styled.svg<{ type: string; size: number }>`
	width: ${({ type }) => (type === 'sm' ? '16px' : type === 'md' ? '25px' : '60px')};
	height: ${({ type }) => (type === 'sm' ? '16px' : type === 'md' ? '25px' : '60px')};

	@media screen and (min-width: 640px) {
		width: ${({ size }) => `${size}px`};
		height: ${({ size }) => `${size}px`};
	}
`;

export default Loading;
