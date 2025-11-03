export default function Header() {
  return (
    <header className="text-center mb-6 md:mb-8 mt-4 md:mt-6">
      <div className="flex items-center justify-center gap-2 md:gap-3 mb-2">
        <span className="text-3xl md:text-4xl">📋</span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
          Task Manager
        </h1>
      </div>
      <p className="text-gray-600 text-xs md:text-sm lg:text-base px-4">
        Manage your daily tasks efficiently.
      </p>
    </header>
  );
}

