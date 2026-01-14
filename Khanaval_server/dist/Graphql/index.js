import { ApolloServer } from "@apollo/server";
import { user } from "./user/index.js";
import { Provider } from "./Provider/index.js";
const StartGraphql = async () => {
    const server = new ApolloServer({
        typeDefs: `
       ${user.typeDefs}
       ${Provider.typeDefs}
      type Query {
        ${user.query}
        ${Provider.query}
      }
        type Mutation {
      ${user.mutation}
      ${Provider.mutation}
     }
      `,
        resolvers: {
            Query: {
                ...user.resolvers.Query,
                ...Provider.resolvers.Query
            },
            Mutation: {
                ...user.resolvers.Mutation,
                ...Provider.resolvers.Mutation
            }
        },
        introspection: true
    });
    await server.start();
    return server;
};
export default StartGraphql;
//# sourceMappingURL=index.js.map