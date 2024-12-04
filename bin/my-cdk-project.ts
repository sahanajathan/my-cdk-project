#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { MyCdkProjectStack } from '../lib/my-cdk-project-stack';

// Create the CDK app
const app = new cdk.App();

// Instantiate the stack and add it to the app
new MyCdkProjectStack(app, 'MyCdkProjectStack');
