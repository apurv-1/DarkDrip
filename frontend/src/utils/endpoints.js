export const backend =
	process.env.NODE_ENV === 'production'
		? ''
		: 'http://localhost:5000';
