import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

const SUPPORTED_LOCALES = ['en'] as const;
const DEFAULT_LOCALE = 'en';

function detectLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const preferred = acceptLanguage.split(',')[0].trim().split('-')[0];
  return (SUPPORTED_LOCALES as readonly string[]).includes(preferred)
    ? preferred
    : DEFAULT_LOCALE;
}

export default getRequestConfig(async () => {
  const headersList = await headers();
  const locale = detectLocale(headersList.get('accept-language'));

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
