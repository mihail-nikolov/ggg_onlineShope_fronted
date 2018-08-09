import axios from "axios";

class BaseRepository {
	constructor() {
		this.http = axios.create({
			baseURL: "http://﻿130.204.36.213/api/"
		});
	}
	
	get(url, params) {
		const method = "GET";

		return this.http({ method, url, params })
			.then(resp => {
				if (resp.status === 200 && resp.statusText === "OK") {
					return resp.data;
				}
				else {
					throw new Error;
				}
			});
	}
	
	post(url, data, params) {
		const method = "POST";

		return this.http({ method, url, data, params })
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
