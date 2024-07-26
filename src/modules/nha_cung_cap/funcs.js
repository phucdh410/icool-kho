export const renderRating = (score = 0) => {
  if (score >= 85) {
    return (
      <span className="px-4 py-2 text-sm rounded-md text-white bg-[#28a745]">
        Tốt
      </span>
    );
  } else if (score >= 70 && score < 85) {
    return (
      <span className="px-4 py-2 text-sm rounded-md text-white bg-[#FFB946]">
        Ổn
      </span>
    );
  } else {
    return (
      <span className="px-4 py-2 text-sm rounded-md text-white bg-[#dc3545]">
        Không ổn
      </span>
    );
  }
};
