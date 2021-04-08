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
          value: "n/a",
          icon: "fa-clipboard-list",
          color: "primary",
        },
        {
          title: "Amount in products",
          value: "n/a",
          icon: "fa-dollar-sign",
          color: "success",
        },
        {
          title: "Users quantity",
          value: "n/a",
          icon: "fa-user-check",
          color: "warning",
        },
      ],
    };
  }

  async queryProductsAPI(endpoint) {
    const response = await fetch(
      `http://localhost:3030/api/products/${endpoint}`
    );
    return await response.json();
  }
  async queryUsersAPI(endpoint) {
    const response = await fetch(`http://localhost:3030/api/users/${endpoint}`);
    return await response.json();
  }

  async getProductsCount() {
    const countResponse = await this.queryProductsAPI("count");
  
    return countResponse.count;
  }
  async getProductsTotalPrice() {
    const countResponse = await this.queryProductsAPI("totalPrice");
    return countResponse.totalPrice;
  }

  async getUsersCount() {
    const countResponse = await this.queryUsersAPI("count");
    return countResponse.finalCount;
  }

  ////////////////
  async updateData() {
    const smallCardValues = [
      {
        title: "Products in Data Base",
        value: (await this.getProductsCount("count")).toString(),
        icon: "fa-clipboard-list",
        color: "primary",
      },
      {
        title: "Amount in products",
        value: "$" + (await this.getProductsTotalPrice("totalPrice")).toString(),
        icon: "fa-dollar-sign",
        color: "success",
      },
      {
        title: "Users quantity",
        value: (await this.getUsersCount("count")).toString(),
        icon: "fa-user-check",
        color: "warning",
      },
    ];
    
    this.setState({ smallCardValues });
  }
  componentDidMount() {
    setInterval(() => {
      
      this.updateData()
     console.log("updated")
    },3000)
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
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
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
                <h1 className="h3 mb-2 text-gray-800">
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
