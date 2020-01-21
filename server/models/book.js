module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    copiesAvailable: DataTypes.INTEGER,
    datePublished: DataTypes.DATE
  });
  Book.associate = (models) => {
    Book.belongsTo(models.Borrow, {
      foreignKey: 'id',
    });
  };
  return Book;
};
