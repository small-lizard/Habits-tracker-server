const HabitsRepository = require('../repositories/HabitsRepository');
const Repository = require('../repositories/Repository');

const repository = new Repository();
const habitsRepository = new HabitsRepository();

class HabitsController {
    getAll(req, res) {
        repository.readData()
            .then((data) => res.json(data))
            .catch((error) => {
                console.error(error);

                return res.status(error.status).json({ message: error.message });
            })
    }

    addHabit(req, res) {
        const parsedBody = req.body;

        habitsRepository.addHabit(parsedBody)
            .then((data) => res.status(200).json(data))
            .catch((error) => {
                console.error(error);

                return res.status(error.status).json({ message: error.message });
            })
    }

    editHabit(req, res) {
        const parsedBody = req.body;

        habitsRepository.editHabit(parsedBody)
            .then((data) => res.status(200).json(data))
            .catch((error) => {
                console.log(error);

                return res.status(error.status).json({ message: error.message });
            })
    }

    deleteHabit(req, res) {
        const id = parseInt(req.params.id, 10);

        habitsRepository.deleteHabit(id)
            .then((data) => res.status(200).json(data))
            .catch((error) => {
                console.log(error);

                return res.status(error.status).json({ message: error.message });
            })
    }
}

module.exports = HabitsController;