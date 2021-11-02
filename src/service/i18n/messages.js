import LocalizedStrings from 'react-native-localization';
import messages_en from '../../translations/en.json';
import messages_hi_In from '../../translations/hi_IN.json';

const strings = {
  en: messages_en,
  hi_IN: messages_hi_In,
};

export const languageOptions = [
  {label: 'English', locale: 'en', labelInEnglish: 'English'},
  {label: 'हिंदी', locale: 'hi_IN', labelInEnglish: 'Hindi'},
];

const messages = new LocalizedStrings(strings);

export const getCurrentLocale = () => {
  const languageCode = messages.getLanguage();
  return languageOptions.find(option => option.locale === languageCode).locale;
};

export const changeLanguage = languageKey => {
  messages.setLanguage(languageKey);
};

export const t = str => messages[str] || str;
