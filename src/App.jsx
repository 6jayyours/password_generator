import PasswordGenerator from "./components/PasswordGenerator";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <main className="md:flex max-w-screen-2xl mx-auto overflow-x-hidden">
        <div className="md:w-1/3 h-screen">
          <UserProfile />
        </div>
        <div className="md:w-2/3 h-screen flex items-center justify-center ">
          <PasswordGenerator />
        </div>
      </main>
    </div>
  );
}

export default App;
