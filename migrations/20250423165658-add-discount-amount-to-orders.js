export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("orders", "discount_amount", {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: true, // Kolom ini optional
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("orders", "discount_amount");
  },
};
