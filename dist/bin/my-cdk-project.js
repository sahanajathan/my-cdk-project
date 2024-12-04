#!/usr/bin/env node
const { App } = require('aws-cdk-lib');
const { MyCdkStack } = require('../lib/my-cdk-stack.js');  // Import your stack

const app = new App();
new MyCdkStack(app, 'MyCdkStack');
