#!/usr/bin/env node
const cdk = require('aws-cdk-lib');
const { MyCdkProjectStack } = require('../lib/my-cdk-project-stack');

const app = new cdk.App();
new MyCdkProjectStack(app, 'MyCdkProjectStack');
