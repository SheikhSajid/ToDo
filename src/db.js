import Dexie from "dexie";

const db = new Dexie("todos");

db.version(1).stores({
  main: "++id, title, description, starred, time, month, day, category",
  archived: "++id, title, description, starred, time, month, day",
  trash: "++id",
  category: "++"
});

export default db;
