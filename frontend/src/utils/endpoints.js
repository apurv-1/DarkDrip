export const backend =
	process.env.NODE_ENV === 'production'
		? 'http://3.110.32.242:5000'
		: 'http://localhost:5000';
