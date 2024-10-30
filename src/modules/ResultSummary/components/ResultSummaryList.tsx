import { SummaryItem } from "../types";
import { ResultSummaryItem } from "./ResultSummaryItem";

interface SummaryListProps {
  summary: SummaryItem[];
}

// Component that maps over a summary array to display a list of ResultSummaryItem components
export const ResultSummaryList: React.FC<SummaryListProps> = ({
  summary,
}: {
  summary: SummaryItem[];
}) => (
  <div className="flex-1 mt-4 md:mt-0 p-[32px] md:p-[38px]">
    <h2 className="text-lg font-semibold mb-[28px] text-gray-800">Summary</h2>

    <div className="flex flex-col gap-4">
      {summary.map((item: SummaryItem) => {
        return <ResultSummaryItem item={item} key={item.category} />;
      })}
    </div>
    <button className="w-full hover:bg-gradient-to-br hover:from-light-slate-blue hover:to-light-royal-blue text-white rounded-full py-3 bg-dark-gray-blue to-dark-gray-blue from-dark-gray-blue focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-[28px]">
      Continue
    </button>
  </div>
);

export default ResultSummaryList;
