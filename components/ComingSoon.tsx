"use client";

interface ComingSoonProps {
  title: string;
}

export default function ComingSoon({ title }: ComingSoonProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#9333ea] text-white">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in">
          {title} Page Coming Soon
        </h1>
        <p className="text-lg md:text-xl text-gray-200">
          We&apos;re working on something amazing. Stay tuned!
        </p>
      </div>
    </div>
  );
}
