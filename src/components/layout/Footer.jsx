export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} Parkit. All rights reserved.</p>
      </div>
    </footer>
  );
}
