"use client";

import { useState } from "react";

export interface Repository {
    name: string;
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    html_url: string;
    language: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

interface RepoCardProps {
    repo: Repository;
}

export default function RepoCard({ repo }: RepoCardProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(repo.html_url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    return (
        <div className="group relative w-full bg-white dark:bg-zinc-800/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-zinc-700/50 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <img
                        src={repo.owner.avatar_url}
                        alt={`${repo.owner.login} avatar`}
                        className="w-12 h-12 rounded-full border-2 border-white dark:border-zinc-700 shadow-sm"
                    />
                    <div>
                        <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white line-clamp-1 break-all">
                            {repo.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            by <span className="font-medium text-gray-700 dark:text-gray-300">{repo.owner.login}</span>
                        </p>
                    </div>
                </div>

                <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-zinc-700/50 dark:hover:bg-zinc-700 transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="Copy repository link"
                >
                    {copied ? (
                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    )}
                </button>
            </div>

            <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
                {repo.description || "No description provided."}
            </p>

            <div className="mt-6 flex flex-wrap gap-4 items-center">
                {repo.language && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-100 dark:border-blue-500/20">
                        <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                        {repo.language}
                    </div>
                )}
                <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 font-medium">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {repo.stargazers_count.toLocaleString()}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 font-medium">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                    {repo.forks_count.toLocaleString()} Forks
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 font-medium">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {repo.open_issues_count.toLocaleString()} Issues
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-700/50">
                <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white dark:focus:ring-offset-zinc-800"
                >
                    View on GitHub
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
        </div>
    );
}
