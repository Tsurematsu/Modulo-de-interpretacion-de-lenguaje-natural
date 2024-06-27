const dataStore = {
    data: [],

    exist() {
        return localStorage.getItem('data') !== null;
    },

    save(data) {
        localStorage.setItem('data', JSON.stringify(data));
    },

    get() {
        const storedData = localStorage.getItem('data');
        return storedData ? JSON.parse(storedData) : null;
    },

    remove() {
        localStorage.removeItem('data');
    },

    update(data) {
        this.save(data);
    }
};

export default dataStore;
