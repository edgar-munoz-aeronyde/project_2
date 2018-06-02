module.exports = function(sequelize, DataTypes){
    var Login= sequelize.define('logins',{

        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }},
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }},
     
     });  

     return Login;
};
 