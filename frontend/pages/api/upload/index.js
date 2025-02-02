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

  //   try {
  //     const response = await axios.post('url', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     if (response.status === 200) {
  //       message.success('Image uploaded successfully');
  //     }
  //   } catch (error) {
  //     message.error('Upload failed');
  //   }

  const dummyResponse = [
    { name: 'watermelon', average_expire_days: 7 },
    { name: 'banana', average_expire_days: 5 },
    { name: 'apple', average_expire_days: 30 },
    { name: 'eggs', average_expire_days: 21 },
    { name: 'spaghetti', average_expire_days: 730 },
    { name: 'bread', average_expire_days: 7 },
    // { name: 'canned food', average_expire_days: 365 },
    // { name: 'juice', average_expire_days: 7 },
    // { name: 'cherry tomatoes', average_expire_days: 5 },
    // { name: 'wine', average_expire_days: 3650 },
    // { name: 'milk carton', average_expire_days: 7 },
    // { name: 'cereal box', average_expire_days: 180 },
  ];

  res.json(dummyResponse);
});

export default handler;
