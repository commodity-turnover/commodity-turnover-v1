import React from 'react'
import Products from '../Products/Products';

const UserActionComponent = (props: any) => {
    let tabContent = null;
    
    
    switch(props.tabName) {
        case "products":
            tabContent = <Products />
            break;
        case "orders":
            tabContent = <div>Oreders</div>
            break;
        case "s_products":
            tabContent = <div>Search products</div>
            break;
        case "s_partners":
            tabContent = <div>Search Partners</div>
            break;
        case "settings":
            tabContent = <div>Settings</div>
            break;
        default:
            tabContent = <Products />
    }
  return (
    <div>{tabContent}</div>
  )
}

export default UserActionComponent