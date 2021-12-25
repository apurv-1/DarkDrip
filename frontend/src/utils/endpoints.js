export const backend =
	process.env.NODE_ENV === 'production'
		? 'https://darkdrip.herokuapp.com:5000'
		: 'http://localhost:5000';
