"use strict";

module.exports = (sequelize, DataTypes) => {
    let Sales = sequelize.define("sales", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        value: DataTypes.INTEGER,
        full_price: DataTypes.INTEGER,
        free_item_id: DataTypes.INTEGER
    }, {underscored: true});

    return Sales;
};
