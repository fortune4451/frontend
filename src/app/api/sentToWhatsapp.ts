import type { NextApiRequest, NextApiResponse } from 'next';
import FormData from 'form-data';
import fetch from 'node-fetch';

const WHATSAPP_API_URL = 'https://api.example.com/send-whatsapp'; // Replace with your WhatsApp API URL
const WHATSAPP_API_KEY = 'your-whatsapp-api-key'; // Replace with your API key

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const form = new FormData();
      form.append('file', req.body.file); // Add the file
      form.append('number', '+2349025216633'); // WhatsApp number
      form.append('details', req.body.details); // User details

      const response = await fetch(WHATSAPP_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_API_KEY}`,
        },
        body: form,
      });

      if (response.ok) {
        res.status(200).json({ message: 'Message sent successfully' });
      } else {
        res.status(response.status).json({ message: 'Failed to send message' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
