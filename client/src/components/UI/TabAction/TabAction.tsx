import News from "../News/News";
import Products from "../Products/Products";

const TabAction = (props: any) => {
  let tabContent = null;

  switch (props.tabName) {
    case "news":
      tabContent = <News />;
      break;
    case "products":
      tabContent = (
        <Products
        products={props.products}
        setProducts={props.setProducts}
          toggleAddModal={props.toggleAddModal}
          toggleModal={props.toggleModal}
          setSelectedProductData={props.setSelectedProductData}
          setLoadingProduct={props.setLoadingProduct}
        />
      );
      break;
    case "orders":
      tabContent = <div>Orders</div>;
      break;
    case "s_products":
      tabContent = <div>Search products</div>;
      break;
    case "s_partners":
      tabContent = <div>Search Partners</div>;
      break;
    case "settings":
      tabContent = <div>Settings</div>;
      break;
    default:
      tabContent = <div>News</div>;
  }
  return <div>{tabContent}</div>;
};

export default TabAction;
