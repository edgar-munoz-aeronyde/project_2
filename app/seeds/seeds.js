module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('logins', [{
          user_name: 'admin',
          password: '123'
        }], {});
    },
  
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
    }
  };