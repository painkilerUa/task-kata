"use strict";

module.exports = (sequelize, DataTypes) => {
    let Sales = sequelize.define("sales", {
        sku: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        value: DataTypes.INTEGER,
        full_price: DataTypes.INTEGER,
        free_item_sku: DataTypes.STRING
    }, {underscored: true});

    return Sales;
};
