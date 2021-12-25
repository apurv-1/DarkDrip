export const backend =
	process.env.NODE_ENV === 'production'
		? 'https://darkdrip.herokuapp.com/'
		: 'http://localhost:5000';
