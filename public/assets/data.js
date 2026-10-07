// Single source of truth for the policies site.
// Edit this file to change any fact; every page reads from here at load time.
window.ANIMOCENTRIC_DATA = {
  entity: {
    legalName: "Animocentric LLP",
    shortName: "Animocentric",
    entityType: "Limited Liability Partnership registered in India",
    address: "301, Plot 16, CBCID Colony, Hydernagar, Hyderabad, Telangana, India 500085",
    email: "support@animocentric.com",
    phone: "9000102094",
    domain: "animocentric.com/policies",
    effectiveDate: "October 7, 2026",
    jurisdictionCity: "Hyderabad",
    jurisdictionState: "Telangana",
    governingLawNote:
      "This policy is governed primarily by India's Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology Act, 2000, and any dispute is subject to the exclusive jurisdiction of the courts described below, regardless of where you access the Service from. If you are located in the United Kingdom, the European Economic Area, or the State of California, the additional rights set out in \"International users\" below also apply to you and take precedence over this paragraph wherever they conflict with it.",
    thirdParties: {
      razorpay: {
        name: "Razorpay Software Private Limited",
        purpose:
          "processing clinic subscription payments for clinics billed in Indian Rupees, and, where applicable, routing platform-fee payouts to clinics (Razorpay Route)",
        url: "https://razorpay.com/privacy/",
      },
      stripe: {
        name: "Stripe",
        purpose:
          "processing pet-owner payments for clinic invoices and bills, and processing clinic subscription payments for clinics billed in a currency other than Indian Rupees",
        url: "https://stripe.com/privacy",
      },
      firebase: {
        name: "Google Firebase Cloud Messaging",
        purpose: "delivering push notifications to the mobile app",
        url: "https://firebase.google.com/support/privacy",
      },
      resend: {
        name: "Resend",
        purpose:
          "delivering transactional email (including OTP login codes) when our primary mailbox is unavailable",
        url: "https://resend.com/legal/privacy-policy",
      },
      hostinger: {
        name: "Hostinger",
        purpose: "hosting our servers, application, and email mailbox",
        url: "https://www.hostinger.com/privacy-policy",
      },
      r2: {
        name: "Cloudflare (R2 object storage)",
        purpose:
          "storing uploaded files such as clinic documents, vet signatures, case-sheet attachments, and pet photos",
        url: "https://www.cloudflare.com/privacypolicy/",
      },
      googleMaps: {
        name: "Google Maps",
        purpose:
          "opening a map in your browser or device when you tap an emergency-clinic or address link (we do not embed Google Maps or share your data with Google for this feature)",
        url: "https://policies.google.com/privacy",
      },
    },
  },

  apps: [
    {
      key: "client-website",
      name: "Animocentric Web Platform",
      tagline: "Clinic staff portal and pet-owner portal (web)",
      platform: "Web application, accessed by browser",
      persona: "Veterinary clinic staff and pet owners",
      audience: "public",
      description:
        "The Web Platform is the primary product: veterinary clinics use it to manage appointments, medical records, billing, and staff, and pet owners use it to book appointments, view their pet's records, pay bills, and message their clinic.",
      dataCollected: [
        {
          heading: "Account & identity",
          items: [
            "Name, email address, and phone number",
            "Your role (clinic staff or pet owner) and clinic association",
            "Login access is via a one-time passcode (OTP) sent to your registered email address — we do not currently use SMS for login codes",
          ],
        },
        {
          heading: "Clinic data (for clinic staff accounts)",
          items: [
            "Clinic profile, branding and logo, staff roster",
            "Subscription and billing status",
            "Examining-veterinarian details recorded on certificates you issue",
          ],
        },
        {
          heading: "Pet and health data (for pet-owner accounts, and as entered by clinic staff)",
          items: [
            "Pet profiles: name, species, breed, age, and photos",
            "Medical and vaccination records, case sheets, prescriptions, and issued certificates",
            "Appointment history and invoices/billing records",
          ],
        },
        {
          heading: "Communications",
          items: [
            "Messages sent through the in-portal Ask-a-Vet chat",
            "Appointment reminders and support requests",
          ],
        },
        {
          heading: "Payment data",
          items: [
            "We do not store your full card or bank account details. Payments are processed directly by Razorpay and Stripe; we retain only the resulting transaction status and reference ID. Clinic subscription payments are billed via Razorpay (Indian Rupees) or Stripe (other currencies) depending on the clinic's own billing currency. Pet-owner bill payments are processed via Stripe",
          ],
        },
        {
          heading: "Technical data",
          items: [
            "Browser type, IP address, and login/session timestamps",
            "Web-push subscription details, if you enable browser notifications",
          ],
        },
      ],
      permissions: [],
      thirdParties: ["razorpay", "stripe", "resend", "hostinger", "r2", "googleMaps"],
      specificNotes: [
        "If you enable browser notifications, we use the standard Web Push protocol (delivered through your browser vendor, e.g. Google Chrome or Mozilla Firefox) to send alerts; this is not used to track you across other websites.",
        "The Emergency page available to pet owners links out to Google Maps in a new browser tab. This only happens when you click the link, and Google's own privacy policy governs that destination page.",
      ],
      terms: {
        natureOfService:
          "The Web Platform lets veterinary clinics manage appointments, medical records, billing, and staff, and lets pet owners book appointments, view their pet's records, pay bills, and message their clinic.",
        payments:
          "Clinics subscribe to a paid plan to access the Web Platform's clinic-management features, billed via Razorpay for clinics billed in Indian Rupees, or via Stripe for clinics billed in another currency. Pet owners may be billed by their clinic for veterinary services rendered; these payments are processed via Stripe. Animocentric LLP does not set the price of veterinary services — pricing for clinical services is determined by each independent clinic.",
        paidFeature:
          "Ask-a-Vet chat may be offered as a paid, timed consultation. The consultation timer begins when the assigned veterinarian sends their first reply. Fees are charged in advance and are non-refundable once the veterinarian has responded to your consultation, except where required by applicable law.",
        marketplace:
          "Where Animocentric LLP facilitates payouts to clinics through Razorpay Route, Animocentric LLP acts solely as a payment facilitator and deducts an agreed platform fee from the transaction. Animocentric LLP is not a party to, and assumes no responsibility for, the underlying veterinary-services contract between a clinic and a pet owner.",
      },
    },
    {
      key: "admin-website",
      name: "Animocentric Admin Panel",
      tagline: "Internal platform-administration console",
      platform: "Web application, accessed by browser on a restricted admin subdomain",
      persona: "Authorized Animocentric LLP personnel only",
      audience: "internal",
      description:
        "The Admin Panel is used internally by Animocentric LLP staff to operate the platform — managing clinic accounts, subscription plans, support, and platform-wide oversight. It is not intended for use by clinics or pet owners, and this policy governs only the personnel who use it.",
      dataCollected: [
        {
          heading: "Administrator account data",
          items: [
            "Name, email address, phone number, and role/permission level",
            "Login access is via a one-time passcode (OTP) sent to your registered email address",
          ],
        },
        {
          heading: "Operational records",
          items: [
            "Clinic account status, subscription and transaction records already created through the Web Platform",
            "Support tickets and platform activity/audit logs",
          ],
        },
      ],
      permissions: [],
      thirdParties: ["resend", "hostinger"],
      specificNotes: [
        "The Admin Panel does not independently collect payment card data or process payments. It displays subscription and transaction records already created through the Web Platform via Razorpay and Stripe, for administrative and support purposes only.",
        "Access to the Admin Panel is restricted to individuals authorized by Animocentric LLP. If you are a clinic or pet-owner user, this policy does not apply to your use of the Web Platform, Animopractice, Petfolio, or Animo Helper — please refer to that product's policy instead.",
      ],
      terms: {
        natureOfService:
          "The Admin Panel is an internal operations tool for Animocentric LLP personnel and is not offered to the public.",
        payments: null,
        paidFeature: null,
        marketplace: null,
      },
    },
    {
      key: "animopractice",
      name: "Animopractice",
      tagline: "Mobile app for veterinary clinic staff (Android)",
      platform: "Native Android application",
      persona: "Veterinary clinic staff",
      audience: "public",
      description:
        "Animopractice is the mobile companion to the Web Platform for clinic staff, providing access to appointments, pet records, vaccinations, certificates, inventory, and clinic billing from a mobile device, using the same account and data as the Web Platform.",
      dataCollected: [
        {
          heading: "Account & identity",
          items: [
            "Name, email address, phone number, role, and clinic association",
            "Sign-in uses your password plus a one-time passcode (OTP) sent to your registered email address",
          ],
        },
        {
          heading: "Clinic and pet-record data",
          items: [
            "The same clinic, staff, and pet medical-record data described in the Web Platform policy, where it is entered or viewed through this app",
          ],
        },
        {
          heading: "Device data",
          items: ["A device push-notification token, used to deliver appointment and message alerts"],
        },
      ],
      permissions: [
        { name: "Internet access", why: "required to communicate with our servers" },
        { name: "Notifications", why: "to show appointment and message alerts delivered via push notification" },
        {
          name: "Camera / photo access",
          why: "if you choose to attach a photo to a pet record or document from within the app",
        },
      ],
      thirdParties: ["firebase", "resend", "r2", "hostinger"],
      specificNotes: [
        "Animopractice uses Firebase Cloud Messaging (a Google service) to deliver push notifications to your device. This requires sending a device push token to Google's servers so notifications can be routed to your device; Google's handling of this token is governed by Google's own privacy policy, linked below.",
        "Animopractice does not sell anything in the app and does not collect payment card details. Clinic subscriptions are managed on the Animocentric web platform, under the Web Platform's terms.",
      ],
      terms: {
        natureOfService:
          "Animopractice provides clinic staff with mobile access to appointment, pet-record, certificate, and billing tools connected to the same account and data as the Web Platform.",
        payments:
          "The app does not offer in-app purchases. Clinic subscriptions are purchased and managed on the Web Platform, and the Web Platform's subscription terms apply.",
        paidFeature: null,
        marketplace: null,
      },
    },
    {
      key: "petfolio",
      name: "Petfolio",
      tagline: "Mobile app for pet owners (Android)",
      platform: "Native Android application",
      persona: "Pet owners",
      audience: "public",
      description:
        "Petfolio lets pet owners manage their pets' health records, book appointments, message their clinic, and pay bills from a mobile device, using the same account and data as the Web Platform.",
      dataCollected: [
        {
          heading: "Account & identity",
          items: [
            "Name, email address, and phone number",
            "Login access is via a one-time passcode (OTP) sent to your registered email address — we do not currently send OTPs by SMS",
          ],
        },
        {
          heading: "Pet and health data",
          items: [
            "Pet profiles: name, species, breed, age, and photos",
            "Medical and vaccination records, appointment history, invoices, and issued certificates for your pets",
          ],
        },
        { heading: "Communications", items: ["Messages sent through the Ask-a-Vet chat feature"] },
        {
          heading: "Device data",
          items: ["A device push-notification token, used to deliver appointment and message alerts"],
        },
      ],
      permissions: [
        { name: "Internet access", why: "required to communicate with our servers" },
        { name: "Notifications", why: "to show appointment and message alerts delivered via push notification" },
        { name: "Camera / photo access", why: "if you choose to upload a photo of your pet" },
      ],
      thirdParties: ["firebase", "stripe", "resend", "r2", "googleMaps", "hostinger"],
      specificNotes: [
        "Petfolio uses Firebase Cloud Messaging (a Google service) to deliver push notifications, which requires sending a device push token to Google's servers.",
        "Bill and invoice payments made from Petfolio are processed by Stripe through our backend systems; we do not receive or store your full card details.",
        "The Emergency feature opens Google Maps in your device's maps app or browser only when you choose to tap the link; we do not share your data with Google for this feature.",
      ],
      terms: {
        natureOfService:
          "Petfolio provides pet owners with mobile access to their pet's health records, appointment booking, clinic messaging, and bill payment, connected to the same account and data as the Web Platform.",
        payments: "Bills and invoices issued by your clinic may be paid in-app via Stripe.",
        paidFeature:
          "Ask-a-Vet chat may be offered as a paid, timed consultation, billed as described in the Web Platform's terms.",
        marketplace: null,
      },
    },
    {
      key: "overwatch",
      name: "Overwatch",
      tagline: "Mobile app for platform administrators (Android)",
      platform: "Native Android application",
      persona: "Authorized Animocentric LLP personnel only",
      audience: "internal",
      description:
        "Overwatch is the mobile companion to the Admin Panel, used internally by Animocentric LLP staff for platform oversight. It is not intended for use by clinics or pet owners, and this policy governs only the personnel who use it.",
      dataCollected: [
        {
          heading: "Administrator account data",
          items: [
            "Name, email address, phone number, and role",
            "Login access is via a one-time passcode (OTP) sent to your registered email address",
          ],
        },
        {
          heading: "Operational records",
          items: [
            "Platform-wide records viewed for oversight purposes, already collected through the Web Platform and Admin Panel",
          ],
        },
      ],
      permissions: [{ name: "Internet access", why: "required to communicate with our servers" }],
      thirdParties: ["resend", "hostinger"],
      specificNotes: [
        "Overwatch does not use push notifications and does not collect a device push token.",
        "Access to Overwatch is restricted to individuals authorized by Animocentric LLP.",
      ],
      terms: {
        natureOfService:
          "Overwatch is an internal operations tool for Animocentric LLP personnel and is not offered to the public.",
        payments: null,
        paidFeature: null,
        marketplace: null,
      },
    },
    {
      key: "animo-helper",
      name: "Animo Helper",
      tagline: "Mobile utility app for clinic staff (Android)",
      platform: "Native Android application",
      persona: "Veterinary clinic staff",
      audience: "public",
      description:
        "Animo Helper is a lightweight mobile utility for clinic staff to scan paper invoices and book appointments by voice, using the same account and data as the Web Platform and Animopractice.",
      dataCollected: [
        {
          heading: "Account & identity",
          items: [
            "Name, email address, phone number, and role — the same account used for the Web Platform and Animopractice",
            "Login access is via a one-time passcode (OTP) sent to your registered email address",
          ],
        },
        {
          heading: "Invoice images",
          items: [
            "Photos of paper invoices you capture for scanning. The image is processed on our own servers using local text-recognition software to extract text — it is not sent to a third-party cloud OCR or AI vendor",
          ],
        },
        {
          heading: "Voice booking transcripts",
          items: [
            "When you use voice booking, your device's own built-in speech recognition converts your speech to text locally on your device before the resulting text is sent to us; we do not receive or store an audio recording of your voice",
          ],
        },
      ],
      permissions: [
        { name: "Internet access", why: "required to communicate with our servers" },
        { name: "Camera", why: "to photograph invoices for scanning" },
        {
          name: "Microphone",
          why: "to enable voice-based appointment booking, processed via your device's built-in speech recognition",
        },
      ],
      thirdParties: ["resend", "r2", "hostinger"],
      specificNotes: [
        "Animo Helper does not use Firebase Cloud Messaging and does not collect a device push token.",
        "Invoice text extraction runs locally using open-source OCR software on our own servers; invoice images and extracted text are not sent to a third-party OCR or AI vendor.",
        "Voice booking relies on your Android device's own built-in speech-to-text engine; only the resulting text transcript is sent to us, never an audio recording.",
      ],
      terms: {
        natureOfService:
          "Animo Helper provides clinic staff with invoice-scanning and voice-based appointment-booking tools connected to the same account and data as the Web Platform and Animopractice.",
        payments: null,
        paidFeature: null,
        marketplace: null,
      },
    },
  ],
};
