const axios = require('axios');

const movingVehicles = [];

const ongoingTravels = [];

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

const startSimulation = async () => {
    const { data: travels } = await api.get('/travels/travelsByStatus/ongoing');
    ongoingTravels.push(...travels.map((travel) => travel.id));

    const { data: vehicles } = await api.get('/vehicles/vehiclesByStatus/moving');
    movingVehicles.push(...vehicles.map((vehicle) => vehicle.id));

    createNewTravelLoop();
    endSomeTravelLoop();
    moveSomeVehiclesLoop();
};

const createNewTravelLoop = () => {
    createNewTravel();
    setTimeout(createNewTravelLoop, Math.floor(Math.random() * 5000));
};

const endSomeTravelLoop = () => {
    endSomeTravel();
    setTimeout(endSomeTravelLoop, Math.floor(Math.random() * 10000));
};

const moveSomeVehiclesLoop = () => {
    moveSomeVehicles();
    setTimeout(moveSomeVehiclesLoop, Math.floor(Math.random() * 100));
};

const createNewTravel = async () => {
    try {
        const newTravel = await api.post('/travels/generateTravel');
        ongoingTravels.push(newTravel.data.id);
        movingVehicles.push(newTravel.data.vehicleId);
    } catch (err) {
        console.error(err);
    }
};

const endSomeTravel = async () => {
    const randomTravel = ongoingTravels.splice(Math.floor(Math.random() * ongoingTravels.length), 1).at(0);

    if (!randomTravel) return;

    try {
        const finishedTravel = await api.post(`/travels/stopTravel/${randomTravel}`);
        const vehicleIndex = movingVehicles.indexOf(finishedTravel.data.vehicleId);
        if (vehicleIndex > -1) movingVehicles.splice(vehicleIndex, 1);
    } catch (err) {
        console.log(err)
    }
};

const moveSomeVehicles = async () => {
    const vehiclesWillMove = movingVehicles.sort(() => .5 - Math.random()).slice(0, Math.floor(Math.random() * movingVehicles.length));

    try {
        await Promise.all(vehiclesWillMove.map(vehicle => api.post(`/vehicles/moveVehicle/${vehicle}`)));
    } catch (err) {
        console.log(err);
    }
};

startSimulation();
