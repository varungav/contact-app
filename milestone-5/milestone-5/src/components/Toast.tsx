import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface ToastProps {
  show: boolean;
  onClose: () => void;
  message: string;
  type?: "success" | "error";
}

const Toast = ({ show, onClose, message, type = "success" }: ToastProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  const bgColor = type === "success" ? "#EBFFF1" : "#FFEAEA";
  const icon = type === "success" ? "src/assets/Toast_tick.png" : "src/assets/Toast_error.png";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: -50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, y: -20 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="fixed top-6 right-6 z-50 flex items-center gap-4 text-black px-14 py-4 rounded-lg shadow-lg"
          style={{ backgroundColor: bgColor }}
        >
          <div className="flex items-center gap-3">
            <div className=" flex items-center justify-center">
              <img
                src={icon}
                alt={type === "success" ? "Success Icon" : "Error Icon"}
                className=""
                width={34}
                height={34}
              />
            </div>
            <span className="text-sm font-medium text-green-800">{message}</span>
          </div>

          {/* Right: Close (X) icon */}
          <button onClick={onClose} className="p-1 hover:bg-green-200 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-green-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
