const api = (function () {
	const get = (endpoint) => {
		return fetch(endpoint).then((r) => r.json());
	};

	const post = (endpoint, data) => {
		return fetch(endpoint, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			// mode: 'no-cors',
			body: JSON.stringify(data),
		}).then((r) => r.json());
	};

	return {
		get: get,
		post: post,
	};
})();

const dataAccess = {};
dataAccess.api = api;

export default dataAccess;
