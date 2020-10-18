'use strict';
const faker = require('faker');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const currentDate = new Date()
        const users = new Array(20)
            .fill({})
            .map((value, index) => {
                const name = faker.name.findName();
                return (
                    {
                        first_name: `User ${index}`,
                        last_name: `Last ${index}`,
                        avatar: `https://ui-avatars.com/api/?name=${name}`,
                        createdAt: currentDate,
                        updatedAt: currentDate
                    }
                )
            });
        await queryInterface.bulkInsert('Users', users);
        let usersInserted = await queryInterface.sequelize.query('SELECT * from Users');
        usersInserted = usersInserted[0];

        const friendRelation = [];
        for (let i = 0; i < usersInserted.length - 1; i++) {
            const user = usersInserted[i];
            const friend = usersInserted[i + 1];
            friendRelation.push({
                friendId: friend.id,
                userId: user.id,
                createdAt: currentDate,
                updatedAt: currentDate
            });
            friendRelation.push({
                friendId: user.id,
                userId: friend.id,
                createdAt: currentDate,
                updatedAt: currentDate
            })
        }
        await queryInterface.bulkInsert('UserFriends', friendRelation);

    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Users', null, {});
        await queryInterface.bulkDelete('UserFriends', null, {});
    }
};
