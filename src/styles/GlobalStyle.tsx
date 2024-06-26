import { css } from '@emotion/react';

const GlobalStyle = css`
	:root {
		font-weight: 400;
		font-synthesis: none;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-text-size-adjust: 100%;

		--color-black: #191a20;
		--color-white: #fff;

		--color-gray-50: #f3f4f4;
		--color-gray-100: #f9fafb;
		--color-gray-200: #f0f1f5;
		--color-gray-300: #ecedf0;
		--color-gray-400: #ededed;
		--color-gray-500: #b8b8b8;
		--color-gray-600: #757575;
		--color-gray-700: #4b4c53;
		--color-gray-800: #2e3039;
		--color-gray-900: #1f2028;
		--color-transparent-bgColor-hover: #b1bac41f;

		--color-green-10: #46df8e60;
		--color-green-50: #46df8e;
		--color-green-100: #76e4b8;
		--color-green-200: #3fd599;
		--color-green-300: #15c47e;
		--color-green-400: #0e7b6c;

		--color-blue-100: #0687f0;
		--color-blue-200: #2272eb;
		--color-blue-300: #0164e6;

		--color-purple: #6466f1;

		--color-yellow: #ffd644;

		--color-orange-100: #ffa927;
		--color-orange-200: #fe9800;

		--color-red: #ff4545;
		--color-dark: #090b16;

		--transition-duration: 0.2;

		--radius: 0.5rem;

		--btn-sm-padding: 8px 16px;
		--btn-md-padding: 12px 20px;
		--btn-lg-padding: 16px 24px;
		--btn-font-size: 16px;

		--text-label: 18px;

		--toastify-color-success: var(--color-green-50);
		--toastify-color-error: var(--color-red);
		--toastify-font-family: 'Noto Sans KR';
	}

	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		border: 0;
		vertical-align: baseline;
		font-family: 'DM Mono', monospace;
		font-family: 'Noto Sans KR', sans-serif;
		word-break: keep-all;
		-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
	}

	body[data-theme='light'] {
		--position-left: 2px;
		--btn-text-color: var(--color-white);
		--btn-bg-color: var(--color-dark);
		--btn-hover-color: var(--color-gray-800);
		--btn-hover-bg-color: var(--color-gray-700);
		--outline-color: var(--color-gray-400);
		--table-border-color: var(--color-gray-600);
		--text-color: var(--color-dark);
		--disabled-text-color: var(--color-gray-600);
		--bg-color: var(--color-white);
		--option-hover-bg-color: var(--color-gray-200);
		--backdrop-blur-bg-color: rgb(0 0 0 / 0.15);
		--linear-gradient: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
		color: var(--color-dark);
		background-color: var(--color-white);
	}

	body[data-theme='dark'] {
		--position-left: 26px;
		--btn-text-color: var(--color-dark);
		--btn-bg-color: var(--color-white);
		--btn-hover-color: var(--color-gray-200);
		--btn-hover-bg-color: var(--color-gray-100);
		--outline-color: var(--color-gray-800);
		--table-border-color: var(--color-gray-600);
		--text-color: var(--color-white);
		--disabled-text-color: var(--color-gray-300);
		--bg-color: var(--color-dark);
		--option-hover-bg-color: var(--color-gray-700);
		--backdrop-blur-bg-color: rgb(0 0 0/ 0.4);
		--linear-gradient: linear-gradient(to right, #3a3d4a, #4b4c53, #3a3d4a);
		color: var(--color-white);
		background-color: var(--color-dark);
	}

	html {
		width: 100%;
		height: 100%;
	}

	body {
		width: 100%;
		height: 100%;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: 0;
		font-size: 1em;
		font-weight: normal;
	}

	ul,
	ol,
	li {
		padding-left: 0;
		list-style-type: none;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	a,
	button {
		cursor: pointer;
	}

	button,
	input,
	select,
	textarea {
		background-color: transparent;
		border: 0;
		&:focus {
			outline: none;
			box-shadow: none;
		}
	}

	select {
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
	}

	::-moz-selection {
		background: var(--color-green-10);
	}

	::selection {
		background: var(--color-green-10);
	}

	.underlined {
		position: relative;
		text-decoration: none !important;
		white-space: nowrap;
	}

	.underlined:focus {
		outline: none;
		text-decoration: none !important;
	}

	.underlined:after {
		content: '';
		height: 3px;
		transform: scaleX(0);
		transition: transform 0.25s ease;
		transform-origin: left;
		left: 0;
		bottom: -6px;
		width: 100%;
		display: block;
		position: absolute;
	}

	.underlined:hover:after,
	.underlined:focus:after,
	.active.underlined:after {
		background-color: currentColor;
		transform: scaleX(1);
	}

	.clip-path-button {
		clip-path: polygon(0 0, 100% 0, 100% 70%, 88% 100%, 0 100%);
	}

	@media (prefers-reduced-motion) {
		.underlined:after {
			opacity: 0;
			transition: opacity 0.25s ease;
		}

		.underlined:hover:after,
		.underlined:focus:after,
		.active.underlined:after {
			opacity: 1;
		}
	}

	.skeleton-loading {
		position: relative;
		overflow: hidden;

		@keyframes loading {
			0% {
				transform: translateX(0);
			}
			50%,
			100% {
				transform: translateX(460px);
			}
		}

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 45px;
			height: 100%;
			background: var(--linear-gradient);
			animation: loading 2s infinite linear;
		}
	}

	.report {
		break-after: page;
	}

	@media print {
		margin: 0;
		padding: 0;

		.report + .report {
			margin-top: 0;
		}

		.page-break {
			page-break-inside: avoid;
			page-break-after: auto;
		}
	}

	@page {
		size: A4;
		margin: 15mm 20mm;
	}
`;

export default GlobalStyle;
