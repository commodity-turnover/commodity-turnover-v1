import News from "../News/News";
import Products from "../Products/Products";
import SearchPartners from "../SearchPartners/SearchPartners";
import Settings from "../Settings/Settings";

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
      tabContent = <SearchPartners />;
      break;
    case "settings":
      tabContent = <Settings toggleModal={props.toggleModal} />;
      break;
    default:
      tabContent = <News />;
  }
  return <div>{tabContent}</div>;
};

export default TabAction;
