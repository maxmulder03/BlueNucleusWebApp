function ProgressWheel() {
  return (
    <div className="pie-wrapper progress-30">
      <span className="label">
        30<span className="smaller"></span>
      </span>
      <div className="pie">
        <div className="left-side half-circle"></div>
        <div className="right-side half-circle"></div>
      </div>
    </div>
  );
}

export default ProgressWheel;
