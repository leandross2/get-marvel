import axios from 'axios';
import crypto from 'crypto';

const apiKeyPublic = 'cac37f8017a569816bc8299c33c578a4'
const apiKeyPrivate = '14c59784999aad8e0d206e4c029a86caffff52d7'
const timestamp = String(new Date().getTime())

const hash = crypto.createHash('md5').update(timestamp + apiKeyPrivate + apiKeyPublic).digest('hex');

export const credentials = `ts=${timestamp}&apikey=${apiKeyPublic}&hash=${hash}`

export const apiMarvel = axios.create({
  baseURL: `https://gateway.marvel.com/v1/public/`,
})
