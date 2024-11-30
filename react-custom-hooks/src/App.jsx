import Card from "../components/Card";
import Counter from "../components/Counter";
import NetworkStatus from "../components/NetworkStatus";
import Search from "../components/Search";
import Users from "../components/Users";
import "./App.css";

function App() {
  return (
    <>
      <h1>Custom Hooks</h1>
      <Card title="useFetch Hook">
        <Users />
      </Card>

      <Card title="usePrev Hook">
        <Counter />
      </Card>

      <Card title="useIsOnline Hook">
        <NetworkStatus />
      </Card>

      <Card title="useDebounce Hook">
        <Search />
      </Card>
    </>
  );
}

export default App;
