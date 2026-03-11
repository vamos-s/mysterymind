'use client';

export default function ScenarioCard({ scenario }: { scenario: string }) {
  return (
    <div className="mb-6 p-6 bg-indigo-50 dark:bg-gray-800 rounded-xl border-2 border-indigo-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-300 mb-3 flex items-center gap-2">
        📜 Scenario
      </h3>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{scenario}</p>
    </div>
  );
}
