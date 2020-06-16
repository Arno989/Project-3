const api = (function () {
	const get = (endpoint) => {
		return fetch(endpoint).then((r) => r.json());
	};

	const post = (endpoint, data) => {
		return fetch(endpoint, {
			method: 'post',
			body: data,
		});
	};

	return {
		get: get,
		post: post,
	};
})();

const dataAccess = {};
dataAccess.api = api;

export default dataAccess;
