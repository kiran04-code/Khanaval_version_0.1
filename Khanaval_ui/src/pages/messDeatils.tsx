import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function MessDetails() {
  const { messId } = useParams();

  return <h1>Mess ID: {messId}</h1>;
}
