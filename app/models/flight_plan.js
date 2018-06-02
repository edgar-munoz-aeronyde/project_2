module.exports = function(sequelize, DataTypes){
    var Flight_plan= sequelize.define('flight_plans',{
 
        start_time: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                    len: [1]
                }},
        end_time: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
              }},
        max_altitude: {
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
     
     });
     return Flight_plan;
};

