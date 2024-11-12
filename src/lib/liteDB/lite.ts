/**
 * @description A lite IndexDB wrapper class
 * 
 * @constructor  {  
 * @param dbName - The name of the database
 * @param version - Version of the database (increment to apply schema)
 * @param stores - An object defining the store and the keyPath (e.g { user: "id"})
 * }
 */

export class LiteDB {
  private dbName: string;
  private version: number;
  private store: Record<string, string>;
  private db: IDBDatabase | null;

  /**
   *
   * @param dbName - The name of the database
   * @param version - Version of the database (increment to apply schema)
   * @param stores - An object defining the store and the keyPath (e.g { user: "id"})
   */
  constructor(dbName: string, version: number, stores: Record<string, string>) {
    this.dbName = dbName;
    this.version = version;
    this.store = stores;
    this.db = null;
  }

  /**
   * Initial the database and creates the object stores if it does not exists
   * @returns A promise that resolves when the database is successfully initialize
   */

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest)?.result;
        for (const storeName in this.store) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, {
              keyPath: this.store[storeName],
              autoIncrement: true,
            });
          }
        }
      };
      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest)?.result;
        resolve();
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  /**
   * Adds new record to the specified object store.
   * @param storeName - The name of the object store.
   * @param value - The value to add to the store.
   * @returns A promise that resolves to the added record's ID.
   */
  async add<T>(storeName: string, value: T): Promise<IDBValidKey> {
    return this._transaction(storeName, "readwrite", (store) =>
      store.add(value)
    );
  }

  /**
   * Retrieve the a record specified by an object store
   * @param storeName - Receives a record from the store by a specifies key
   * @param key - The key of the record to retrieve
   * @returns A promise the resolve into the retrieval of the record or undefined if not found
   */
  async get<T>(storeName: string, key: IDBValidKey): Promise<T | undefined> {
    return this._transaction(storeName, "readonly", (store) => store.get(key));
  }

  async update<T>(
    storeName: string,
    key: IDBValidKey,
    value: Partial<T>
  ): Promise<IDBValidKey> {
    return this._transaction(storeName, "readwrite", async (store) => {
      const existingData = await store.get(key);
      const updatedData = { ...existingData, value };
      return store.put(updatedData);
    });
  }

  /**
   * Delete a key from the specified object
   * @param storeName - The store name to delete item from
   * @param key - The key of record to be deleted
   * @returns Promise that resolve when the deletion operation is successful
   */
  async delete(storeName: string, key: IDBValidKey): Promise<void> {
    return this._transaction(storeName, "readwrite", async (store) =>
      store.delete(key)
    );
  }

  /**
   *
   * @param storeName - The name of the object store
   * @param mode - The transaction mode ("readonly", or "readwrite")
   * @param operation - The function that performs the desired operation on the store
   * @returns - A promise that resolves with the operation result
   */
  private _transaction<T>(
    storeName: string,
    mode: IDBTransactionMode,
    operation: (store: IDBObjectStore) => IDBRequest<T> | Promise<IDBRequest<T>>
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject(new Error("Database is not initialize"));
      }
      const transaction = this.db.transaction(storeName, mode);
      const store = transaction.objectStore(storeName);
      const request = operation(store);

      if (request instanceof Promise) {
        request.then((req) => {
          req.onsuccess = () => resolve(req.result);
          req.onerror = () => reject(req.error);
        });
      } else {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      }
    });
  }
}
