import { ApolloServer } from "@apollo/server";

const StartGraphql = async () => {
  const server = new ApolloServer({
    typeDefs: `
      type Query {
        getdata: Boolean
      }

      type Mutation {
        _empty: String
      }
    `,
    resolvers: {
      Query: {
        getdata: () => {
          return true;
        },
      },
    },
  });

  await server.start();
  return server;
};

export default StartGraphql;
