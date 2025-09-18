import CodeGist from "./components/CodeGist";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Code Gist Viewer</h1>
        <CodeGist />
      </div>
    </div>
  );
}

export default App;

