import { GraphQLServer } from 'graphql-yoga';

// Scalar types

const server = new GraphQLServer({
	typeDefs: `
    type Query {
      id: ID!
      name: String
      age: Int
      married: Boolean
      average: Float
    }
  `,
	resolvers: {
		Query: {
			id() {
				return 1;
			},
			name() {
				return 'Aaditya';
			},
			age() {
				return 30;
			},
			married() {
				return true;
			},
			average() {
				return 1.07;
			},
		},
	},
});

server.start(() => {
	console.log('And running running');
});
