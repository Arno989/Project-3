const api = (function () {
	const post = (endpoint, data) => {
		return fetch(endpoint, {
			method: 'POST',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json',
			},
			body: data,
		}).then((r) => r.json());
	};

	return {
		post: post,
	};
})();

const local = (function () {
	const get = (item) => {
		return JSON.parse(localStorage.getItem(item));
	};

	const set = (item, data) => {
		localStorage.setItem(item, JSON.stringify(data));
	};

	return {
		get: get,
		set: set,
	};
})();

const dataAccess = {};
dataAccess.api = api;
dataAccess.local = local;

export default dataAccess;
