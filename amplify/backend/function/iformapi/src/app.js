/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

var iformapi = require('./iformapi-lambda')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

const client_id = process.env.IFORM_CLIENT_ID
const client_secret = process.env.IFORM_CLIENT_SECRET
const servername = process.env.IFORM_SERVER_NAME

const ifbConfig = {
  client_id: client_id,
  client_secret: client_secret,
  servername: servername
}

console.log("Client_ID:"+client_id)
console.log("Client_Secret:"+client_secret)
console.log("Servername:"+servername)

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  next()
});

// Process Servername 
app.use(function(req, res, next) {
  const s = req.headers['ifb-servername']
  if (s){
    console.log("servername:"+s)
    ifbConfig.servername = s
  }

  next()
});


app.get('/echo', function(req,res){
  res.json({    success: 'get call succed!', url: req.url  })
})

app.get('/api/*', function(req,res){
  iformapi.get(ifbConfig, req, res)
});

app.post('/api/*', function(req,res){
  iformapi.post(ifbConfig, req, res)
});

app.put('/api/*', function(req,res){
  iformapi.put(ifbConfig, req, res)
});

app.delete('/api/*', function(req,res){
  iformapi.delete(ifbConfig, req, res)
});

app.post('/token', function(req,res){
  iformapi.getToken(ifbConfig, req, res)
});



app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
