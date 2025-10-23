# EmailJS Setup Guide for Contact Form

This guide will help you configure EmailJS to enable the contact form functionality in your portfolio.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended):
   - **Gmail**: Select Gmail and connect your account
   - **Outlook**: Select Outlook and connect your account
   - **Custom SMTP**: Configure your own email server
4. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

### Template Configuration:
- **Template Name**: Portfolio Contact Form
- **Subject**: New Contact Form Submission from {{from_name}}
- **To Email**: 2006nareshd@gmail.com (your fixed email)

### Template Content:
```html
<h2>New Contact Form Submission</h2>

<p><strong>Submission Details:</strong></p>
<ul>
  <li><strong>Date & Time:</strong> {{submission_date}}</li>
  <li><strong>From:</strong> {{from_name}}</li>
  <li><strong>Email:</strong> {{from_email}}</li>
  <li><strong>Phone:</strong> {{from_phone}}</li>
  <li><strong>To:</strong> {{to_email}}</li>
</ul>

<p><strong>Message:</strong></p>
<div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
  {{message}}
</div>

<hr>
<p><em>This message was sent from your portfolio contact form.</em></p>
<p><strong>Reply-To:</strong> {{from_email}}</p>
```

4. Test the template and save it
5. Note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `user_abc123def456`)
3. Copy this key

## Step 5: Update Configuration

Open `src/components/ContactSection.tsx` and update the EmailJS configuration:

```typescript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_u8liggv',      // Your Service ID from Step 2
  TEMPLATE_ID: 'template_r9pbn86',    // Your Template ID from Step 3
  PUBLIC_KEY: 'omsz4yoiO7eLBLngn'    // Your Public Key from Step 4
};
```

## Step 6: Test the Form

1. Save the changes
2. Restart your development server: `npm run dev`
3. Navigate to the contact section
4. Fill out the form with test data
5. Submit and check your email

## Email Template Variables

The form sends these variables to your EmailJS template:

| Variable | Description | Example |
|----------|-------------|---------|
| `from_name` | Sender's name | "John Doe" |
| `from_email` | Sender's email | "john@example.com" |
| `from_phone` | Sender's phone | "+1 (555) 123-4567" |
| `to_email` | Your email (fixed) | "2006nareshd@gmail.com" |
| `message` | Form message | "I'd like to discuss..." |
| `submission_date` | Auto-generated timestamp | "January 15, 2025 at 10:30:00 AM EST" |
| `subject` | Auto-generated subject | "New Contact Form Submission from John Doe" |
| `reply_to` | Sender's email for replies | "john@example.com" |

## Troubleshooting

### Common Issues:

1. **400 Bad Request**: Check that all IDs are correct
2. **Unauthorized**: Verify your public key
3. **Template not found**: Ensure template ID matches
4. **Service not found**: Verify service ID

### Email Not Received:

1. Check spam/junk folder
2. Verify template configuration
3. Test with EmailJS test feature
4. Check EmailJS dashboard for sent emails

### Form Not Submitting:

1. Check browser console for errors
2. Verify all required fields are filled
3. Check network tab for API calls
4. Ensure EmailJS library is loaded

## Security Notes

- Public key is safe to expose in frontend code
- Never share your private key or account credentials
- EmailJS free tier has monthly limits (check your usage)
- Consider upgrading for high-traffic websites

## Free Tier Limits

- 200 emails per month
- EmailJS branding in emails
- Basic support

For production use, consider upgrading to a paid plan for:
- Higher email limits
- Remove EmailJS branding
- Priority support
- Advanced analytics
