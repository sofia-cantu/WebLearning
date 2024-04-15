import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Header />
      <main className="flex-grow w-full max-w-4xl shadow-lg mt-6 mb-6 bg-white">  
        <MainContent />
      </main>
      <Footer />
    </div>
  );
}

export default App;
