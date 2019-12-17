var axios = require('axios')
var qs = require('qs')

function parseQuery(req){
  let path = ''

  if (req.query.path){
    path = req.query.path
    delete req.query.path
  } else if (req.params) {
    path = req.params['0']
  }

  const token = req.headers.authorization

  console.log ("===Parameters===")
  console.log(req.query)
  console.log("===Path::["+path+"]")
  console.log("===Token::["+token+"]")

  const conf = {
    headers: {
      'Authorization': token
    }
  }

  return {path, conf}
}

function get(ifbConfig, req, res){
    const {path, conf} = parseQuery(req)

    const encodedUrl = 'https://'+ifbConfig.servername+'.iformbuilder.com/exzact/api/'+path+'?'+qs.stringify(req.query)
  
    console.log("==Encoded URL::["+encodedUrl+"]")
  
    axios.get(encodedUrl, conf)
    .then(response =>{
      const data = response.data
      res.json({
        data: data
      })
    })
    .catch(err=>{
      if (err.response && err.response.data) {
        console.log(err.response.data)
        res.json({
          error: err.response.data
        })  
      } else {
        res.json({
          error: err
        })  
      }

    })
  }

function _delete(ifbConfig, req, res){
  const {path, conf} = parseQuery(req)

  const encodedUrl = 'https://'+ifbConfig.servername+'.iformbuilder.com/exzact/api/'+path+'?'+qs.stringify(req.query)

  console.log("==Encoded URL::["+encodedUrl+"]")

    axios.delete(encodedUrl, conf)
    .then(response =>{
      const data = response.data
      res.json({
        data: data
      })
    })
    .catch(err=>{
        if (err.response && err.response.data) {
            console.log(err.response.data)
          res.json({
            error: err.response.data
          })  
        } else {
          res.json({
            error: err
          })  
        }
  
      })
    }

  function post(ifbConfig, req, res){
    const {path, conf} = parseQuery(req)

    conf.headers['Content-Type'] = 'application/json'
  
    const body = req.body
    console.log ("===Body===")
    console.log(body)
  
    const encodedUrl = 'https://'+ifbConfig.servername+'.iformbuilder.com/exzact/api/'+path
  
    console.log("==Encoded URL::["+encodedUrl+"]")
  
    axios.post(encodedUrl,body,conf)
    .then(response =>{
      const data = response.data
      res.json({
        data: data
      })
    })
    .catch(err=>{
        if (err.response && err.response.data) {
            console.log(err.response.data)
          res.json({
            error: err.response.data
          })  
        } else {
          res.json({
            error: err
          })  
        }
  
      })
    }

  function put(ifbConfig, req, res){
    const {path, conf} = parseQuery(req)

    conf.headers['Content-Type'] = 'application/json'
  
    const body = req.body
    console.log ("===Body===")
    console.log(body)
  
    const encodedUrl = 'https://'+ifbConfig.servername+'.iformbuilder.com/exzact/api/'+path
  
    console.log("==Encoded URL::["+encodedUrl+"]")
    
    axios.put(encodedUrl,body,conf)
    .then(response =>{
      const data = response.data
      res.json({
        data: data
      })
    })
    .catch(err=>{
        if (err.response && err.response.data) {
            console.log(err.response.data)
          res.json({
            error: err.response.data
          })  
        } else {
          res.json({
            error: err
          })  
        }
  
      })
    }


  function getToken(ifbConfig, req, res){

    const param = {
      code: req.body.code,
      access_type: 'online',
      grant_type: 'authorization_code',
      redirect_uri: req.body.redirect_uri
    }
    console.log("===Param===")
    console.log(param)
    const conf = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: ifbConfig.client_id,
        password: ifbConfig.client_secret
      }
    }
    console.log("===Conf===")
    console.log(conf)
    const url = 'https://'+ifbConfig.servername+'.iformbuilder.com/exzact/api/oauth/token'
  
    console.log("==URL::["+url+"]")
  
    axios.post(url,qs.stringify(param), conf )
    .then( response =>{
      const token = response.data
      res.json({
        success: 'get access_token succeed!',
        token: token
      })
  
    })
    .catch(err=>{
      res.json({
        error: err.data,
        token: null
      })
    })
  
  }

  module.exports = {
      getToken: getToken,
      get: get,
      post: post,
      put: put,
      delete: _delete
  }
