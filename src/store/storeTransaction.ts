import workspaceDB from "./db";

interface IWorkspace {
    html: string;
    css: string;
    js: string;
}

export async function addWorkspace(workspace: IWorkspace): Promise<void>{
    const db = await workspaceDB;
    const transaction = db.transaction('workspace', 'readwrite');
    const store = transaction.objectStore('workspace');

    const request = store.add(workspace);

    request.onsuccess = () => {
        console.log('object added to store ', request.result);
    }

    request.onerror = () => {
        console.log('error occured ', request.error);
    }
}

export async function getWorkspace(): Promise<IWorkspace[]>{
    const db = await workspaceDB;
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('workspace', 'readonly');
        const store = transaction.objectStore('workspace');

        const request = store.getAll();

        request.onerror = () => {
            console.log('error occured', request.error);
            reject(request.error);
        }

        request.onsuccess = () => {
            console.log('List of data from store ', request.result)
            resolve(request.result);
        }
    })
}