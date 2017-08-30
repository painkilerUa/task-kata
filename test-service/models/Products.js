"use strict";

module.exports = (sequelize, DataTypes) => {
    let Products = sequelize.define("products", {
        sku: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'sku_index'
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        attr_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {underscored: true});

    return Products;
};
