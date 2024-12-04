import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';

export class MyCdkProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an S3 bucket
    const myBucket = new s3.Bucket(this, 'MyUniqueBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Be careful with this in production
      autoDeleteObjects: true, // Only use this in development for auto-cleanup
    });

    // Create an IAM role for the Lambda function
    const lambdaRole = new iam.Role(this, 'MyLambdaExecutionRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess'), // Permissions to read from S3
      ],
    });

    // Create a Lambda function
    const myLambda = new lambda.Function(this, 'MyLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_18_X, // Choose runtime as needed
      code: lambda.Code.fromAsset('lambda'), // Directory containing your Lambda code
      handler: 'index.handler', // Adjust handler based on your code
      role: lambdaRole,
      environment: {
        BUCKET_NAME: myBucket.bucketName, // Pass bucket name as an environment variable
      },
    });

    // Output the bucket name and Lambda function name for easy reference
    new cdk.CfnOutput(this, 'BucketName', {
      value: myBucket.bucketName,
      description: 'The name of the S3 bucket',
    });

    new cdk.CfnOutput(this, 'LambdaFunctionName', {
      value: myLambda.functionName,
      description: 'The name of the Lambda function',
    });
  }
}

// Entry point for the CDK app
const app = new cdk.App();
new MyCdkProjectStack(app, 'MyCdkProjectStack');
