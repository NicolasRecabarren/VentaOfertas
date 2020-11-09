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
import { sequelize } from '../database/connection';

export const tables = [
    {
        name: 'Address',
        order: 5,
        belongsTo: [
            {modelName: 'AddressType', foreignKey: 'address_type_id'}
        ],
        instance: sequelize.define('addresses', {
            id: {
                type: Sequelize.INTEGER,
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
            }
        })
    },
    {
        name: 'AddressType',
        order: 1,
        instance: sequelize.define('address_types', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(30),
                allowNull: false
            }
        },{ timestamps: false })
    },
    {
        name: 'Customer',
        order: 4,
        belongsTo: [
            {modelName: 'User', foreignKey: 'user_id'}
        ],
        instance: sequelize.define('customers', {
            id: {
                type: Sequelize.INTEGER,
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
            }
        })
    },
    {
        name: 'District',
        order: 3,
        belongsTo: [
            {modelName: 'Province', foreignKey: 'province_id'}
        ],
        instance: sequelize.define('districts', {
            id: {
                type: Sequelize.INTEGER,
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
            // Con esto evitamos que cree las columnas createdAt y updatedAt al realizar las migraciones.
            timestamps: false
        })
    },
    {
        name: 'Dte',
        order: 3,
        instance: sequelize.define('dtes', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            order_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
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
        instance: sequelize.define('orders',{
            id: {
                type: Sequelize.INTEGER,
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
            order_type_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            payment_method_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        })
    },
    {
        name: 'OrderProduct',
        order: 6,
        belongsTo: [
            {modelName: 'Product', foreignKey: 'product_id'},
            {modelName: 'Order', foreignKey: 'order_id'}
        ],
        instance: sequelize.define('order_products',{
            id: {
                type: Sequelize.INTEGER,
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
            }
        })
    },
    {
        name: 'OrderStep',
        order: 1,
        instance: sequelize.define('order_steps', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false
            }
        })
    },
    {
        name: 'OrderType',
        order: 1,
        instance: sequelize.define('order_types', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false
            }
        })
    },
    {
        name: 'PaymentMethod',
        order: 1,
        instance: sequelize.define('payment_methods', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            api_key: {
                type: Sequelize.STRING
            }
        })
    },
    {
        name: 'Product',
        order: 3,
        instance: sequelize.define('products',{
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
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
            }
        })
    },
    {
        name: 'ProductCategory',
        order: 1,
        instance: sequelize.define('product_categories', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false
            }
        }, {
            timestamps: false
        })
    },
    {
        name: 'ProductType',
        order: 1,
        instance: sequelize.define('product_types', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(255)
            }
        },{ timestamps: false })
    },
    {
        name: 'Province',
        order: 2,
        belongsTo: [
            {modelName: 'State', foreignKey: 'state_id'}
        ],
        instance: sequelize.define('provinces', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            state_id: {
                type: Sequelize.INTEGER
            }
        },{ timestamps: false })
    },
    {
        name: 'Role',
        order: 1,
        instance: sequelize.define('roles', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false
            }
        }, { timestamps: false })
    },
    {
        name: 'Slider',
        order: 1,
        instance: sequelize.define('sliders',{
            id: {
                type: Sequelize.INTEGER,
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
        })
    },
    {
        name: 'State',
        order: 1,
        instance: sequelize.define('states',{
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            }
        },{ timestamps: false })
    },
    {
        name: 'User',
        order: 2,
        belongsTo: [
            {modelName: 'Role', foreignKey: 'role_id'}
        ],
        instance: sequelize.define('users',{
            id: {
                type: Sequelize.INTEGER,
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
            }
        })
    }
];