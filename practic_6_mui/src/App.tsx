import Header from "./components/Header";
import Gallery from "./components/Gallery";
import Content from "./components/content";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header activePage="main"/>
      <Gallery/>
      <Content/>
      <Footer/>
    </>

  );
}
 
export default App;
