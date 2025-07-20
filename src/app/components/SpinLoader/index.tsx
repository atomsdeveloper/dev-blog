"use client";

type SpinLoaderProps = {
  SpinLoaderContainerClass?: string;
};

export function SpinLoader({ SpinLoaderContainerClass = "" }: SpinLoaderProps) {
  return (
    <div
      className={`flex items-center justify-center ${SpinLoaderContainerClass}`}
    >
      <div className="animate-spin rounded-full h-12 w-12 border-t-transparent border-5 border-gray-900"></div>
    </div>
  );
}
