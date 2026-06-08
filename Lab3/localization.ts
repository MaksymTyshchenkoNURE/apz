export const formatRegionalDate = (date: Date, locale: string): string => {
  return new Intl.DateTimeFormat(locale === 'uk' ? 'uk-UA' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
};

export const sortTextByLocale = (a: string, b: string, locale: string): number => {
  const collator = new Intl.Collator(locale === 'uk' ? 'uk-UA' : 'en-US', {
    numeric: true,
    sensitivity: 'base'
  });
  return collator.compare(a, b);
};