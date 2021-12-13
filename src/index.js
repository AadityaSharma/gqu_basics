import { GraphQLServer } from 'graphql-yoga';
import { Query, Post, User, Picture } from './graphql/resolvers';

const db = 'http://localhost:3004';

// Scalar types

const server = new GraphQLServer({
	typeDefs: './src/graphql/schema.graphql',
	resolvers: {
		Query,
		Post,
		User,
		Picture,
	},
});

server.start(() => {
	console.log('And running running');
});
