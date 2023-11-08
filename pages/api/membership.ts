import { NextApiRequest, NextApiResponse } from 'next';

export default async function membership(req: NextApiRequest, res: NextApiResponse) {
  // get submitted form data from request body
  const body = JSON.parse(req.body());

  res.status(200).json({ body });

}
