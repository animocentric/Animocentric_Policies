// Renders the policies site in the browser from data.js.
// Each HTML page is a thin shell: <body data-page="privacy|terms|index" data-app="<key>">
// with an empty <main id="root"></main>. This script fills it in on load.
(function () {
  var DATA = window.ANIMOCENTRIC_DATA;
  var entity = DATA.entity;
  var apps = DATA.apps;

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function byKey(key) {
    var found = null;
    apps.forEach(function (a) {
      if (a.key === key) found = a;
    });
    return found;
  }

  function thirdPartyList(keys) {
    return keys
      .map(function (k) {
        return entity.thirdParties[k];
      })
      .filter(Boolean)
      .map(function (tp) {
        return (
          "<li><strong>" +
          esc(tp.name) +
          "</strong> — " +
          esc(tp.purpose) +
          '. <a href="' +
          esc(tp.url) +
          '" rel="noopener">Their privacy policy</a>.</li>'
        );
      })
      .join("\n");
  }

  function dataCollectedBlock(sections) {
    return sections
      .map(function (s) {
        var items = s.items
          .map(function (i) {
            return "<li>" + esc(i) + "</li>";
          })
          .join("\n");
        return "<h3>" + esc(s.heading) + "</h3>\n<ul>\n" + items + "\n</ul>";
      })
      .join("\n");
  }

  function permissionsBlock(permissions) {
    if (!permissions || !permissions.length) return "";
    var rows = permissions
      .map(function (p) {
        return "<tr><td>" + esc(p.name) + "</td><td>" + esc(p.why) + "</td></tr>";
      })
      .join("\n");
    return (
      "<h2>Device permissions this app requests</h2>\n" +
      "<p>As a native Android app, this app requests the following device permissions. We only request permissions the app actively uses, and only for the purpose stated:</p>\n" +
      '<table class="perm-table">\n<thead><tr><th>Permission</th><th>Why we ask for it</th></tr></thead>\n<tbody>\n' +
      rows +
      "\n</tbody>\n</table>"
    );
  }

  function crossBorderNote(app) {
    var relevant = ["razorpay", "stripe", "firebase", "resend", "r2", "hostinger"];
    var foreign = app.thirdParties.filter(function (k) {
      return relevant.indexOf(k) !== -1;
    });
    if (!foreign.length) return "";
    var names = foreign
      .map(function (k) {
        return esc(entity.thirdParties[k].name);
      })
      .join(", ");
    return (
      "<p>Some of the service providers listed above (including " +
      names +
      ") may process or store data on servers located outside India. Where this happens, we rely on the service provider's own contractual and security commitments, and we do not transfer personal data to any country the Central Government has restricted under the DPDP Act, 2023.</p>"
    );
  }

  function setHead(title, description) {
    document.title = title;
    var meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }

  function header(prefix) {
    return (
      '<header class="site-header">\n' +
      '  <a class="brand" href="' +
      prefix +
      'index.html">Animocentric <span>Policies</span></a>\n' +
      '  <nav><a href="' +
      prefix +
      'index.html">All products</a></nav>\n' +
      "</header>"
    );
  }

  function footer() {
    return (
      '<footer class="site-footer">\n' +
      "  <p><strong>" +
      esc(entity.legalName) +
      "</strong> &middot; " +
      esc(entity.address) +
      "</p>\n" +
      '  <p><a href="mailto:' +
      esc(entity.email) +
      '">' +
      esc(entity.email) +
      "</a> &middot; " +
      esc(entity.phone) +
      "</p>\n" +
      '  <p class="muted">Last updated ' +
      esc(entity.effectiveDate) +
      "</p>\n" +
      "</footer>"
    );
  }

  function docHead(eyebrow, app) {
    return (
      '<div class="doc-head">\n' +
      '  <p class="eyebrow">' +
      esc(eyebrow) +
      "</p>\n" +
      "  <h1>" +
      esc(app.name) +
      "</h1>\n" +
      '  <p class="tagline">' +
      esc(app.tagline) +
      "</p>\n" +
      '  <p class="muted">Effective ' +
      esc(entity.effectiveDate) +
      "</p>\n" +
      "</div>"
    );
  }

  function renderPrivacy(key) {
    var app = byKey(key);
    if (!app) return notFound();

    var audienceNote =
      app.audience === "internal"
        ? '<p class="callout">' +
          esc(app.name) +
          " is an internal tool restricted to personnel authorized by " +
          esc(entity.legalName) +
          '. If you are a clinic-staff or pet-owner user of our public products, this policy does not describe your data — please see the relevant product\'s own policy from the <a href="../index.html">product list</a>.</p>'
        : "";

    var main =
      docHead("Privacy Policy", app) +
      "\n" +
      audienceNote +
      "\n<p>" +
      esc(app.description) +
      "</p>\n" +
      "<p>This policy explains how " +
      esc(entity.legalName) +
      ' ("<strong>we</strong>", "<strong>us</strong>", "<strong>Animocentric</strong>") collects, uses, shares, and protects personal data through ' +
      esc(app.name) +
      ' (the "<strong>Service</strong>"). Under India\'s Digital Personal Data Protection Act, 2023 ("<strong>DPDP Act</strong>"), ' +
      esc(entity.legalName) +
      " acts as the <strong>Data Fiduciary</strong> for the personal data described below, and you (or the individual whose data is entered, e.g. a pet owner's contact) are the <strong>Data Principal</strong>.</p>\n" +
      "<h2>Personal data we collect</h2>\n" +
      dataCollectedBlock(app.dataCollected) +
      "\n" +
      permissionsBlock(app.permissions) +
      "\n<h2>How we use this data</h2>\n<ul>\n" +
      "<li>To create and maintain your account and authenticate you via one-time passcode</li>\n" +
      "<li>To provide the core functionality of " +
      esc(app.name) +
      " as described above</li>\n" +
      "<li>To process payments and subscriptions through our payment partners</li>\n" +
      "<li>To send appointment reminders, service messages, and (where enabled) push notifications</li>\n" +
      "<li>To provide customer support and respond to your requests</li>\n" +
      "<li>To maintain the security, integrity, and proper functioning of the Service</li>\n" +
      "<li>To comply with applicable legal and regulatory obligations, including statutory record-keeping for veterinary and financial records</li>\n" +
      "</ul>\n" +
      "<h2>Who we share it with</h2>\n" +
      "<p>We do not sell personal data. We share personal data only with the service providers necessary to operate " +
      esc(app.name) +
      ", and with the clinic or pet owner it directly concerns (for example, a pet owner's clinic can see that pet's records; a clinic's staff can see their clinic's own data). The service providers we currently use for this product are:</p>\n<ul>\n" +
      thirdPartyList(app.thirdParties) +
      "\n</ul>\n" +
      app.specificNotes.map(function (n) {
        return "<p>" + esc(n) + "</p>";
      }).join("\n") +
      "\n<p>We may also disclose personal data where required by law, to enforce our terms, or to protect the rights, property, or safety of " +
      esc(entity.legalName) +
      ", our users, or the public.</p>\n" +
      "<h2>Cross-border data transfer</h2>\n" +
      crossBorderNote(app) +
      "\n<h2>Data retention</h2>\n" +
      "<p>We retain personal data for as long as your account remains active, and afterwards for as long as needed to comply with legal, regulatory, tax, or record-keeping obligations applicable to veterinary and financial records, resolve disputes, and enforce our agreements. When data is no longer required, we delete or anonymize it.</p>\n" +
      "<h2>Data security</h2>\n" +
      "<p>We use industry-standard measures to protect personal data, including encrypted connections (HTTPS/TLS) between your device or browser and our servers, access controls limiting data access to authorized personnel, and one-time-passcode authentication instead of stored passwords. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.</p>\n" +
      "<h2>Children's data</h2>\n" +
      "<p>The Service is intended for use by individuals aged 18 and above. We do not knowingly collect personal data directly from children. If you believe a child has provided us personal data without appropriate consent, please contact us using the details below so we can take appropriate action.</p>\n" +
      "<h2>Your rights under the DPDP Act, 2023</h2>\n" +
      "<p>Subject to applicable law, you have the right to:</p>\n<ul>\n" +
      "<li>Access a summary of the personal data we hold about you and how it is processed</li>\n" +
      "<li>Request correction, completion, or updating of your personal data</li>\n" +
      "<li>Request erasure of personal data that is no longer necessary for the purpose it was collected, subject to our legal retention obligations</li>\n" +
      "<li>Withdraw consent for processing that is based on consent, at any time (this does not affect processing carried out before withdrawal)</li>\n" +
      "<li>Nominate another individual to exercise these rights on your behalf in the event of death or incapacity</li>\n" +
      "<li>Register a grievance with us, and if unresolved, with the Data Protection Board of India</li>\n" +
      "</ul>\n" +
      "<p>To exercise any of these rights, contact us using the details at the bottom of this page.</p>\n" +
      "<h2>International users (UK / EEA / California)</h2>\n" +
      "<p>" +
      esc(entity.legalName) +
      " is based in India and the Service is operated from and primarily governed by Indian law. If you access the Service from the United Kingdom, the European Economic Area, or the State of California, the following additional terms apply to you.</p>\n" +
      "<p><strong>UK / EEA (GDPR).</strong> We process personal data on the following legal bases: performance of a contract (to provide the Service you or your clinic signed up for), your consent (for example, for optional push notifications), our legitimate interests (securing the Service, preventing fraud, and improving it), and compliance with a legal obligation (such as financial and veterinary record-keeping). Where processing relies on consent, you may withdraw it at any time. In addition to the DPDP Act rights listed above, you have the right to lodge a complaint with your local supervisory authority (for example, the UK Information Commissioner's Office, or your national data protection authority in the EEA). Personal data is stored and processed on servers located in India; by using the Service from the UK or EEA, you understand and agree that your personal data will be transferred to and processed in India as described in this policy.</p>\n" +
      "<p><strong>California (CCPA/CPRA).</strong> We do not sell personal information, and we do not share personal information for cross-context behavioral advertising, as those terms are defined under California law. Subject to certain exceptions, California residents have the right to know what personal information we have collected about them, to request its deletion, to request correction of inaccurate information, and to not be discriminated against for exercising any of these rights. To exercise a California privacy right, contact us using the details at the bottom of this page.</p>\n" +
      "<h2>Grievance redressal</h2>\n" +
      "<p>If you have a complaint about how your personal data has been handled, please write to our Grievance Officer at the contact details below. We will acknowledge and address grievances within the timelines required under the DPDP Act, 2023. If you remain dissatisfied with our response, you may file a complaint with the Data Protection Board of India.</p>\n" +
      "<h2>Changes to this policy</h2>\n" +
      '<p>We may update this policy from time to time to reflect changes in our practices or applicable law. We will post the updated policy here with a revised "Last updated" date. Material changes affecting how existing data is used will be communicated to you through the Service.</p>\n' +
      "<h2>Governing law</h2>\n" +
      "<p>" +
      esc(entity.governingLawNote) +
      "</p>\n" +
      "<h2>Contact us</h2>\n" +
      "<p>For any questions about this policy or to exercise your data-protection rights, contact our Grievance Officer:</p>\n" +
      "<address>\n" +
      esc(entity.legalName) +
      "<br>\n" +
      esc(entity.address) +
      "<br>\n" +
      'Email: <a href="mailto:' +
      esc(entity.email) +
      '">' +
      esc(entity.email) +
      "</a><br>\n" +
      "Phone: " +
      esc(entity.phone) +
      "\n</address>";

    setHead(app.name + " — Privacy Policy | Animocentric", "Privacy Policy for " + app.name + " by " + entity.legalName + ".");
    return { header: header("../"), main: main, footer: footer() };
  }

  function termsPage(key) {
    var app = byKey(key);
    if (!app) return notFound();
    var t = app.terms;

    var medicalDisclaimer =
      app.audience === "public"
        ? "<h2>Not a substitute for veterinary care</h2>\n" +
          '<p class="callout"><strong>' +
          esc(app.name) +
          " is a technology platform, not a veterinary practice.</strong> " +
          esc(entity.legalName) +
          " does not itself diagnose, treat, or provide veterinary medical advice. All clinical judgment, diagnoses, treatment, and advice are provided solely by the independent veterinary clinics and licensed veterinary professionals who use the Service — " +
          esc(entity.legalName) +
          " is not responsible for the quality, accuracy, or outcome of any veterinary advice or treatment given through the Service. The Service, including any Ask-a-Vet chat feature, is <strong>not intended for emergencies</strong>. If your pet is experiencing a medical emergency, contact your nearest veterinary emergency facility immediately — do not rely on in-app messaging for urgent or emergency situations.</p>"
        : "<h2>Confidentiality and authorized use</h2>\n" +
          "<p>" +
          esc(app.name) +
          " is provided only to individuals authorized by " +
          esc(entity.legalName) +
          ". Data accessible through this app relates to third parties (clinics and pet owners) and must be accessed only for legitimate operational purposes and handled in accordance with " +
          esc(entity.legalName) +
          "'s internal confidentiality obligations and applicable data-protection law.</p>";

    var clinicOwnerRelationship =
      app.audience === "public"
        ? "<h2>Relationship between clinics and pet owners</h2>\n" +
          "<p>" +
          esc(entity.legalName) +
          " facilitates the connection between veterinary clinics and pet owners through the Service but is not a party to, and does not control, the underlying veterinary-services relationship between a clinic and a pet owner. Clinics are independently responsible for the veterinary services they provide, their pricing, and their compliance with applicable professional and regulatory requirements.</p>"
        : "";

    var paymentsSection = t.payments
      ? "<h2>Payments and subscriptions</h2>\n<p>" +
        esc(t.payments) +
        "</p>\n<p>Fees, where applicable, are payable in advance. Subscriptions renew automatically at the end of each billing cycle unless cancelled before the renewal date. You are responsible for reviewing charges made by our payment partners. Except where required by applicable law, fees already paid are non-refundable.</p>"
      : "";

    var paidFeatureSection = t.paidFeature
      ? "<h2>Paid consultation features</h2>\n<p>" + esc(t.paidFeature) + "</p>"
      : "";

    var marketplaceSection = t.marketplace
      ? "<h2>Payment facilitation</h2>\n<p>" + esc(t.marketplace) + "</p>"
      : "";

    var main =
      docHead("Terms of Service", app) +
      "\n<p>These Terms of Service (\"<strong>Terms</strong>\") govern your access to and use of " +
      esc(app.name) +
      ' (the "<strong>Service</strong>"), provided by ' +
      esc(entity.legalName) +
      ' ("<strong>we</strong>", "<strong>us</strong>", "<strong>Animocentric</strong>"). By creating an account or otherwise using the Service, you agree to these Terms. If you do not agree, do not use the Service.</p>\n' +
      "<h2>Description of the Service</h2>\n<p>" +
      esc(t.natureOfService) +
      "</p>\n" +
      medicalDisclaimer +
      "\n<h2>Eligibility</h2>\n" +
      "<p>You must be at least 18 years old and capable of entering into a binding contract under Indian law to use the Service. If you are using the Service on behalf of a clinic or organization, you confirm you are authorized to bind that organization to these Terms.</p>\n" +
      "<h2>Account registration and security</h2>\n" +
      "<p>Access to the Service is authenticated using a one-time passcode sent to your registered email address, rather than a stored password. You are responsible for maintaining control of that email account and for all activity that occurs under your account. Notify us immediately at the contact details below if you suspect unauthorized access to your account.</p>\n" +
      paymentsSection +
      "\n" +
      paidFeatureSection +
      "\n" +
      marketplaceSection +
      "\n<h2>Acceptable use</h2>\n" +
      "<p>You agree not to: use the Service for any unlawful purpose; upload false, misleading, or another person's medical or personal data without authorization; attempt to gain unauthorized access to the Service or other users' data; interfere with or disrupt the Service's operation; or use the Service to harass, defame, or harm another person.</p>\n" +
      "<h2>Your content</h2>\n" +
      "<p>You retain ownership of the content you submit (such as pet photos, medical records you upload, or messages). By submitting content, you grant " +
      esc(entity.legalName) +
      " a limited license to store, process, and display that content solely to operate the Service for you and the relevant clinic or pet owner it concerns.</p>\n" +
      clinicOwnerRelationship +
      "\n<h2>Third-party services</h2>\n" +
      '<p>The Service integrates with third-party providers (such as payment processors and push-notification services) described in our <a href="../privacy/' +
      esc(app.key) +
      '.html">Privacy Policy</a>. Your use of features backed by these providers is also subject to their own terms and policies.</p>\n' +
      "<h2>Intellectual property</h2>\n" +
      "<p>The Service, including its software, design, and branding, is owned by " +
      esc(entity.legalName) +
      " or its licensors and is protected by applicable intellectual-property laws. Nothing in these Terms grants you any right to use " +
      esc(entity.legalName) +
      "'s trademarks or branding without prior written consent.</p>\n" +
      "<h2>Disclaimer of warranties</h2>\n" +
      '<p>The Service is provided "as is" and "as available" without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the Service will be uninterrupted, error-free, or completely secure.</p>\n' +
      "<h2>Limitation of liability</h2>\n" +
      "<p>To the maximum extent permitted by applicable law, " +
      esc(entity.legalName) +
      " shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, data, or goodwill, arising from your use of the Service. " +
      esc(entity.legalName) +
      "'s total liability arising from these Terms or the Service shall not exceed the amount you paid to " +
      esc(entity.legalName) +
      " in the twelve months preceding the claim, if any.</p>\n" +
      "<h2>Indemnification</h2>\n" +
      "<p>You agree to indemnify and hold harmless " +
      esc(entity.legalName) +
      " from any claims, damages, liabilities, and expenses arising from your use of the Service, your content, or your violation of these Terms.</p>\n" +
      "<h2>Termination</h2>\n" +
      "<p>We may suspend or terminate your access to the Service if you violate these Terms or if we reasonably believe your use poses a risk to the Service, other users, or " +
      esc(entity.legalName) +
      ". You may stop using the Service and request account deletion at any time by contacting us.</p>\n" +
      "<h2>Dispute resolution and governing law</h2>\n" +
      "<p>These Terms are governed by the laws of India. Subject to applicable law, the courts of " +
      esc(entity.jurisdictionCity) +
      ", " +
      esc(entity.jurisdictionState) +
      " shall have exclusive jurisdiction over any dispute arising from these Terms or the Service. If you are a consumer resident in the United Kingdom, the European Economic Area, or elsewhere, nothing in this section removes any mandatory consumer-protection right you have under the law of your own country of residence that cannot be limited by agreement.</p>\n" +
      "<h2>Changes to these Terms</h2>\n" +
      '<p>We may update these Terms from time to time. We will post the updated Terms here with a revised "Last updated" date, and material changes will be communicated to you through the Service.</p>\n' +
      "<h2>Contact us</h2>\n<address>\n" +
      esc(entity.legalName) +
      "<br>\n" +
      esc(entity.address) +
      "<br>\n" +
      'Email: <a href="mailto:' +
      esc(entity.email) +
      '">' +
      esc(entity.email) +
      "</a><br>\n" +
      "Phone: " +
      esc(entity.phone) +
      "\n</address>";

    setHead(app.name + " — Terms of Service | Animocentric", "Terms of Service for " + app.name + " by " + entity.legalName + ".");
    return { header: header("../"), main: main, footer: footer() };
  }

  function indexPage() {
    var publicApps = apps.filter(function (a) {
      return a.audience === "public";
    });
    var internalApps = apps.filter(function (a) {
      return a.audience === "internal";
    });

    function card(a) {
      return (
        '<li class="app-card">\n  <h3>' +
        esc(a.name) +
        '</h3>\n  <p class="muted">' +
        esc(a.tagline) +
        '</p>\n  <div class="card-links">\n    <a href="privacy/' +
        esc(a.key) +
        '.html">Privacy Policy</a>\n    <a href="terms/' +
        esc(a.key) +
        '.html">Terms of Service</a>\n  </div>\n</li>'
      );
    }

    var main =
      '<div class="doc-head">\n' +
      '  <p class="eyebrow">Legal</p>\n' +
      "  <h1>Animocentric Policies</h1>\n" +
      '  <p class="tagline">Privacy Policies and Terms of Service for every Animocentric product.</p>\n' +
      "</div>\n" +
      "<p>" +
      esc(entity.legalName) +
      " operates several connected products for veterinary clinics and pet owners. Because each product collects and uses somewhat different data, we publish a dedicated Privacy Policy and Terms of Service for each one below, rather than a single combined document. All of them share the same underlying commitments described in each policy's core sections (who we are, your rights, how to contact us).</p>\n" +
      "<h2>Products for clinics and pet owners</h2>\n" +
      '<ul class="app-grid">\n' +
      publicApps.map(card).join("\n") +
      "\n</ul>\n" +
      "<h2>Internal administration tools</h2>\n" +
      '<p class="muted">These products are restricted to personnel authorized by ' +
      esc(entity.legalName) +
      " and are not offered to the public.</p>\n" +
      '<ul class="app-grid">\n' +
      internalApps.map(card).join("\n") +
      "\n</ul>";

    setHead(
      "Animocentric Policies — Privacy & Terms for all products",
      "Privacy Policies and Terms of Service for all Animocentric products, published by " + entity.legalName + "."
    );
    return { header: header(""), main: main, footer: footer() };
  }

  function notFound() {
    setHead("Not found | Animocentric Policies", "Page not found.");
    return {
      header: header(""),
      main: "<h1>Page not found</h1><p>That product isn't listed. <a href=\"index.html\">Back to all products</a>.</p>",
      footer: footer(),
    };
  }

  function render() {
    var body = document.body;
    var page = body.getAttribute("data-page");
    var appKey = body.getAttribute("data-app");
    var result;
    if (page === "privacy") result = renderPrivacy(appKey);
    else if (page === "terms") result = termsPage(appKey);
    else result = indexPage();

    var root = document.getElementById("root");
    root.innerHTML = result.header + "\n<main>\n" + result.main + "\n</main>\n" + result.footer;
  }

  render();
})();
