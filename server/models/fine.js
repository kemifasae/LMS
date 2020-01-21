module.exports = (sequelize, DataTypes) => {
  const Fine = sequelize.define('Fine', {
    userId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    dofPay: DataTypes.DATE
  });
  Fine.associate = (models) => {
    Fine.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return Fine;
};
