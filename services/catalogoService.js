const axios = require('axios');
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
const { data } = require('./dataSource');
const baseUrl = 'https://simple.ripley.cl/api/v2/products';

exports.buscarCatalogo = async () => {
  const result = [];

  for (let sku of data) {
    const res = await hacerPeticion(sku);
    result.push(res); 
  }

  return result;
};

exports.buscarProducto = async (sku) => {
  return hacerPeticion(sku);
};


const hacerPeticion = async (sku) => {
  const options = {
    url: process.env.REDIS_URL
  };

  const client = (process.env.REDIS_URL) ? redis.createClient(options) : redis.createClient();

  try {
    if (getRandomInt(0, 99) < 10) {
      console.log("Error 10%");
      throw new Error();
    }

    const redisData = await client.getAsync(sku);

    if (redisData) {
      console.log('obteniendo data desde redis');
      return JSON.parse(redisData);
    } else {
      console.log('obteniendo data desde api');
      const res = await axios.get(`${baseUrl}/${sku}`);
      client.set(sku, JSON.stringify(res.data), 'EX', 60);
      return res.data;
    }
  } catch (error) {
    console.log("REINTENTO DE ERROR " + error);
    return hacerPeticion(sku);
  } finally {
    client.quit();
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}