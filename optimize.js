'use strict';

const AWS = require ('aws-sdk');
module.exports.handle = async ({Records: records}, context) => {
  try{
    await Promise.all(records.map(record =>{

    }));
    return{
      statusCode: 300,
      body: {}
    }
  } catch(err){
    return err;
  }
  
 };
