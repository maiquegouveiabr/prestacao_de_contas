import type { Zone } from "@/interfaces";
import { useEffect, useState } from "react";

export default function useZones() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [zonesLoading, setZonesLoading] = useState(true);

  useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = async () => {
    setZonesLoading(true); // Optional: useful if you call fetchZones manually later
    try {
      const res = await fetch("/api/zones");
      const data = await res.json();
      setZones(data);
    } finally {
      setZonesLoading(false);
    }
  };

  return { zones, zonesLoading, fetchZones };
}
