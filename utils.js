
const utils = {
    assignBookshelf: function () {
        const bookshelves = [
            'Cartagena',
            'Medellin',
            'Quito',
            'Digital'
        ];
        const randomNumber = Math.floor((Math.random() * (bookshelves.length - 0)) + 0);
        return bookshelves.find(bookshelf => bookshelves.indexOf(bookshelf) === randomNumber);
    },

    createApiUrl: function (apiUrl, ...topics) {
        return topics.map(topic => `${apiUrl}${topic}&maxResults=30`);
    }

}

module.exports = {
    utils
}