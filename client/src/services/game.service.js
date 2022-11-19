import axios from 'axios';
import api from "../api";

export const createNewSession = async () => {
	try {
		let { data } = await axios.post(api.game(), {})
		return data;
	} catch (err) {
		console.error(err);
		return Promise.reject("Error!");
	}
}

export const saveGamePlay = async (params) => {
	try {
		let { data } = await axios.post(api.play(), params)
		console.log(data);
	} catch (err) {
		console.error(err);
		return Promise.reject("Save gamplay error!");
	}
}

export const saveWinner = async (params) => {
	try {
		let { data } = await axios.post(api.win(), params)
		console.log(data);
	} catch (err) {
		console.error(err);
		return Promise.reject("Save winner error!");
	}
}