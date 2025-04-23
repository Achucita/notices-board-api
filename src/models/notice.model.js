module.exports = (sequelize, Sequelize) => {
  const Notice = sequelize.define('notice', {
    title: { type: Sequelize.STRING, allowNull: false },
    content: { type: Sequelize.TEXT, allowNull: false },
    category: { type: Sequelize.STRING, allowNull: false },
    priority: { type: Sequelize.INTEGER, defaultValue: 1 },
    isActive: { type: Sequelize.BOOLEAN, defaultValue: true }
  });
  return Notice;
};
