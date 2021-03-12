import { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import SideMenu from "./components/side-menu/Side-Menu.jsx";
import Footer from "./components/footer.jsx";
import Header from "./components/header/header.jsx";
import DataCardSmall from "./components/cards/data-card-small.jsx";
import ProductDetailCard from "./components/product-detail-card/Product-Detail-Card.jsx";
import CategoryCards from "./components/cards/category-cards/category-card.jsx";
import AllProdsInDb from "./components/allProds/allProdsInDb.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smallCardValues: [
        {
          title: "Products in Data Base",
          value: "135",
          icon: "fa-clipboard-list",
          color: "primary",
        },
        {
          title: "Amount in products",
          value: "$546.456",
          icon: "fa-dollar-sign",
          color: "success",
        },
        {
          title: "Users quantity",
          value: "38",
          icon: "fa-user-check",
          color: "warning",
        },
      ],
    };
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:3030/api/products/count");
    const countResponse = await response.json()
    const smallCardValues = [
        {
          title: "Products in Data Base",
          value: countResponse.count,
          icon: "fa-clipboard-list",
          color: "primary",
        },
        {
          title: "Amount in products",
          value: countResponse.count,
          icon: "fa-dollar-sign",
          color: "success",
        },
        {
          title: "Users quantity",
          value: countResponse.count,
          icon: "fa-user-check",
          color: "warning",
        },
    ]
    console.log(countResponse)
    this.setState({ smallCardValues,})
  }
  render() {
    return (
      <div className="App">
        <div id="wrapper">
          <SideMenu />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Header />
              <div className="container-fluid">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 class="h3 mb-0 text-gray-800">App Dashboard</h1>
                </div>

                <div className="row">
                  {this.state.smallCardValues.map((element, i) => {
                    return (
                      <DataCardSmall
                        key={i}
                        title={element.title}
                        color={element.color}
                        icon={element.icon}
                        value={element.value}
                      />
                    );
                  })}
                </div>
                <div className="row">
                  <ProductDetailCard />
                  <CategoryCards />
                </div>
                <h1 class="h3 mb-2 text-gray-800">
                  All the products in the Database
                </h1>
                <AllProdsInDb />
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
