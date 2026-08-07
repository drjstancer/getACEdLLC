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
- Saves registration data to the Google Sheet created for the Hill/Broom Family folder through an Apps Script web app.
- Sends confirmation emails when Resend is configured.
- Attempts to create and send a PayPal invoice when PayPal is selected and credentials are configured.

## Google Sheet

Spreadsheet ID:

```text
1ty6RjSSfDrrgswdhnGO5cbmhzcybKZ32hV-YmhH6Kyg
```

The Apps Script appends rows to these tabs:

- `Primary Registrations`
- `Attendees`
- `Payment Summary`

## Required environment variables

```bash
FAMILY_GATHERING_SPREADSHEET_ID=1ty6RjSSfDrrgswdhnGO5cbmhzcybKZ32hV-YmhH6Kyg
FAMILY_GATHERING_ADMIN_EMAIL=
FAMILY_GATHERING_CONTACT_EMAIL=
FAMILY_GATHERING_APPS_SCRIPT_URL=
FAMILY_GATHERING_FORM_SECRET=
PAYPAL_BASE_URL=https://api-m.sandbox.paypal.com
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
RESEND_API_KEY=
```

`CONTACT_EMAIL` can remain available for the general website contact form. The Family Gathering registration flow uses `FAMILY_GATHERING_ADMIN_EMAIL` first and `FAMILY_GATHERING_CONTACT_EMAIL` as the fallback.

## Google Apps Script setup

Because some Google organizations block service account JSON key creation, this registration flow uses a Google Apps Script web app instead of a service account private key.

1. Open the registration tracker spreadsheet.
2. Go to `Extensions` → `Apps Script`.
3. Add the Apps Script code below.
4. In Apps Script, go to `Project Settings` → `Script Properties`.
5. Add a script property named `FAMILY_GATHERING_FORM_SECRET`.
6. Use the same secret value in Vercel as `FAMILY_GATHERING_FORM_SECRET`.
7. Deploy the script as a web app:
   - Execute as: `Me`
   - Who has access: `Anyone`
8. Copy the web app URL into Vercel as `FAMILY_GATHERING_APPS_SCRIPT_URL`.

```javascript
const SPREADSHEET_ID = '1ty6RjSSfDrrgswdhnGO5cbmhzcybKZ32hV-YmhH6Kyg';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const expectedSecret = PropertiesService
      .getScriptProperties()
      .getProperty('FAMILY_GATHERING_FORM_SECRET');

    if (!expectedSecret || body.secret !== expectedSecret) {
      return jsonResponse({
        success: false,
        error: 'Unauthorized request.'
      });
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const primarySheet = ss.getSheetByName('Primary Registrations');
    const attendeesSheet = ss.getSheetByName('Attendees');
    const paymentSheet = ss.getSheetByName('Payment Summary');

    const registration = body.registration;
    const attendees = body.attendees || [];

    primarySheet.appendRow([
      registration.submittedAt,
      registration.registrationId,
      registration.primaryFullName,
      registration.primaryAge,
      registration.primaryEmail,
      registration.primaryPhone,
      registration.primaryAddress,
      registration.primaryTShirtSize,
      registration.attendeeCount,
      registration.totalCost,
      registration.paymentMethod,
      registration.paymentStatus,
      registration.paymentInstructions,
      registration.paypalInvoiceId || '',
      registration.paypalInvoiceUrl || '',
      registration.notes || '',
      registration.source || 'Website'
    ]);

    attendees.forEach((attendee) => {
      attendeesSheet.appendRow([
        registration.submittedAt,
        registration.registrationId,
        attendee.type,
        attendee.fullName,
        attendee.age,
        attendee.price,
        attendee.tShirtSize,
        attendee.contactName,
        attendee.contactEmail,
        attendee.contactPhone,
        registration.paymentMethod
      ]);
    });

    paymentSheet.appendRow([
      registration.submittedAt,
      registration.registrationId,
      registration.primaryFullName,
      registration.primaryEmail,
      registration.paymentMethod,
      registration.totalCost,
      registration.paymentStatus,
      registration.paymentInstructions
    ]);

    return jsonResponse({
      success: true,
      registrationId: registration.registrationId
    });

  } catch (error) {
    return jsonResponse({
      success: false,
      error: error.message
    });
  }
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function testAccess() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  Logger.log(ss.getName());
}
```

## PayPal setup

1. Create or use a PayPal developer app tied to get ACEd, LLC.
2. Add the app's client ID and secret to the deployment environment variables.
3. Test first with `PAYPAL_BASE_URL=https://api-m.sandbox.paypal.com`.
4. After successful test invoices, switch production to `https://api-m.paypal.com`.

The code creates a draft invoice and then sends it to the recipient. PayPal requires the send step before the invoice becomes payable.

## Deployment notes

Preview deployments are triggered from the `agent/family-gathering-registration` branch. If the Vercel redeploy picker only shows `main`, push a harmless commit to this branch so Vercel creates a fresh preview deployment with the latest Preview environment variables.

Last forced preview refresh: 2026-08-07 00:09 Central.

## Important caution

Do not commit private keys, PayPal secrets, API credentials, or form secrets to GitHub. Keep them only in the hosting provider's environment variable settings.