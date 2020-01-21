module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    age: DataTypes.INTEGER,
    sex: DataTypes.STRING,
    occupation: DataTypes.STRING,
    homeAddress: DataTypes.STRING,
    officeAd: DataTypes.STRING
  });
  User.associate = (models) => {
    User.hasMany(models.Borrow, {
      foreignKey: 'userId',
    });
  };

  User.associate = (models) => {
    User.hasMany(models.Fine, {
      foreignKey: 'userId',
    });
  };
  return User;
};

