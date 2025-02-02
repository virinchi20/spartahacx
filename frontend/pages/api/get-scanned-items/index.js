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

  // try {
  //   const response = await axios.get(
  //     'https://jsonplaceholder.typicode.com/posts/1'
  //   ); // Example API
  //   console.log("response: ", response);
    
  //   res.status(200).json(response.data);
  // } catch (error) {
  //   res.status(500).json({ error: 'Failed to fetch data' });
  // }

  const dummyResponse = [
    { key: '1', name: 'Item 1', expirationDate: '2025-02-15' },
    { key: '2', name: 'Item 2', expirationDate: '2025-03-01' },
    { key: '3', name: 'Item 3', expirationDate: '2025-04-10' },
    { key: '4', name: 'Item 4', expirationDate: '2025-02-05' },
    { key: '5', name: 'Item 5', expirationDate: '2025-05-20' },
  ];
  res.json(dummyResponse);
});

export default handler;
