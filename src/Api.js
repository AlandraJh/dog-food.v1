const onResponce = (res) => {
	return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
	constructor({ baseUrl, token }) {
        const headers = {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
		this._requestInit = {
			headers: headers,
		};
		this._baseUrl = baseUrl;
	}

	getProductList() {
		return fetch(`${this._baseUrl}/products`, this._requestInit).then(onResponce);
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, this._requestInit).then(onResponce);
	}

    search(searchQuery) {
        return fetch(
            `${this._baseUrl}/products/search?query=${searchQuery}`,
            this._requestInit
        ).then(onResponce)
    }
	
}

const config = {
    baseUrl:'https://api.react-learning.ru',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U4YTFmYzU5Yjk4YjAzOGY3N2I1MmUiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc2MTkwNDEwLCJleHAiOjE3MDc3MjY0MTB9.KVnqWgCtQTenWAnnDhZPDmZk8HhraKiwijWuP0W8fhU'
}

const api = new Api(config)

export default api;