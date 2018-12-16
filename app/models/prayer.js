module.exports = function(sequelize, DataTypes) {
    var Prayer = sequelize.define("Prayer", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    
    return Prayer;
};
