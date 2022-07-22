const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const fs = require('fs')
const errors = require('../db/diagnostics.json')
// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  res.json(errors);
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  const { time, error_id, errors} = req.body
  const newEror = {
    time,
    error_id,
    errors,
  }
  const currentErrs = JSON.stringify(newEror, null, '\t')
  fs.readFile('../db/diagnostics.json', (err, res) => {
    if(err){
      console.log(err)
    }else{    
      var prevErrs = JSON.parse(res)
      prevErrs.push(newEror)
      errors = prevErrs;
      fs.writeFile('../db/diagnostics.json', JSON.stringify(errors, null, 4), (printeror) =>
        {
          printeror ? console.error(printeror) : console.info('Write Passed') 
        })
  }})
 
});
  // {
  //   "time": 1616087173408,
  //   "error_id": "249911fc-ce9d-4905-a934-745845b41c7a",
  //   "errors": {
  //     "tip:": "",
  //     "topic": "Gaming is not a valid topic",
  //     "username": ""
  //   }
module.exports = diagnostics;
