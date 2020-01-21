module.exports = (sequelize, DataTypes) => {
  const Borrow = sequelize.define('Borrow', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    dofborrow: DataTypes.DATE,
    expiry: DataTypes.DATE,
    dofreturn: DataTypes.DATE,
    isReturned: DataTypes.BOOLEAN
  });
  Borrow.associate = (models) => {
    Borrow.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  Borrow.associate = (models) => {
    Borrow.belongsTo(models.Book, {
      foreignKey: 'bookId',
    });
  };
  return Borrow;
};
