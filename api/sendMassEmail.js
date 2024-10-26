import { supabase } from '../src/supabaseClient.js';
import { authenticateUser } from './_apiUtils.js';
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await authenticateUser(req);

    const { emailContent, leadListId } = req.body;

    if (!emailContent || !leadListId) {
      return res.status(400).json({ error: 'Email content and lead list ID are required' });
    }

    // Fetch leads from the database
    const { data: leads, error } = await supabase
      .from('leads')
      .select('email')
      .eq('list_id', leadListId)
      .eq('user_id', user.id);

    if (error) {
      throw error;
    }

    const emails = leads.map((lead) => lead.email);

    const msg = {
      to: emails,
      from: 'no-reply@leadmanager.com',
      subject: 'New Updates from LeadManager',
      html: emailContent,
    };

    await sendgrid.sendMultiple(msg);

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Error sending emails' });
  }
}