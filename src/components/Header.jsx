import { Glasses } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-2">
        <Glasses className="w-10 h-10" />
        Virtual Glasses Try-On
      </h1>
      <p className="text-gray-600 mt-2">
        Try on different glasses virtually using your camera
      </p>
    </div>
  );
}