export const backend =
	process.env.NODE_ENV === 'production'
		? 'http://65.2.128.34:5000'
		: 'http://localhost:5000';
