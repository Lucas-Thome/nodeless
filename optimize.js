'use strict';

const AWS = require ('aws-sdk'); // Importando a SDK da AWS
const sharp = require('sharp');
const {basename, extname} = require ('path')

const S3 = new AWS.S3();

module.exports.handle = async ({Records: records}, context) => {
  try{
    await Promise.all(records.map(record =>{
      const { key } = record.s3.object;

      const image = await S3.getObject({
        Bucket : Process.env.bucket,
        Key : key
      }).promise();
      const optimized = await sharp(image.body)
      .resize(1280, 720 , {fit : 'inside', withoutEnlargement: true})
      .toFormat('jpeg', {progressive: true, quality: 50})

      await S3.putObject({
        Body: optimized,
        Bucket: process.env.bucket,
        ContentType: 'image/jpeg',
        key: `compressed/${basename(key, extname(key))}`.jpg
      }).promise()
    }));
    return{
      statusCode: 300, // Status de criado
      body: {}
    }
  } catch(err){
    return err;
  }
  
 };

