import { GraphQLServer } from 'graphql-yoga';
import axios from 'axios';

const db = 'http://localhost:3004';

// Scalar types

const server = new GraphQLServer({
	typeDefs: `
    type Query {
      agent(id: ID!): User!
      agents(name: String, age: Int): [User!]!
      posts: [Post!]!
      post(id: ID!): Post!
      pictures: [Picture!]!
    }

    type Picture {
      id: ID!
      path: String!
      author: User!
      post: Post!
    }
    
    type User {
      id: ID!
      name: String
      age: Int
      married: Boolean
      average: Float
      posts: [Post]!
      pictures: [Picture!]!
    }

    type Post {
      id: ID!
      title: String!
      content: String!
      author: User!
      picture: Picture!
    }
  `,
	resolvers: {
		Query: {
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
		},
		Post: {
			author: async (parent, args, context, info) => {
				const { data } = await axios.get(`${db}/users/${parent.author}`);
				return data;
			},
			picture: async (parent, args, context, info) => {
				const { data } = await axios.get(`${db}/pictures/${parent.picture}`);
				return data;
			},
		},
		User: {
			posts: async (parent, args, context, info) => {
				const author = parent.id ? `author=${parent.id}` : '';
				const { data } = await axios.get(`${db}/posts?${author}`);
				return data;
			},
			pictures: async (parent, args, context, info) => {
				const { data } = await axios.get(`${db}/pictures?author=${parent.id}`);
				return data;
			},
		},
		Picture: {
			author: async (parent, args, context, info) => {
				const { data } = await axios.get(`${db}/users/${parent.author}`);
				return data;
			},
			post: async (parent, args, context, info) => {
				const { data } = await axios.get(`${db}/posts/${parent.post}`);
				return data;
			},
		},
	},
});

server.start(() => {
	console.log('And running running');
});
