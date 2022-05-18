class DataLayer {
    add(userData, tableName) {
        return localStorage.setItem(tableName, JSON.stringify(userData));
    }

    get(key, tableName) {
        return this.getAll(tableName)[key];
    }

    getAll(tableName) {
        return JSON.parse(localStorage.getItem(tableName)) || {};
    }
    
    updateAfterRemove(updatedUsersData, tableName) {
        return localStorage.setItem(
            tableName,
            JSON.stringify(updatedUsersData)
        );
    }
}

export default DataLayer;
