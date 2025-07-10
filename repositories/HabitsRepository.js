const Repository = require("./Repository");
const StatusError = require("../utils/StatusError");

class HabitsRepository extends Repository {
    addHabit(parsedBody) {
        return this.readData()
            .then((data) => {
                let habitsData = data;

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

                return this.writeData(habitsData);
            })
    }

    editHabit(parsedBody) {
        return this.readData()
            .then((data) => {
                let habitsData = data;

                const habitIndex = habitsData.findIndex((habit) => habit.id === parsedBody.id);

                if (habitIndex !== -1) {
                    const habitToUpdate = habitsData[habitIndex];

                    const updatedHabit = {
                        ...habitToUpdate,
                        ...parsedBody,
                    };

                    if (parsedBody.dayState) {
                        updatedHabit.days = [...habitToUpdate.days];
                        updatedHabit.days[parsedBody.dayState.index] = parsedBody.dayState.isChecked;
                    }

                    habitsData[habitIndex] = updatedHabit;
                }
                else {
                    throw new StatusError('Habit not found', 404);
                }

                return this.writeData(habitsData);
            })
    }

    deleteHabit(id) {
        return this.readData()
            .then((data) => {
                let habitsData = data;

                const index = habitsData.findIndex(habit => habit.id === id);

                if (index === -1) {
                    throw new StatusError('Habit not found', 404);
                }

                habitsData.splice(index, 1);

                return this.writeData(habitsData);
            })

    }
}

module.exports = HabitsRepository;