const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') {
        response.writeHead(204);
        response.end();
        return;
    }

    if (request.url.includes('/habits-data')) {
        if (request.method === 'GET') {
            const data = fs.readFileSync('./habits-data.json', 'utf8');
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(data);
        }
        else if (request.method === 'POST') {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            const { writeFile, readFile } = require("fs");
            const path = "habits-data.json";

            let body = '';

            request.on('data', chunk => {
                body += chunk.toString();
            });

            request.on('end', () => {
                const parsedBody = JSON.parse(body);
                console.log(parsedBody);
                readFile(path, (error, data) => {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    const habitsData = JSON.parse(data);

                    const newHabit = {
                        id: parsedBody.id,
                        name: parsedBody.name,
                        daysAmount: parsedBody.daysAmount,
                        currentDays: 0,
                        duration: parsedBody.duration,
                        startDate: parsedBody.startDate,
                        selectedDays: parsedBody.selectedDays,
                        days: [],
                        colorHex: parsedBody.colorHex
                    };

                    habitsData.push(newHabit);

                    writeFile(path, JSON.stringify(habitsData, null, 2), (err) => {
                        if (err) {
                            console.log("Failed to write updated data to file");
                            return;
                        }
                        console.log("Updated file successfully");
                    });
                });
                const data = fs.readFileSync('./habits-data.json', 'utf8');
                response.end(data);
            });
        }
        else if (request.method === 'PUT') {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            const { writeFile, readFile } = require("fs");
            const path = "habits-data.json";

            let body = '';

            request.on('data', chunk => {
                body += chunk.toString();
            });

            request.on('end', () => {
                const parsedBody = JSON.parse(body);
                console.log(parsedBody);
                readFile(path, (error, data) => {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    console.log(data);

                    const habitsData = JSON.parse(data);

                    const habitIndex = habitsData.findIndex((habit) => habit.id === parsedBody.id);

                    if (habitIndex !== -1) {
                        const habitToUpdate = habitsData[habitIndex];
        
                        const updatedHabit = {
                            ...habitToUpdate,
                            ...parsedBody,
                        };
        
                        if (parsedBody.dayState) {
                            habitToUpdate.days[parsedBody.dayState.index] = parsedBody.dayState.isChecked;
                        }
                        habitsData[habitIndex] = updatedHabit;
                    }

                    writeFile(path, JSON.stringify(habitsData, null, 2), (err) => {
                        if (err) {
                            console.log("Failed to write updated data to file");
                            return;
                        }
                        console.log("Updated file successfully");
                    });
                });
                const data = fs.readFileSync('./habits-data.json', 'utf8');
                response.end(data);
            });
        }
        else if (request.method === 'DELETE') {
            const id = parseInt(request.url.split('/').pop(), 10);
            const { writeFile, readFile } = require("fs");
            const path = "habits-data.json";

            readFile(path, (error, data) => {
                if (error) {
                    console.log(error);
                    response.writeHead(500, { 'Content-Type': 'text/plain' });
                    response.end('Internal Server Error');
                    return;
                }

                let habitsData = JSON.parse(data);
                const index = habitsData.findIndex(habit => habit.id === id);

                if (index !== -1) {
                    habitsData.splice(index, 1);

                    writeFile(path, JSON.stringify(habitsData, null, 2), (err) => {
                        if (err) {
                            console.log("Failed to write updated data to file");
                            response.writeHead(500, { 'Content-Type': 'text/plain' });
                            response.end('Internal Server Error');
                            return;
                        }
                        console.log("Deleted habit successfully");
                        response.writeHead(200, { 'Content-Type': 'application/json' });
                        response.end(JSON.stringify(habitsData));
                    });
                } else {
                    response.writeHead(404, { 'Content-Type': 'text/plain' });
                    response.end('Habit Not Found');
                }
            });
        }
        else {
            response.writeHead(405, { 'Content-Type': 'text/plain' });
            response.end('Method Not Allowed');
        }
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
    }
});

server.listen(8080, 'localhost', () => {
    console.log('Server is started');
});
