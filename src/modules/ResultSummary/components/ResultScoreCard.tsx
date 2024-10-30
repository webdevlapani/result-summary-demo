interface ResultScoreDisplayProps {
  score: number;
}

// Functional component to display the user's score in a visually engaging way
export const ResultScoreCard: React.FC<ResultScoreDisplayProps> = ({
  score,
}) => {
  return (
    <div className="bg-gradient-to-b from-light-slate-blue to-light-royal-blue text-white md:rounded-[30px] rounded-b-[30px] p-6 md:flex-1 flex justify-center flex-col items-center">
      <h2 className="text-lg font-medium mb-8 text-center opacity-65">
        Your Result
      </h2>
      <div className="flex justify-center items-center flex-col mb-[26px] w-[185px] h-[185px] rounded-full bg-gradient-to-b from-violet-blue to-persian-blue">
        <span className="text-6xl font-bold font-hanken">{score}</span>
        <span className="text-lg">of 100</span>
      </div>
      <p className="text-[29px] font-semibold text-center mb-2">Great</p>
      <p className="text-center text-md px-[28px] opacity-65">
        You scored higher than 65% of the people who have taken these tests.
      </p>
    </div>
  );
};
