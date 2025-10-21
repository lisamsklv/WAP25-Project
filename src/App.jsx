import './App.css'
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t, i18n } = useTranslation();

  const user = { first: 'Rowan', last: 'Atkinson' };

  return (
    <>
      <h1>{t('hello')}</h1>
      <p>{t('user.firstName', { name: user.first })}</p>
      <p>{t('user.lastName', { name: user.last })}</p>
      <p>{t('items', { count: 1 })}</p>
      <p>{t('items', { count: 5 })}</p>
      <p>
        <button
          onClick={() => i18n.changeLanguage('de')}
        >DE</button>
        <button
          onClick={() => i18n.changeLanguage('en')}
        >EN</button>
      </p>
    </>
  );
}