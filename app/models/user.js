module.exports = function(sequelize, DataTypes){
    var User = sequelize.define('user',{
        client_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }},
     
        type_of_submission: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }},
     
        client_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                    len: [1]
                }},
        drone_reg_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
              }},
        time_submitted: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }},
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }},
        features: {
            type: DataTypes.JSON,
            allowNull: false,
            validate: {
                len: [1]
            }},
        approval_status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
     
     });   
     return User; 
};