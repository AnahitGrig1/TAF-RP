import 'dotenv/config';
export const baseUrl = 'https://rp.epam.com';
export const apiBaseUrl = `${baseUrl}/api/v1/anahitrp_personal`;
export const credentials = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};
