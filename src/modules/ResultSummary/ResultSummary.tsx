import { Loader } from "../../components";
import { ResultScoreCard, ResultSummaryList } from "./components";
import { SummaryItem } from "./types";
import { useResultSummary } from "./useResultSummary";

// Result Summary page for displaying the score
export const ResultSummary: React.FC = () => {
  const { totalScore, loading, data } = useResultSummary();

  // Display a loading spinner while data is being fetched.
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center md:h-screen">
      <div className="bg-white rounded-[30px] shadow-[10px_10px_30px_14px_rgb(1_76_161_/_10%)] max-w-md w-full md:flex md:max-w-[686px] md:h-[476px]">
        {/* Display the total score rounded to the nearest integer */}
        <ResultScoreCard score={Math.round(totalScore)} />
        {/* Display the list of summary items, casting 'data' as the expected SummaryItem array */}
        <ResultSummaryList summary={data as SummaryItem[]} />
      </div>
    </div>
  );
};
