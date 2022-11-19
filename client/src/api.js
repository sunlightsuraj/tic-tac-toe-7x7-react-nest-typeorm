import env from './env';
const server = env.server;
const api = {
	game: () => `${server}game`,
	play: () => `${server}game/play`,
	win: () => `${server}game/win`
}

export default api;