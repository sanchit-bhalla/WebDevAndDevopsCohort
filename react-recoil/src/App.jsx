import "./App.css";
import Card from "./components/Card";
import Counter from "./components/Counter";
import RecoilCounter from "./components/RecoilCounter";
import TodoApp from "./components/TodoApp";

function App() {
  return (
    <div>
      <Card
        title="Counter using Context API"
        description="Unnecessary re-rendering of Increase and decrease button components"
      >
        <Counter />
      </Card>

      <Card
        title="Counter using Recoil"
        description="NO unnecessary re-rendering. Only Count component rerenders when count changes"
      >
        <RecoilCounter />
      </Card>

      <br />
      <hr />
      <br />

      {/* <h2>Todo App Using Recoil</h2> */}

      <Card title="Todo App Using Recoil">
        <TodoApp />
      </Card>
    </div>
  );
}

export default App;
