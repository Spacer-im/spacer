#!/bin/bash
#

set -e

export PATH="$PATH:/usr/local/bin"

usage()
{
cat << EOF
usage: $0 options

This Script Dumps All Mongo Databases, Tars Them And Sends Them To Am Amazon S3 Bucket

OPTIONS:
   -k      AWS Access Key
   -s      AWS Secret Key
   -r      S3 Region
   -b      S3 Bucket Name
   -f      S3 Folder Name / Tree
EOF
}

AWS_ACCESS_KEY="AKIAIYO5I5IMULNEUGUA"
AWS_SECRET_KEY="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"
S3_REGION="us-east-1"
S3_BUCKET="spacerstore"
S3_FOLDER="backups"

while getopts "ht:k:s:r:b:f:" OPTION
do
  case $OPTION in
    h)
      usage
      exit 1
      ;;
    k)
      AWS_ACCESS_KEY=$OPTARG
      ;;
    s)
      AWS_SECRET_KEY=$OPTARG
      ;;
    r)
      S3_REGION=$OPTARG
      ;;
    b)
      S3_BUCKET=$OPTARG
      ;;
    f)
      S3_FOLDER=$OPTARG
      ;;
    ?)
      usage
      exit
    ;;
  esac
done

if [[ -z $AWS_ACCESS_KEY ]] || [[ -z $AWS_SECRET_KEY ]] || [[ -z $S3_REGION ]] || [[ -z $S3_BUCKET ]] || [[ -z $S3_FOLDER ]]
then
  usage
  exit 1
fi

# Get CWD
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo $DIR
DATE=$(date -u "+%F-%H%M%S")
FILE_NAME="backup-$DATE"
ARCHIVE_NAME="$FILE_NAME.tar.gz"

# Dump All Databases And Tar Them
mongodump --out $DIR/backup/$FILE_NAME
tar -C $DIR/backup/ -zcvf $DIR/backup/$ARCHIVE_NAME $FILE_NAME/

#Remove Temp Files
rm -r $DIR/backup/$FILE_NAME

#Build S3 Request + Signature
HEADER_DATE=$(date -u "+%a, %d %b %Y %T %z")
CONTENT_MD5=$(openssl dgst -md5 -binary $DIR/backup/$ARCHIVE_NAME | openssl enc -base64)
CONTENT_TYPE="application/x-tar"
STRING_TO_SIGN="PUT\n$CONTENT_MD5\n$CONTENT_TYPE\n$HEADER_DATE\n/$S3_BUCKET/$S3_FOLDER/$ARCHIVE_NAME"
SIGNATURE=$(echo -e -n $STRING_TO_SIGN | openssl dgst -sha1 -binary -hmac $AWS_SECRET_KEY | openssl enc -base64)

#Upload To S3
curl -X PUT \
--header "Host: $S3_BUCKET.s3.amazonaws.com" \
--header "Date: $HEADER_DATE" \
--header "content-type: $CONTENT_TYPE" \
--header "Content-MD5: $CONTENT_MD5" \
--header "Authorization: AWS $AWS_ACCESS_KEY:$SIGNATURE" \
--upload-file $DIR/backup/$ARCHIVE_NAME \
https://$S3_BUCKET.s3.amazonaws.com/$S3_FOLDER/$ARCHIVE_NAME