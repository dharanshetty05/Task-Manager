'use client';

export default function EmptyState() {
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
      <div className="text-center">
        <div className="text-5xl md:text-6xl mb-4">🎉</div>
        <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
          You're all caught up!
        </h3>
        <p className="text-gray-500 text-xs md:text-sm">
          Add your first task to get started.
        </p>
      </div>
    </div>
  );
}

