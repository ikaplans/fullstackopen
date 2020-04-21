import React, { useState } from "react";
import ReactDOM from "react-dom";

const FeedbackButton = (props) => {
  const { text, handleAction } = props;
  return <button onClick={handleAction}>{text}</button>;
};

const Statistic = (props) => {
  const { text, value } = props;
  return (
    <tr key={text}>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const total = good + neutral + bad;
  const positive = total === 0 ? 0 : good / (total / 100);
  const average = total === 0 ? 0 : (good * 1 + bad * -1) / total;
  return [
    <h1 key="statsHeader">statistics</h1>,
    total === 0 ? (
      <div key="noFeedbackMessage">{"No feedback given"}</div>
    ) : (
      <div key="statsTable">
        <table>
          <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={total} />
            <Statistic text="average" value={average} />
            <Statistic text="positive" value={`${positive} %`} />
          </tbody>
        </table>
      </div>
    ),
  ];
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const calculateStatistics = (value) => {
    switch (value) {
      case 1:
        setGood(good + 1);
        break;
      case -1:
        setBad(bad + 1);
        break;
      case 0:
        setNeutral(neutral + 1);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <FeedbackButton
          text="good"
          handleAction={() => calculateStatistics(1)}
        />
        <FeedbackButton
          text="neutral"
          handleAction={() => calculateStatistics(0)}
        />
        <FeedbackButton
          text="bad"
          handleAction={() => calculateStatistics(-1)}
        />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
