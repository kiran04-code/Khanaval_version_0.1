
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3003/graphql",
  documents: "src/graphql/**/*.ts",
  generates: {
    "src1/gql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
