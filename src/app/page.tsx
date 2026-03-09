"use client";

import { useState, useEffect } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import RepoCard, { Repository } from "@/components/RepoCard";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";

export default function Home() {
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json")
      .then((res) => res.json())
      .then((data) => {
        const langs = Array.from(new Set<string>(
          data
            .filter((lang: { title: string; value: string }) => lang.value)
            .map((lang: { title: string; value: string }) => lang.value)
        ));
        setLanguages(langs);
        if (langs.length > 0) {
          setSelectedLanguage(langs[0]);
        }
      })
      .catch((err) => console.error("Failed to load languages:", err));
  }, []);
  const [repo, setRepo] = useState<Repository | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const fetchRandomRepo = async () => {
    setIsLoading(true);
    setError(null);
    setIsEmpty(false);
    setRepo(null);

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=language:${encodeURIComponent(
          selectedLanguage
        )}&sort=stars&order=desc&per_page=100` // Fetch top 100 for a good random sample
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("GitHub API rate limit exceeded. Please try again later.");
        }
        throw new Error("Failed to fetch repositories. Please try again.");
      }

      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        setIsEmpty(true);
        return;
      }

      const randomIndex = Math.floor(Math.random() * data.items.length);
      setRepo(data.items[randomIndex]);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900/30 dark:selection:text-blue-100 flex flex-col items-center">
      <div className="w-full max-w-xl space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl mb-2 shadow-sm ring-1 ring-blue-100 dark:ring-blue-900/30">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.087.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.01 10.01 0 0022 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Repo Finder
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover randomly selected GitHub repositories based on your favorite programming language.
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-white dark:bg-zinc-800/80 p-6 sm:p-8 rounded-[2rem] shadow-xl border border-gray-100 dark:border-zinc-700/50 backdrop-blur-xl">
          <div className="space-y-6">
            <LanguageSelector
              languages={languages}
              selectedLanguage={selectedLanguage}
              onSelect={setSelectedLanguage}
              disabled={isLoading}
            />

            <button
              onClick={fetchRandomRepo}
              disabled={isLoading || languages.length === 0}
              className="w-full relative group overflow-hidden bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-zinc-800 shadow-md hover:shadow-xl active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Fetching...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Find Repository
                  </>
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="min-h-[300px] transition-all duration-500">
          {isLoading && <LoadingState />}

          {error && !isLoading && <ErrorState message={error} onRetry={fetchRandomRepo} />}

          {isEmpty && !isLoading && !error && (
            <div className="p-8 text-center bg-gray-50 dark:bg-zinc-800/30 rounded-3xl border border-gray-100 dark:border-zinc-700/50">
              <div className="inline-flex bg-gray-100 dark:bg-zinc-800 p-3 rounded-full mb-4">
                <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-medium font-lg">No repositories found for {selectedLanguage}.</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Try selecting a different programming language.</p>
            </div>
          )}

          {repo && !isLoading && !error && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
              <RepoCard repo={repo} />

              <button
                onClick={fetchRandomRepo}
                className="w-full group flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800/80 border-2 border-dashed border-gray-200 dark:border-zinc-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-zinc-700/50 hover:border-gray-300 dark:hover:border-zinc-600 transition-all focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-zinc-600 active:scale-[0.99]"
              >
                <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
