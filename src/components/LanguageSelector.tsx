"use client";

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onSelect: (lang: string) => void;
  disabled?: boolean;
}

export default function LanguageSelector({ languages, selectedLanguage, onSelect, disabled }: LanguageSelectorProps) {
  return (
    <div className="w-full relative">
      <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Select Language
      </label>
      <div className="relative">
        <select
          id="language"
          value={selectedLanguage}
          onChange={(e) => onSelect(e.target.value)}
          disabled={disabled}
          className="appearance-none block w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-gray-100 py-3 px-4 pr-10 rounded-xl leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:border-gray-300 dark:hover:border-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 dark:text-gray-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
