"use client";

export default function LoadingState() {
    return (
        <div className="w-full bg-white dark:bg-zinc-800/80 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-zinc-700/50 backdrop-blur-xl animate-pulse">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4 w-full">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-zinc-700" />
                    <div className="flex-1 space-y-2">
                        <div className="h-5 bg-gray-200 dark:bg-zinc-700 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-1/3"></div>
                    </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-zinc-700 shrink-0"></div>
            </div>

            <div className="mt-6 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-5/6"></div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 items-center">
                <div className="h-6 bg-gray-200 dark:bg-zinc-700 rounded-full w-20"></div>
                <div className="h-5 bg-gray-200 dark:bg-zinc-700 rounded w-16"></div>
                <div className="h-5 bg-gray-200 dark:bg-zinc-700 rounded w-16"></div>
                <div className="h-5 bg-gray-200 dark:bg-zinc-700 rounded w-16"></div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-700/50">
                <div className="h-10 bg-gray-200 dark:bg-zinc-700 rounded-xl w-full"></div>
            </div>
        </div>
    );
}
