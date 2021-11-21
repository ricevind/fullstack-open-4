const { listHelper } = require('../../utils');
const {blogs} = require('../fixtures');

test('dummy returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);

    expect(result).toBe(1);
});

describe('Function: totalLikes', () => {
    test('returns 0 for empty list', () => {
        expect(listHelper.totalLikes([])).toBe(0);
    });

    test('returns blogs likes if there is only one', () => {
        const blogs = [{likes: 5}];

        expect(listHelper.totalLikes(blogs)).toBe(5);
    });

    test('returns sum of likes for many blogs', () => {
        const blogs = [{likes: 5}, {likes: 15}];

        expect(listHelper.totalLikes(blogs)).toBe(20);
    });
});

describe('Function: favoriteBlog', () => {
    test('returns null for empty list', () => {
        expect(listHelper.favoriteBlog([])).toBe(null);
    });

    test('returns most liked blog', () => {
        const {author, likes, title} = blogs[2];
        expect(listHelper.favoriteBlog(blogs)).toEqual({author, likes, title});
    });
});

describe('Function: mostBlogs', () => {
    test('returns null for empty list', () => {
        expect(listHelper.mostBlogs([])).toBe(null);
    });

    test('returns author with most blogs', () => {
        const authorWithMostBlogs = {
            author: 'Robert C. Martin',
            blogs: 3
        };
        expect(listHelper.mostBlogs(blogs)).toEqual(authorWithMostBlogs);
    });
});

describe('Function: mostLikes', () => {
    test('returns null for empty list', () => {
        expect(listHelper.mostLikes([])).toBe(null);
    });

    test('returns author with most blogs', () => {
        const authorWithMostLikes = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        };
        expect(listHelper.mostLikes(blogs)).toEqual(authorWithMostLikes);
    });
});

