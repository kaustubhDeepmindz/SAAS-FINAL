/* eslint-disable @typescript-eslint/no-var-requires */
import * as tsNode from 'ts-node';
import { register } from 'tsconfig-paths';

// Register ts-node
tsNode.register({
  transpileOnly: true, // Improve startup performance by skipping type checking
});

// Register tsconfig-paths to handle path aliases from tsconfig.json
const tsConfig = require('./tsconfig.json');
register({
  baseUrl: tsConfig.compilerOptions.baseUrl,
  paths: tsConfig.compilerOptions.paths,
});

// Load and start your main TypeScript file
import * as path from 'path';
const mainFile = path.resolve(__dirname, './apps/auth-services/src/main.ts'); // Replace with your main TypeScript file
require(mainFile);