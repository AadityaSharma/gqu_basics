import axios from 'axios';

const db = 'http://localhost:3004';

export const Query = {
	agent: async (parent, args, context, info) => {
		const { data } = await axios.get(`${db}/users/${args.id}`);
		return data;
	},
	agents: async (parent, args, context, info) => {
		const name = args.name ? `name=${args.name}` : '';
		const age = args.age ? `age=${args.age}` : '';

		const { data } = await axios.get(`${db}/users?${name}&${age}`);
		return data;
	},
	posts: async (parent, args, context, info) => {
		const { data } = await axios.get(`${db}/posts`);
		return data;
	},
	post: async (parent, args, context, info) => {
		const { data } = await axios.get(`${db}/posts/${args.id}`);
		return data;
	},
	pictures: async (parent, args, context, info) => {
		const { data } = await axios.get(`${db}/pictures`);
		return data;
	},
};

export const Post = {
	author: async (parent, args, context, info) => {
		const { data } = await axios.get(`${db}/users/${parent.author}`);
		return data;
	},
	picture: async (parent, args, context, info) => {
		const { data } = await axios.get(`${db}/pictures/${parent.picture}`);
		return data;
	},
};

export const User = {
	posts: async (parent, args, context, info) => {
		const author = parent.id ? `author=${parent.id}` : '';
		const { data } = await axios.get(`${db}/posts?${author}`);
		return data;
	},
	pictures: async (parent, args, context, info) => {
		const { data } = await axios.get(`${db}/pictures?author=${parent.id}`);
		return data;
	},
};

export const Picture = {
	author: async (parent, args, context, info) => {
		const { data } = await axios.get(`${db}/users/${parent.author}`);
		return data;
	},
	post: async (parent, args, context, info) => {
		const { data } = await axios.get(`${db}/posts/${parent.post}`);
		return data;
	},
};
