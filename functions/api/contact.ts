interface Env {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
}

interface ContactBody {
  name: string;
  email: string;
  subject?: string;
  message: string;
  turnstileToken: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request body' }, 400);
  }

  const { name, email, subject, message, turnstileToken } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim() || !turnstileToken) {
    return json({ error: 'Missing required fields' }, 400);
  }

  // Verify Turnstile token
  const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: env.TURNSTILE_SECRET_KEY,
      response: turnstileToken,
    }),
  });

  const verificationResult = await verification.json() as { success: boolean };
  if (!verificationResult.success) {
    return json({ error: 'Bot verification failed' }, 400);
  }

  // Send email via Resend
  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'website@jcsawyer.me',
      to: 'contact@jcsawyer.me',
      reply_to: email,
      subject: subject?.trim() ? `[jcsawyer.me] ${subject.trim()}` : `[jcsawyer.me] Message from ${name}`,
      html: emailHtml({ name, email, subject, message }),
    }),
  });

  if (!emailResponse.ok) {
    return json({ error: 'Failed to send message' }, 500);
  }

  return json({ ok: true }, 200);
};

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function emailHtml({ name, email, subject, message }: Omit<ContactBody, 'turnstileToken'>): string {
  const escapedMessage = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a1a">
  <h2 style="margin:0 0 24px">New message from jcsawyer.me</h2>
  <table style="width:100%;border-collapse:collapse">
    <tr>
      <td style="padding:8px 0;font-weight:600;width:80px">Name</td>
      <td style="padding:8px 0">${name}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;font-weight:600">Email</td>
      <td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td>
    </tr>
    ${subject ? `<tr><td style="padding:8px 0;font-weight:600">Subject</td><td style="padding:8px 0">${subject}</td></tr>` : ''}
  </table>
  <hr style="border:none;border-top:1px solid #e5e5e5;margin:24px 0">
  <p style="margin:0;line-height:1.6">${escapedMessage}</p>
</body>
</html>`;
}
