/* eslint-disable */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
const fallbackLng = 'en';

let langs = require('./configuration');
let resources = {};
langs.module.i18n.available.forEach((l) => {
  let lTemp = require(`./locales/${l}.js`);
  resources[l] = { translation: lTemp };
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng,
    saveMissing: langs.module.i18n.saveMissing || false,
    updateMissing: langs.module.i18n.updateMissing || false,
    detection: {
      checkWhitelist: true,
    },
    resources,
    debug: langs.module.i18n.debug || false,
    interpolation: {
      format: (value, format, lng) => {
        switch (format) {
          case 'devocase':
            return `${value.substr(0, 1).toUpperCase()}${value
              .substr(1)
              .toLowerCase()}`;
          case 'default':
            return value;
          case 'lowercase':
            return value.toLowerCase();
          case 'uppercase':
            return value.toUpperCase();
          case 'number':
            return new Intl.NumberFormat(lng).format(value);
          case 'price':
            return Intl.NumberFormat(lng, {
              style: 'currency',
              currency: 'USD',
            }).format(value);
        }
      },
      escapeValue: false,
    },
  });

export default i18n;
