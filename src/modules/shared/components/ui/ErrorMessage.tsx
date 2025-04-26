import { MdErrorOutline } from "react-icons/md";

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorMessage({
  message = "Something went wrong",
  onRetry,
  className = "",
}: Readonly<ErrorProps>) {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center ${className}`}
    >
      {/* Error Icon */}
      <div className="text-red-500 text-4xl">
          <MdErrorOutline />    
      </div>

      {/* Error Message */}
      <p className="text-gray-600 text-lg font-medium">{message}</p>

      {/* Retry Button (Optional) */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="py-2 px-16 rounded-full bg-[#4F709C] text-white font-medium hover:bg-[#4F709C]/80 transition-all duration-300"
        >
          Retry
        </button>
      )}
    </div>
  );
}