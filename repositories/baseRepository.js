import axios from "axios";

class BaseRepository {
	constructor() {
		this.http = axios.create({
			baseURL: "http://﻿130.204.36.213/backend/api/",
			headers: {
				'Authorization': null,
				'Cache-Control': 'no-cache',
				'Pragma': 'no-cache',
				'Expires': 0
			}
		});
	}
	
	get(url, params, data, headers) {
		const method = "GET";
		
		return this.http({ method, url, params, data, headers })
			.then(resp => {
				if (resp.status === 200 && resp.statusText === "OK") {
					return resp.data;
				}
				else {
					throw new Error;
				}
			});
	}
	
	post(url, data, params, headers) {
		const method = "POST";

		return this.http({ method, url, data, params, headers })
			.then(resp => {
				if (resp.status === 200 && resp.statusText === "OK") {
					return resp.data;
				}
				else {
					throw new Error;
				}
			});
	}
}
const baseRepository = new BaseRepository;

export default baseRepository;
