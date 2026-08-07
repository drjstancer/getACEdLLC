# The Family Gathering 2026 Registration Setup

This feature adds an unlisted registration page at `/family-gathering` for The Family Gathering 2026.

## What the form does

- Collects the primary registrant's full name, age, email, phone, mailing address, and t-shirt size.
- Allows the primary registrant to add multiple additional registrants.
- Collects each additional registrant's full name, age, and t-shirt size.
- Collects different contact information for an additional registrant only when needed.
- Calculates registration cost before payment selection:
  - `$50` for ages `12 and up`
  - `$25` for registrants `under 12`
- Lets the registrant choose Cash, Money Order, CashApp, or PayPal.
- Saves registration data to the Google Sheet created for the Hill/Broom Family folder.
- Sends confirmation emails when Resend is configured.
- Attempts to create and send a PayPal invoice when PayPal is selected and credentials are configured.

## Google Sheet

Spreadsheet ID:

```text
1ty6RjSSfDrrgswdhnGO5cbmhzcybKZ32hV-YmhH6Kyg
```

The API route appends rows to these tabs:

- `Primary Registrations`
- `Attendees`
- `Payment Summary`

## Required environment variables

```bash
FAMILY_GATHERING_SPREADSHEET_ID=1ty6RjSSfDrrgswdhnGO5cbmhzcybKZ32hV-YmhH6Kyg
FAMILY_GATHERING_ADMIN_EMAIL=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
PAYPAL_BASE_URL=https://api-m.paypal.com
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
RESEND_API_KEY=
CONTACT_EMAIL=
```

## Google Sheets setup

1. Create or use a Google Cloud service account.
2. Enable the Google Sheets API for the Google Cloud project.
3. Create a private key for the service account.
4. Add the service account email and private key to the deployment environment variables.
5. Share the registration tracker spreadsheet with the service account email as an editor.

The registration endpoint writes to Google Sheets using the Sheets API `spreadsheets.values.append` method.

## PayPal setup

1. Create or use a PayPal developer app tied to get ACEd, LLC.
2. Add the app's client ID and secret to the deployment environment variables.
3. Test first with `PAYPAL_BASE_URL=https://api-m.sandbox.paypal.com`.
4. After successful test invoices, switch production to `https://api-m.paypal.com`.

The code creates a draft invoice and then sends it to the recipient. PayPal requires the send step before the invoice becomes payable.

## Important caution

Do not commit private keys, PayPal secrets, or API credentials to GitHub. Keep them only in the hosting provider's environment variable settings.
