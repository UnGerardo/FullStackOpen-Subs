const listHelper = require('../utils/listHelper');

test('dummy returns one', () => {
    const blogs = [];

    expect(listHelper.dummy(blogs)).toBe(1);
});