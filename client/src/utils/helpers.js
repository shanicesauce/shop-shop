export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + "s";
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    //open connection to db shop-shop with the version of 1
    const request = window.indexedDB.open("shop-shop", 1);

    //create variables to hold reference to the db, transaction(tx), and object store
    let db, tx, store;

    //if version has changed (or first time using db) run this method and create the 3 object stores
    request.onupgradeneeded = function (e) {
      const db = request.result;

      //create object store for each type of data and set primary key index to be the _id of the data
      db.createObjectStore("products", { keyPath: "_id" });
      db.createObjectStore("categories", { keyPath: "_id" });
      db.createObjectStore("cart", { keyPath: "_id" });
    };

    //handle any errors with connecting
    request.onerror = function (e) {
      console.log("There was an error");
    };

    request.onsuccess = function (e) {
      //save refrence of the db to the db variable
      db = request.result;

      //open a transaction do whatever we pass into 'storeName'(must match an object store name)
      tx = db.transaction(storeName, "readwrite");
      //save a refreence to that object store
      store = tx.objectStore(storeName);

      //anyerrors
      db.onerror = function (e) {
        console.log("error", e);
      };

      switch (method) {
        case "put":
          store.put(object);
          resolve(object);
          break;

        case "get":
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        case "delete":
          store.delete(object._id);
          break;
        default:
          console.log("no valid method");
          break;
      }

      //when the transaction is complete close connection
      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}
