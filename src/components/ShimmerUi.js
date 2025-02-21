const ShimmerUi = () => {
  return (
    <div className="ShimShim">
      {Array.from({ length: 15 }, (_, index) => (
        <div key={index} className="Shimpu"></div>
      ))}
    </div>
  );
};

export default ShimmerUi;
