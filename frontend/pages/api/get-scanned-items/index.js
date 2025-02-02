import { createToken } from '@/api-lib/db';
import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';
import { auths } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import axios from 'axios';

const handler = nc(ncOpts);

handler.use(...auths);

handler.get(async (req, res) => {
  if (!req.user) {
    res.json(401).end();
    return;
  }

  try {
    const response = await axios.get("http://127.0.0.1:5000/items/user/benwingeorge"); // Example API
    console.log('response: ', response.data);

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

export default handler;
