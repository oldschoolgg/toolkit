import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		name: 'Oldschoolgg Toolkit',
		include: ['tests/*.test.ts'],
		coverage: {
			provider: 'c8',
			reporter: ['text'],
			functions: 100,
			lines: 100,
			statements: 100,
			branches: 100
		}
	}
});
