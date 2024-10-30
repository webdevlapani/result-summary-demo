import { useEffect, useMemo, useState } from "react";
import { SummaryItem } from "./types";

export const useResultSummary = () => {
  const [data, setData] = useState<SummaryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalScore = useMemo(() => {
    return data.length
      ? data.reduce((acc, item) => acc + item.score, 0) / data.length
      : 0;
  }, [data]);

  return { totalScore, loading, data };
};
