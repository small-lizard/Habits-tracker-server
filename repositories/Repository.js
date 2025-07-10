const fs = require('fs');
const StatusError = require('../utils/StatusError');
const path = './habits-data.json';

class Repository {
    readData() {
        const promise = new Promise((res, rej) => {
            fs.readFile(path, 'utf8', (error, data) => {
                if (error) {
                    rej(new StatusError('Error reading file'));
                }

                try {
                    const parsed = JSON.parse(data);
                    res(parsed);
                } catch (error) {
                    rej(new StatusError('Invalid JSON format'));
                }
            })
        });
        return promise;
    }

    writeData(data) {
        const promise = new Promise((res, rej) => {
            fs.writeFile(path, JSON.stringify(data, null, 2), (error) => {
                if (error) {
                    rej(new StatusError('Error writing file'));
                }
                res(data);
            });
        })
        return promise;
    }
}

module.exports = Repository;
