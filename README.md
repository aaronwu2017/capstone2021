# Start
```shell
$ npm install
$ npm start
```

# Off CORS on Chrome
```$ open -n -a "Google Chrome" --args --user-data-dir=/tmp/temp_chrome_user_data_dir http://localhost:3000/ --disable-web-security```

# Deploy ChatAppBackend
* This is the lambda functions and when you read serverless, there is all information in there.
```$ serverless deploy -c serverless.yml```