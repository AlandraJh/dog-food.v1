const onResponce = (res) => {
	return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
	constructor({ baseUrl, token }) {
		this._token = `Bearer ${token}`;
		this._baseUrl = baseUrl;
	}

	getProductList() {
		return fetch(`${this._baseUrl}/products`, {
			headers: {
				authorization: this._token,
			},
		}).then(onResponce);
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: {
				authorization: this._token,
			},
		}).then(onResponce);
	}
	
}
// Конфиг для авторизации и получения данных с сервера
const config = {
    baseUrl:'https://api.react-learning.ru',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U4YTFmYzU5Yjk4YjAzOGY3N2I1MmUiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc2MTkwNDEwLCJleHAiOjE3MDc3MjY0MTB9.KVnqWgCtQTenWAnnDhZPDmZk8HhraKiwijWuP0W8fhU'
}

const api = new Api(config)

export default api;