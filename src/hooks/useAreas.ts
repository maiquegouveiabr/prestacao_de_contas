import { Area } from "@/interfaces";
import { useEffect, useState } from "react";

export default function useAreas() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [areasLoading, setAreasLoading] = useState(true);

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    setAreasLoading(true); // Optional: in case you want to reload manually
    try {
      const res = await fetch("/api/areas");
      const data = await res.json();
      setAreas(data);
    } finally {
      setAreasLoading(false);
    }
  };

  return { areas, areasLoading, fetchAreas };
}
