module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Todo", {
        description: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true}  },
        done: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
    }, {
        tableName: "todos"
    });
};
