"use client"

export default function PageTransition({ children }) {
  return (
    <div className="animate-[fadeIn_0.7s_ease]">
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {children}
    </div>
  )
}
