import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string', initialValue: 'Unity Hall KNUST' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', initialValue: 'The Largest Hall of Residence in West Africa' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'favicon', title: 'Favicon', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'socialLinks', title: 'Social Links', type: 'object', fields: [
      { name: 'facebook', title: 'Facebook', type: 'url' },
      { name: 'twitter', title: 'Twitter/X', type: 'url' },
      { name: 'instagram', title: 'Instagram', type: 'url' },
      { name: 'youtube', title: 'YouTube', type: 'url' },
      { name: 'whatsapp', title: 'WhatsApp', type: 'url' },
      { name: 'linkedin', title: 'LinkedIn', type: 'url' },
      { name: 'radio', title: 'Continental Radio/Focus FM', type: 'url' },
    ]}),
    defineField({ name: 'contactInfo', title: 'Contact Info', type: 'object', fields: [
      { name: 'address', title: 'Address', type: 'string' },
      { name: 'phone1', title: 'Phone 1', type: 'string' },
      { name: 'phone2', title: 'Phone 2', type: 'string' },
      { name: 'email', title: 'Email', type: 'string' },
      { name: 'officeHours', title: 'Office Hours', type: 'string' },
    ]}),
    defineField({ name: 'seo', title: 'SEO Defaults', type: 'object', fields: [
      { name: 'metaTitle', title: 'Default Meta Title', type: 'string' },
      { name: 'metaDescription', title: 'Default Meta Description', type: 'text' },
      { name: 'ogImage', title: 'Default OG Image', type: 'image' },
      { name: 'twitterHandle', title: 'Twitter Handle', type: 'string' },
    ]}),
    defineField({ name: 'analytics', title: 'Analytics', type: 'object', fields: [
      { name: 'gaId', title: 'Google Analytics ID', type: 'string' },
      { name: 'plausibleDomain', title: 'Plausible Domain', type: 'string' },
      { name: 'clarityId', title: 'Microsoft Clarity ID', type: 'string' },
    ]}),
    defineField({ name: 'features', title: 'Feature Flags', type: 'object', fields: [
      { name: 'enableVirtualTour', title: 'Enable Virtual Tour', type: 'boolean', initialValue: true },
      { name: 'enableAlumniPortal', title: 'Enable Alumni Portal', type: 'boolean', initialValue: true },
      { name: 'enableResidentPortal', title: 'Enable Resident Portal', type: 'boolean', initialValue: true },
      { name: 'enableDonations', title: 'Enable Donations', type: 'boolean', initialValue: true },
      { name: 'enableChat', title: 'Enable Chat Widget', type: 'boolean', initialValue: false },
    ]}),
    defineField({ name: 'maintenance', title: 'Maintenance Mode', type: 'object', fields: [
      { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: false },
      { name: 'message', title: 'Message', type: 'text' },
      { name: 'allowedIPs', title: 'Allowed IPs', type: 'array', of: [{ type: 'string' }] },
    ]}),
  ],
});