export const renderRating = (score = 0) => {
  switch (score) {
    case score >= 85:
      return <span>Tốt</span>;
    case score >= 70 && score < 85:
      return <span>Ổn</span>;
    default:
      return <span>Không ổn</span>;
  }
};
