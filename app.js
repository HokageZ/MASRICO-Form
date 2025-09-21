// Enable/disable submit button based on required checkboxes
const agreeTerms = document.getElementById('agreeTerms');
const agreeInfo = document.getElementById('agreeInfo');
const submitBtn = document.getElementById('submitBtn');
const pageCountSel = document.getElementById('pageCount');
const additionalPagesGroup = document.getElementById('additionalPagesGroup');
const additionalPagesInput = document.getElementById('additionalPages');

function checkAgreement() {
  if (agreeTerms.checked && agreeInfo.checked) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

agreeTerms.addEventListener('change', checkAgreement);
agreeInfo.addEventListener('change', checkAgreement);

// Toggle additional pages field based on pageCount
function toggleAdditionalPages() {
  const v = pageCountSel.value;
  const show = v === '6-10' || v === '11-20' || v === '20+';
  additionalPagesGroup.style.display = show ? 'block' : 'none';
}
pageCountSel.addEventListener('change', toggleAdditionalPages);
// Initialize on load
toggleAdditionalPages();

// Add selected class to radio items
const radioItems = document.querySelectorAll('.radio-item');
radioItems.forEach(item => {
  const radio = item.querySelector('input[type="radio"]');
  item.addEventListener('click', function () {
    if (radio) {
      // Remove selected class from all items in the same group
      const groupName = radio.getAttribute('name');
      document.querySelectorAll(`input[name="${groupName}"]`).forEach(r => {
        r.closest('.radio-item').classList.remove('selected');
      });

      // Add selected class to clicked item
      radio.checked = true;
      this.classList.add('selected');
    }
  });
});

// Form submission
document.getElementById('websiteForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Collect all form data
  const formData = new FormData(this);
  const data = {};

  // Regular form fields
  for (let [key, value] of formData.entries()) {
    if (data[key]) {
      if (Array.isArray(data[key])) {
        data[key].push(value);
      } else {
        data[key] = [data[key], value];
      }
    } else {
      data[key] = value;
    }
  }

  // Show success message
  alert('Requirements submitted successfully! We will contact you within 24 hours to discuss your project.');

  // In a real application, you would send this data to your server
  console.log('Form data:', data);

  // You can also generate an email or export the data
  generateSummary(data);
});

function generateSummary(data) {
  let summary = "=== WEBSITE REQUIREMENTS SUMMARY ===\n\n";
  summary += `Company: ${data.companyName}\n`;
  summary += `Business Type: ${data.businessType}\n`;
  summary += `Email: ${data.contactEmail}\n`;
  summary += `Phone: ${data.contactPhone}\n`;
  if (data.domainHost) {
    summary += `Domain/Hosting: ${data.domainHost}\n`;
  }
  summary += `Website Type: ${data.websiteType}\n`;
  summary += `Pages: ${data.pageCount}\n`;
  summary += `Design Style: ${data.designStyle}\n`;
  summary += `Timeline: ${data.timeline}\n`;
  summary += `\n`;

  if (data.targetAudience) {
    summary += `Target Audience: ${data.targetAudience}\n\n`;
  }

  if (data.inspirationSites) {
    summary += `Inspiration Websites:\n${data.inspirationSites}\n\n`;
  }

  if (data.specialRequests) {
    summary += `Special Requirements:\n${data.specialRequests}\n\n`;
  }
  if (data.additionalPages) {
    summary += `Additional Pages:\n${data.additionalPages}\n\n`;
  }

  // Copy to clipboard
  navigator.clipboard.writeText(summary).then(() => {
    alert('Requirements summary copied to clipboard! You can paste it in your project management tool.');
  });
}

// Cache for loaded translations
const translationsCache = {};

async function getTranslations(lang) {
  if (translationsCache[lang]) return translationsCache[lang];
  try {
    const res = await fetch(`translations/${lang}.json`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load translations');
    const json = await res.json();
    translationsCache[lang] = json;
    return json;
  } catch (e) {
    // Try to fallback to English JSON
    try {
      const resEn = await fetch('translations/en.json', { cache: 'no-store' });
      if (!resEn.ok) throw new Error('Failed to load English translations');
      const jsonEn = await resEn.json();
      translationsCache['en'] = jsonEn;
      return jsonEn;
    } catch (e2) {
      alert('Unable to load translation files. Please ensure the translations folder is accessible.');
      return null;
    }
  }
}

async function setLanguage(lang) {
  const t = await getTranslations(lang);
  if (!t) return;
  // Title sections
  document.getElementById('headerTitle').textContent = t.headerTitle;
  document.getElementById('businessInfoTitle').textContent = t.businessInfoTitle;
  document.getElementById('websiteReqsTitle').textContent = t.websiteReqsTitle;
  document.getElementById('designStyleTitle').textContent = t.designStyleTitle;
  document.getElementById('contentMediaTitle').textContent = t.contentMediaTitle;
  document.getElementById('specialFeaturesTitle').textContent = t.specialFeaturesTitle;
  document.getElementById('timelineBudgetTitle').textContent = t.timelineBudgetTitle;
  document.getElementById('agreementTitle').textContent = t.agreementTitle;
  document.getElementById('agreementIntro').innerHTML = `<strong>${t.agreementIntro}</strong>`;

  // Labels
  const setLabel = (id, text) => { const el = document.getElementById(id); if (el) el.childNodes[0].nodeValue = text + ' '; };
  setLabel('companyNameLabel', t.companyNameLabel);
  setLabel('businessTypeLabel', t.businessTypeLabel);
  setLabel('contactEmailLabel', t.contactEmailLabel);
  setLabel('contactPhoneLabel', t.contactPhoneLabel);
  document.getElementById('targetAudienceLabel').textContent = t.targetAudienceLabel;
  document.getElementById('websiteTypeLabel').childNodes[0].nodeValue = t.websiteTypeLabel + ' ';
  setLabel('pageCountLabel', t.pageCountLabel);
  document.getElementById('languagesLabel').textContent = t.languagesLabel;
  document.getElementById('designStyleLabel').childNodes[0].nodeValue = t.designStyleLabel + ' ';
  document.getElementById('colorPreferencesLabel').textContent = t.colorPreferencesLabel;
  document.getElementById('logoUploadLabel').textContent = t.logoUploadLabel;
  document.getElementById('inspirationSitesLabel').textContent = t.inspirationSitesLabel;
  document.getElementById('inspirationHelpText').textContent = t.inspirationHelpText;
  document.getElementById('contentCreationLabel').childNodes[0].nodeValue = t.contentCreationLabel + ' ';
  document.getElementById('imagesSourceLabel').childNodes[0].nodeValue = t.imagesSourceLabel + ' ';
  document.getElementById('additionalFeaturesLabel').textContent = t.additionalFeaturesLabel;
  document.getElementById('specialRequestsLabel').textContent = t.specialRequestsLabel;
  setLabel('timelineLabel', t.timelineLabel);
  setLabel('budgetLabel', t.budgetLabel);
  // Domain & Hosting section
  const dTitle = document.getElementById('domainHostTitle'); if (dTitle) dTitle.textContent = t.domainHostTitle;
  const dLabelWrap = document.getElementById('domainHostLabel'); if (dLabelWrap) dLabelWrap.innerHTML = `${t.domainHostLabel} <span class="required">*</span>`;
  const dHelp = document.getElementById('domainHostHelp'); if (dHelp) dHelp.textContent = t.domainHostHelp;
  const setOptLabel = (id, txt) => { const el = document.querySelector(`label[for="${id}"]`); if (el) el.textContent = txt; };
  if (t.domainHostOptions) {
    setOptLabel('hasDomain', t.domainHostOptions.domain);
    setOptLabel('hasHosting', t.domainHostOptions.hosting);
    setOptLabel('hasBoth', t.domainHostOptions.both);
    setOptLabel('hasNone', t.domainHostOptions.none);
  }
  const apLabel = document.getElementById('additionalPagesLabel');
  if (apLabel) apLabel.textContent = t.additionalPagesLabel;

  // Radio labels
  const labelFor = (id) => document.querySelector(`label[for="${id}"]`);
  labelFor('showcase').textContent = t.radio.showcase;
  labelFor('ecommerce').textContent = t.radio.ecommerce;
  labelFor('booking').textContent = t.radio.booking;
  labelFor('portfolio').textContent = t.radio.portfolio;
  labelFor('modern').textContent = t.radio.modern;
  labelFor('classic').textContent = t.radio.classic;
  labelFor('creative').textContent = t.radio.creative;
  labelFor('minimal').textContent = t.radio.minimal;
  labelFor('contentSelf').textContent = t.radio.contentSelf;
  labelFor('contentHelp').textContent = t.radio.contentHelp;
  labelFor('contentFull').textContent = t.radio.contentFull;
  labelFor('imagesSelf').textContent = t.radio.imagesSelf;
  labelFor('imagesStock').textContent = t.radio.imagesStock;
  labelFor('imagesMix').textContent = t.radio.imagesMix;

  // Checkboxes: pages & features
  const pageIds = ['homepage','about','services','gallery','contact','blog'];
  pageIds.forEach(id => { const l = labelFor(id); if (l) l.textContent = t.pages[id]; });
  const featureIds = ['contact-form','social-media','google-maps','newsletter','testimonials','live-chat'];
  featureIds.forEach(id => { const l = labelFor(id); if (l) l.textContent = t.features[id]; });

  // Select options by value
  const setOptions = (selectId, map) => {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    Array.from(sel.options).forEach(opt => {
      const v = opt.value;
      if (Object.prototype.hasOwnProperty.call(map, v)) {
        opt.textContent = map[v];
      }
    });
  };
  setOptions('businessType', t.options.businessType);
  setOptions('pageCount', t.options.pageCount);
  setOptions('logoUpload', t.options.logoUpload);
  setOptions('timeline', t.options.timeline);
  setOptions('budget', t.options.budget);

  // Placeholders
  const setPh = (id, text) => { const el = document.getElementById(id); if (el) el.placeholder = text; };
  setPh('targetAudience', t.placeholders.targetAudience);
  setPh('colorPreferences', t.placeholders.colorPreferences);
  setPh('inspirationSites', t.placeholders.inspirationSites);
  setPh('specialRequests', t.placeholders.specialRequests);
  setPh('additionalPages', t.placeholders.additionalPages);

  // Agreement list and check labels
  const list = document.getElementById('agreementList');
  list.innerHTML = t.agreementList.map(item => `<li>${item}</li>`).join('');
  document.querySelector('label[for="agreeTerms"]').innerHTML = `<strong>${t.agreementTerms} <span class="required">*</span></strong>`;
  document.querySelector('label[for="agreeInfo"]').innerHTML = `<strong>${t.agreementInfo} <span class="required">*</span></strong>`;

  // Submit button
  document.getElementById('submitBtn').textContent = t.submit;

  // Activate button state
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
}

// Language button handlers and default language
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', async () => await setLanguage(btn.dataset.lang));
});
// Set default (user may have changed it to Spanish earlier)
setLanguage('es');
