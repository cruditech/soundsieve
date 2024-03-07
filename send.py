import argparse
import sys
import os

import boto3
import dotenv

dotenv.load_dotenv()

# Create a session with your AWS credentials
session = boto3.Session(
    aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
    aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    region_name='us-east-1'  # or your preferred region
)

# Create an SQS client
sqs = session.client('sqs')

# URL of your SQS queue
queue_url = 'https://sqs.us-east-1.amazonaws.com/106022474758/SieveQueue'

if __name__ == '__main__':

    # Create the parser
    parser = argparse.ArgumentParser(description="Process some integers.")

    # Add arguments
    parser.add_argument('-f', '--file', type=int, help='File name to parse.')
    parser.add_argument('-m', '--message', type=int, help='Message')

    # Parse the arguments
    args = parser.parse_args()
    response = sqs.send_message(
        QueueUrl=queue_url,
        DelaySeconds=10,
        MessageAttributes={
            'File': {
                'DataType': 'String',
                'StringValue': args.file or "Empty file"
            },
            'Extract': {
                'DataType': 'Number',
                'StringValue': '6'
            }
        },
        MessageBody=(
            args.message or "Empty message"
        )
    )

    print("MessageId:", response['MessageId'])
