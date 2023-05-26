let ioInstance;

const setIOInstance = (io) => {
    ioInstance = io;
};

const getIOInstance = () => {
    return ioInstance;
};

module.exports = {
    setIOInstance,
    getIOInstance,
};