#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { MyCdkProjectStack } from '../lib/my-cdk-project-stack.js';  // Ensure the .js extension for ES Modules

const app = new cdk.App();
new MyCdkProjectStack(app, 'MyCdkProjectStack');
