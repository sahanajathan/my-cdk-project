import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';

export class MyCdkProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 Bucket
    const bucket = new s3.Bucket(this, 'MyUniqueBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,  // Only for dev/test, removes on stack delete
    });

    // Create Lambda function
    const lambdaFunction = new lambda.Function(this, 'MyLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'),  // Path to lambda function code
    });

    // Give Lambda access to the S3 bucket
    bucket.grantReadWrite(lambdaFunction);

    // Create IAM Role for Lambda
    const role = new iam.Role(this, 'LambdaExecutionRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    // Attach role to the Lambda function
    lambdaFunction.role?.attachInlinePolicy(new iam.Policy(this, 'LambdaPolicy', {
      statements: [
        new iam.PolicyStatement({
          actions: ['s3:*'],
          resources: [bucket.bucketArn],
        }),
      ],
    }));
  }
}
