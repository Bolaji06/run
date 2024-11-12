
function openDatabase(dbName: string, dbVersion: number): Promise<IDBDatabase>{
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onerror = () => {
            reject('Error occured')
        }

        request.onsuccess = () => {
            console.log('Database successfully open');
            resolve(request.result)
        }

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = request.result;

            if(!db.objectStoreNames.contains('workspace')){
                db.createObjectStore('workspace', { keyPath: 'id', autoIncrement: true })
            }
        }

    });
}

const workspaceDB = openDatabase('workspaceDB', 1);

export default workspaceDB