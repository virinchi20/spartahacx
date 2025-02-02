import { createToken } from '@/api-lib/db';
import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';
import { auths } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import axios from 'axios';

const handler = nc(ncOpts);

handler.use(...auths);

handler.post(async (req, res) => {
  if (!req.user) {
    res.json(401).end();
    return;
  }

  const localUrl = 'http://127.0.0.1:5000/items/analyze';

  try {
    const response = await axios.post(localUrl, req.formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 200 || response.status === 201) {
      // message.success('Image uploaded successfully');
      console.log('response: ', response.data);
    }
  } catch (error) {
    console.log('ERR', error);
  }

  const dummyResponse = [
    { name: 'watermelon', average_expire_days: 7 },
    { name: 'banana', average_expire_days: 5 },
    { name: 'apple', average_expire_days: 30 },
    { name: 'eggs', average_expire_days: 21 },
    { name: 'spaghetti', average_expire_days: 730 },
    { name: 'bread', average_expire_days: 7 },
  ];

  res.json(dummyResponse);
});

export default handler;
