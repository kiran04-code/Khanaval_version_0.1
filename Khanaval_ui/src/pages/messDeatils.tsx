import { useParams } from "react-router-dom";

export default function MessDetails() {
  const { messId } = useParams<{ messId: string }>();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">
        Mess ID: {messId}
      </h1>
    </div>
  );
}
