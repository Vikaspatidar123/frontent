const Id = (cell) => (cell.value ? cell.value : '');

const LanguageCode = (cell) => cell.value || '';

const LanguageName = (cell) => cell.value || '';

export { Id, LanguageCode, LanguageName };
