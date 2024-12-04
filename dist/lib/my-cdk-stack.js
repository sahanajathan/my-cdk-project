"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyCdkStack = void 0;
const cdk = require("aws-cdk-lib");
const constructs = require("constructs");

class MyCdkStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Example resource: S3 Bucket
    new cdk.aws_s3.Bucket(this, 'MyCdkBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Only for dev/test environments
    });
  }
}

exports.MyCdkStack = MyCdkStack;
