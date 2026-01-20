import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MessDetails() {
  const { messId } = useParams<{ messId: string }>();
  const [currentMessId, setCurrentMessId] = useState<string | null>(null);

  useEffect(() => {
    if (messId) setCurrentMessId(messId);
  }, [messId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Mess Details
      </h1>

      {currentMessId ? (
        <p className="text-xl text-gray-600">
          Mess ID: <span className="font-semibold">{currentMessId}</span>
        </p>
      ) : (
        <p className="text-gray-400">Loading...</p>
      )}
    </div>
  );
}
