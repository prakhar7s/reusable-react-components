import "./circular-progress-bar.css";

const CircularProgressBar = ({}) => {
  return (
    <div className="main-container">
      <div className="chart-container">
        <div className="chart-content">
          <span className="heading">Balance</span>
          <span className="count">20k</span>
        </div>
        <div class="chart-svg">
          <svg viewBox="0 0 36 36" class="circular-chart orange">
            <path
              class="circle-bg pink"
              d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
            ></path>
            <path
              class="circle pink"
              stroke-dasharray="60, 100"
              d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
            ></path>
            <text x="18" y="20.35" class="percentage">
              60%
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBar;
