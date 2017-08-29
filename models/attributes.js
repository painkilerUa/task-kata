"use strict";

module.exports = (sequelize, DataTypes) => {
    let Attributes = sequelize.define("attributes", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        caption: DataTypes.STRING
    }, {underscored: true});

    return Attributes;
};
