require('dotenv').config()
export const baseUrl = 'https://rp.epam.com';
export const credentials = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};
