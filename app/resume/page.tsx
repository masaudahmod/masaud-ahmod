export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <iframe
        src="/public/masaud-resume.pdf"
        className="w-full h-screen border-none"
        title="Masaud Resume"
      />
    </div>
  );
}
