import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class MyCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Example resource: S3 Bucket
    new cdk.aws_s3.Bucket(this, 'MyCdkBucket');
  }
}
