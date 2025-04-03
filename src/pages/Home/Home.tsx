import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../redux/slices/counterSlice";
import type { RootState } from "../../redux/store";

const Home = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => state.counter.value);

  const handleIncrease = () => {
    dispatch(increment());
  };
  const handleDecrease = () => {
    dispatch(decrement());
  };

  return (
    <div className="home">
      <h1>Welcome to the Home Page</h1>
      <div>
        <button onClick={handleIncrease}>Increase</button>
        <button onClick={handleDecrease}>Decrease</button>
      </div>
      <div className="counter">Counter: {counter}</div>
    </div>
  );
};

export default Home;
