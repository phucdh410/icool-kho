export const renderRating = (score = 0) => {
  if (score >= 85) {
    return (
      <span className="px-3 font-medium py-2 text-sm rounded-md text-white bg-[#20A686]">
        Tốt
      </span>
    );
  } else if (score >= 70 && score < 85) {
    return (
      <span className="px-3 font-medium py-2 text-sm rounded-md text-white bg-[#FFB946]">
        Ổn
      </span>
    );
  } else {
    return (
      <span className="px-3 font-medium py-2 text-sm rounded-md text-white bg-[#F7685B]">
        Không ổn
      </span>
    );
  }
};
