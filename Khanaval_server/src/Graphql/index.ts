import { ApolloServer } from "@apollo/server";
import { user } from "./user/index.js";

const StartGraphql = async () => {
  const server = new ApolloServer({
    typeDefs: `
       ${user.typeDefs}
      type Query {
        ${user.query}
      }
        type Mutation {
      ${user.mutation}
     }
      `,
    resolvers: {
      Query: user.resolvers.Query,
      Mutation:user.resolvers.Mutation
    },
     introspection: true
  });

  await server.start();
  return server;
};

export default StartGraphql;
