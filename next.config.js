const withPWA = require('next-pwa')({
  dest: 'public'
});
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ['en-US', 'fr', 'de'],
    localeDetection: false,
    domains: [
      {
        domain: 'www.localetest.com',
        defaultLocale: 'en-US',
        http: true,
        locales: ['en-US'],
      },
      {
        domain: 'www.localetest.de',
        defaultLocale: 'de',
        http: true,
        locales: ['de'],
      },
      {
        domain: 'www.localetest.fr',
        defaultLocale: 'fr',
        http: true,
        locales: ['fr'],
      },
    ],
    defaultLocale: 'en-US',
  },
  publicRuntimeConfig: {
    CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY || '',
    // Add specific API keys for each domain
    CONTENTSTACK_API_KEYS: {
      'www.localetest.com': process.env.CONTENTSTACK_API_KEY_EN || '',
      'www.localetest.de': process.env.CONTENTSTACK_API_KEY_DE || '',
      'www.localetest.fr': process.env.CONTENTSTACK_API_KEY_FR || '',
    },
    CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT,
    CONTENTSTACK_MANAGEMENT_TOKEN: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
    CONTENTSTACK_API_HOST: process.env.CONTENTSTACK_API_HOST || 'api.contentstack.io',
    CONTENTSTACK_APP_HOST: process.env.CONTENTSTACK_APP_HOST || 'app.contentstack.com',
    NEXT_PUBLIC_CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
    CONTENTSTACK_LIVE_PREVIEW: process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW || 'true',
    CONTENTSTACK_LIVE_EDIT_TAGS: process.env.CONTENTSTACK_LIVE_EDIT_TAGS || 'false',
    SUPPORTED_LANGUAGES: ['en-us', 'de-de'],
    DEFAULT_LANGUAGE: 'en-us',
  },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.alias['@site1'] = path.join(__dirname, 'packages/site1');
  //     config.resolve.alias['@site2'] = path.join(__dirname, 'packages/site2');
  //   }
  //   return config;
  // },
};

module.exports = process.env.NODE_ENV === 'development' ? nextConfig : withPWA(nextConfig);
