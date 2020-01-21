module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Borrows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      bookId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      dofborrow: {
        allowNull: false,
        type: Sequelize.DATE
      },
      expiry: {
        allowNull: false,
        type: Sequelize.DATE
      },
      dofreturn: {
        allowNull: false,
        type: Sequelize.DATE
      },
      isReturned: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => queryInterface.dropTable('Borrows'),
};
