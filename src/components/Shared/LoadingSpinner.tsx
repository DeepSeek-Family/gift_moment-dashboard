export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-[#F6339A]/30 border-t-[#F6339A] rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-[#F6339A] text-sm tracking-wider animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
