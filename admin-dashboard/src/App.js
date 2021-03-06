import logo from "./logo.svg";
import "./App.css";
import SideMenu from "./components/side-menu/Side-Menu.jsx";
import Footer from "./components/footer.jsx";
import Header from "./components/header/header.jsx";
import DataCardSmall from "./components/cards/data-card-small.jsx";
import ProductDetailCard from "./components/product-detail-card/Product-Detail-Card.jsx";
import CategoryCards from "./components/cards/category-cards/category-card.jsx"
function App() {
  return (
    <div className="App">
      <div id="wrapper">
        <SideMenu />
        <div id="content-wrapper" class="d-flex flex-column">
          <div id="content">
            <Header />
            <div class="container-fluid">
              <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">App Dashboard</h1>
              </div>
              <div class="row">
                <DataCardSmall />
                <DataCardSmall />
                <DataCardSmall />
              </div>
              <div class="row">
                <ProductDetailCard />
                <CategoryCards/>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
