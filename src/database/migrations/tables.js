/**
    - En este archivo se debe colocar la estructura final de cada uno de los modelos del sitio.
    - El código buscará en este listado cada uno de los modelos para luego sincronizar la base
    de datos creándolos con su respectiva estructura y asociaciones.
    - Favor colocar los modelos en orden alfabético para mejor búsqueda.
    - Los modelos en la carpeta "models/" no se utilizan para esto debido a que se generan
    conflictos con las relaciones 1:N.
    - El atributo "order" se utiliza para crear las tablas y su relación de acuerdo a sus aso-
    ciaciones sin generar conflictos con las llaves foráneas.
*/

import Sequelize from 'sequelize';
import { sequelize } from '../connection';

export const tables = [
    {
        name: 'Address',
        order: 5,
        belongsTo: [
            {modelName: 'AddressType', foreignKey: 'address_type_id'}
        ],
        instance: sequelize.define('Address', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            street: {
                type: Sequelize.STRING
            },
            number: {
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            address_type_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            customer_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            district_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()')
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null
            }
        }, {
            timestamps: false,
            tableName: 'addresses'
        })
    },
    {
        name: 'Brand',
        order: 1,
        instance: sequelize.define('brands', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false
            }
        }, {
            timestamps: false,
            tableName: 'brands'
        })
    },
    {
        name: 'AddressType',
        order: 1,
        instance: sequelize.define('AddressType', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(30),
                allowNull: false
            }
        },{
            timestamps: false,
            tableName: 'address_types'
        })
    },
    {
        name: 'Customer',
        order: 4,
        belongsTo: [
            {modelName: 'User', foreignKey: 'user_id'}
        ],
        instance: sequelize.define('Customer', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            rut: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            last_name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()')
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true
            }
        }, {
            timestamps: false,
            tableName: 'customers'
        })
    },
    {
        name: 'District',
        order: 3,
        belongsTo: [
            {modelName: 'Province', foreignKey: 'province_id'}
        ],
        instance: sequelize.define('District', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            province_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        },{
            timestamps: false,
            tableName: 'districts'
        })
    },
    {
        name: 'Dte',
        order: 3,
        instance: sequelize.define('Dte', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            order_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        }, {
            tableName: 'dtes'
        })
    },
    {
        name: 'Order',
        order: 5,
        belongsTo: [
            {modelName: 'Customer', foreignKey: 'customer_id'},
            {modelName: 'OrderType', foreignKey: 'order_type_id'},
            {modelName: 'PaymentMethod', foreignKey: 'payment_method_id'},
        ],
        instance: sequelize.define('Order',{
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            code: {
                type: Sequelize.STRING,
                allowNull: false
            },
            total_price: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            total_discounts: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            shipping_price: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            total_to_pay: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            customer_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            order_step_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            order_type_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            payment_method_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()')
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null
            }
        },{
            timestamps: false,
            tableName: 'orders'
        })
    },
    {
        name: 'OrderProduct',
        order: 6,
        belongsTo: [
            {modelName: 'Product', foreignKey: 'product_id'},
            {modelName: 'Order', foreignKey: 'order_id'}
        ],
        instance: sequelize.define('OrderProduct',{
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            quantity: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            total_price: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            total_discount: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            order_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()')
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null
            }
        },{
            timestamps: false,
            tableName: 'order_products'
        })
    },
    {
        name: 'OrderStep',
        order: 1,
        instance: sequelize.define('OrderStep', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            }
        },{
            timestamps: false,
            tableName: 'order_steps'
        })
    },
    {
        name: 'OrderType',
        order: 1,
        instance: sequelize.define('OrderType', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false
            }
        },{
            timestamps: false,
            tableName: 'order_types'
        })
    },
    {
        name: 'PaymentMethod',
        order: 1,
        instance: sequelize.define('PaymentMethod', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            api_key: {
                type: Sequelize.STRING
            }
        },{
            timestamps: false,
            tableName: 'payment_methods'
        })
    },
    {
        name: 'Product',
        order: 3,
        instance: sequelize.define('Product',{
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            sku: {
                type: Sequelize.STRING,
                allowNull: false 
            },
            code: {
                type: Sequelize.STRING,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            tax: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            offer_price: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            offer_percentage: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            product_category_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            brand_id: {
                type: Sequelize.INTEGER
            },
            stock: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()')
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null
            }
        },{
            timestamps: false,
            tableName: 'products'
        })
    },
    {
        name: 'ProductCategory',
        order: 1,
        instance: sequelize.define('ProductCategory', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            icon: {
                type: Sequelize.STRING(255),
                defaultValue: null
            },
            priority: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            product_category_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()')
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true
            }
        }, {
            timestamps: false,
            tableName: 'product_categories'
        })
    },
    {
        name: 'ProductImage',
        order: 4,
        belongsTo: [
            {modelName: 'Product', foreignKey: 'product_id'}
        ],
        instance: sequelize.define('ProductImage', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            image: {
                type: Sequelize.TEXT
            },
            url: {
                type: Sequelize.TEXT
            },
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        }, {
            timestamps: false,
            tableName: 'product_images'
        })
    },
    {
        name: 'Province',
        order: 2,
        belongsTo: [
            {modelName: 'State', foreignKey: 'state_id'}
        ],
        instance: sequelize.define('Province', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            state_id: {
                type: Sequelize.INTEGER
            }
        },{
            timestamps: false,
            tableName: 'provinces'
        })
    },
    {
        name: 'Role',
        order: 1,
        instance: sequelize.define('Role', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false
            }
        }, {
            tableName: 'roles',
            timestamps: false
        })
    },
    {
        name: 'Slider',
        order: 1,
        instance: sequelize.define('Slider',{
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: Sequelize.STRING(255)
            },
            subtitle: {
                type: Sequelize.STRING(255)
            },
            body: {
                type: Sequelize.STRING(255)
            },
            link: {
                type: Sequelize.STRING(255)
            }
        },{
            timestamps: false,
            tableName: 'sliders'
        })
    },
    {
        name: 'State',
        order: 1,
        instance: sequelize.define('State',{
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            }
        },{
            timestamps: false,
            tableName: 'states'
        })
    },
    {
        name: 'User',
        order: 2,
        belongsTo: [
            {modelName: 'Role', foreignKey: 'role_id'}
        ],
        instance: sequelize.define('User',{
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            username: {
                type: Sequelize.STRING(255),
                unique: true,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            role_id: {
                type: Sequelize.INTEGER,
                defaultValue: 2
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()')
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null
            }
        },{
            timestamps: false,
            tableName: 'users'
        })
    }
];