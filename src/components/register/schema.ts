import { z } from 'zod';

export type RegisterSchema = z.infer<typeof registerSchema>;

export const registerSchema = z.object({
	workerName: z.string().nonempty('이름을 입력하세요').min(2, { message: '2자 이상의 이름을 입력해 주세요.' }),
	registrationNumberFront: z
		.string()
		.nonempty('주민번호 앞 자리를 입력해 주세요.')
		.max(6, { message: '최대 6자리까지 입력 가능합니다.' })
		.regex(/^[0-9]+$/, { message: '숫자만 입력 가능합니다.' }),
	registrationNumberBack: z
		.string()
		.nonempty('주민번호 뒷 자리를 입력해 주세요.')
		.max(7, { message: '최대 7자리까지 입력 가능합니다.' })
		.regex(/^[0-9]+$/, { message: '숫자만 입력 가능합니다.' }),
	payment: z
		.string()
		.nonempty('지급 금액을 입력해 주세요.')
		.regex(/^[0-9,]+$/, { message: '숫자만 입력 가능합니다.' }),
	remittanceType: z.string().nonempty('송금 유형을 선택해 주세요.'),
	remittance: z
		.string()
		.nonempty('송금 금액을 입력해 주세요.')
		.regex(/^[0-9,]+$/, { message: '숫자만 입력 가능합니다.' }),
	memo: z.string(),
});