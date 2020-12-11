import Address from './Address';
import AddressType from './AddressType';
import Brand from './Brand';
import Customer from './Customer';
import District from './District';
import Dte from './Dte';
import Order from './Order';
import OrderProduct from './OrderProduct';
import OrderStep from './OrderStep';
import OrderType from './OrderType';
import PaymentMethod from './PaymentMethod';
import Product from './Product';
import ProductCategory from './ProductCategory';
import ProductImage from './ProductImage';
import Province from './Province';
import Role from './Role';
import Slider from './Slider';
import State from './State';
import User from './User';

Order.hasOne( Dte, {foreignKey: 'order_id', sourceKey: 'id' });

Address.belongsTo(AddressType    , { foreignKey: 'address_type_id'      });
Address.belongsTo(District       , { foreignKey: 'district_id'          });
Address.belongsTo(Customer       , { foreignKey: 'customer_id'          });
Customer.belongsTo(User          , { foreignKey: 'user_id'              });
District.belongsTo(Province      , { foreignKey: 'province_id'          });
Order.belongsTo( Customer        , { foreignKey: 'customer_id'          });
Order.belongsTo( OrderType       , { foreignKey: 'order_type_id'        });
Order.belongsTo( OrderStep       , { foreignKey: 'order_step_id'        });
Order.belongsTo( PaymentMethod   , { foreignKey: 'payment_method_id'    });
OrderProduct.belongsTo(Product   , { foreignKey: 'product_id'           });
OrderProduct.belongsTo(Order     , { foreignKey: 'order_id'             });
Product.belongsTo(Brand          , { foreignKey: 'brand_id'             });
Product.belongsTo(ProductCategory, { foreignKey: 'product_category_id'  });
ProductImage.belongsTo( Product  , { foreignKey: 'product_id'           });
Province.belongsTo(State         , { foreignKey: 'state_id'             });
User.belongsTo(Role              , { foreignKey: 'role_id'              });

AddressType.hasMany(Address      , { foreignKey: 'address_type_id'      });
Customer.hasMany(Address         , { foreignKey: 'customer_id'          });
Customer.hasMany(Order           , { foreignKey: 'customer_id'          });
District.hasMany(Address         , { foreignKey: 'district_id'          });
Order.hasMany(OrderProduct       , { foreignKey: 'order_id'             });
OrderStep.hasMany(Order          , { foreignKey: 'order_step_id'        });
Brand.hasMany(Product            , { foreignKey: 'brand_id'             });
Product.hasMany( ProductImage    , { foreignKey: 'product_id'           });
ProductCategory.hasMany(Product  , { foreignKey: 'product_category_id'  });
ProductCategory.hasMany(ProductCategory, {foreignKey: 'product_category_id' });

module.exports = {
    Address,
    AddressType,
    Brand,
    Customer,
    District,
    Dte,
    Order,
    OrderProduct,
    OrderStep,
    OrderType,
    PaymentMethod,
    Product,
    ProductCategory,
    ProductImage,
    Province,
    Role,
    Slider,
    State,
    User
}