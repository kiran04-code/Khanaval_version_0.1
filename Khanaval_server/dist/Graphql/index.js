import { ApolloServer } from "@apollo/server";
import { user } from "./user/index.js";
const StartGraphql = async () => {
    const server = new ApolloServer({
        typeDefs: `
       ${user.typeDefs}
      type Query {
        ${user.query}
      }
    `,
        resolvers: {
            Query: {
                ...user.resolvers.query
            },
        },
    });
    await server.start();
    return server;
};
export default StartGraphql;
//# sourceMappingURL=index.js.map