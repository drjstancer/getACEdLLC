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
- Stores PayPal payer-view invoice links rather than authenticated PayPal API URLs.

## Google Sheet

Spreadsheet ID:

```text
1ty6RjSSfDrrgswdhnGO5cbmhzcybKZ32hV-YmhH6Kyg
```

The Apps Script appends rows to these live tabs:

- `Primary Registrations`
- `Attendees`
- `Payment Log`

The workbook also includes:

- `Payment Summary` for formula-driven payment totals.
- `T-Shirt Summary` for formula-driven shirt counts.
- `Test Submissions` for archived testing data.
- `Settings` for reference values.

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

## Production environment variables

Before merging this feature into `main`, set the same required variables in Vercel for the `Production` environment.

For production PayPal, use:

```bash
PAYPAL_BASE_URL=https://api-m.paypal.com
PAYPAL_CLIENT_ID=<live PayPal client ID>
PAYPAL_CLIENT_SECRET=<live PayPal client secret>
```

Keep the production Apps Script URL and form secret consistent with the deployed Apps Script web app. Do not reuse sandbox PayPal credentials in production.

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
    const paymentSheet = ss.getSheetByName('Payment Log');

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

The code creates a draft invoice, sends it to the recipient, fetches invoice details, and stores the payer-view invoice link when PayPal provides one.

## Production cutover checklist

Do not merge until these are complete:

1. `Payment Summary` formulas show zero with no active registrations and update after a new live row.
2. `T-Shirt Summary` formulas show zero with no active attendees and update after a new live row.
3. All test data is archived in `Test Submissions`; live tabs start clean at row 2.
4. Vercel `Production` has all required Family Gathering variables.
5. Vercel `Production` PayPal variables use live PayPal credentials, not sandbox credentials.
6. After merge, submit one production test using Cash first.
7. After the Cash production test saves, submit one PayPal production test using a real invoice recipient.
8. Archive or delete production test rows before sharing the registration link publicly.

## Deployment notes

Preview deployments are triggered from the `agent/family-gathering-registration` branch. If the Vercel redeploy picker only shows `main`, push a harmless commit to this branch so Vercel creates a fresh preview deployment with the latest Preview environment variables.

Latest completed testing:

- Cash: passed.
- CashApp: passed.
- Money Order: passed.
- PayPal sandbox invoice: passed.
- PayPal payer-view invoice link: passed.

## Important caution

Do not commit private keys, PayPal secrets, API credentials, or form secrets to GitHub. Keep them only in the hosting provider's environment variable settings.