import AsyncStorage from "@react-native-async-storage/async-storage";

interface IHandleRepository {
  table: ILocalTable;
}

interface IJobState {
  table: ILocalTable;
  data: Record<string, unknown>;
  relatedId: string;
  operation: "create" | "update" | "delete";
  status: "pending" | "processing" | "done" | "failed";
}

type ILocalTable = "users" | "statements" | "jobs"; // All local tables avaliable here.

export default class HandleRepository {
  // TODO - Test this code
  timestamp: Date = new Date();
  table: ILocalTable = "users";

  constructor(private state: IHandleRepository) {
    this.timestamp = new Date();
    this.table = this.state.table;
    this.checkStorage();
  }

  checkStorage() {
    if (__DEV__) {
      AsyncStorage.getAllKeys()
        .then((keys) => {
          AsyncStorage.multiGet(keys).then((stores) => {
            stores.forEach((result, i, store) => {
              let key = store[i][0];
              let value = store[i][1];
              //console.log(`AsyncStorage key: ${key}, value: ${value}`);
            });
          });
        })
        .catch((err) => {
          console.error("Error fetching AsyncStorage keys:", err);
        });
    }
  }

  // O que esse extends faz?
  // Resposta: ele me permitir passar um objeto genérico para a função, desde que tenho um campo _id
  // Ou seja, ao chamar a função, posso declarar a interface do objeto mas obrigatoriamente precisa conter o _id
  async saveState<T extends { _id: string }>(data: T): Promise<void> {
    try {
      const testSetItem = await AsyncStorage.setItem(
        this.table,
        JSON.stringify(data),
      );

      const testSetJob = await this.insertQueueNetworkUpdate({
        table: this.table,
        data,
        relatedId: data._id as string,
        operation: "update",
        status: "pending",
      }); // Double check here
      console.log("testSetItem", testSetItem, "testSetJob", testSetJob);
      this.checkStorage();
      return;
    } catch (error) {
      console.log("error"); // Dispatch event for modal error.
      return;
    }
  }

  async insertState<T extends Record<string, unknown>>(data: T) {
    try {
      const _id = crypto.randomUUID();
      data = { ...data, _id };
      const currentState = await this.getState<T[]>(this.table);
      console.log("currentState", currentState);
      const oldState = currentState ? Array.from(currentState) : [];
      console.log("oldState", oldState);
      const newData = [...oldState, data];
      console.log("newData", newData);
      await AsyncStorage.setItem(this.table, JSON.stringify(newData));
      await this.insertQueueNetworkUpdate({
        // TODO - Make userID relation with the job, to avoid conflicts between users.
        table: this.table,
        relatedId: _id,
        data,
        operation: "create",
        status: "pending",
      }); // Double check here
      this.checkStorage();
      return data;
    } catch (err) {
      console.log("error insertState", err); // Dispatch event for modal error.
    }
  }

  async insertQueueNetworkUpdate({ relatedId, table, data, operation, status }: IJobState) {
    const _id = this.createUniqueIdByTimestamp(); // TODO - Refine idempotenceKey logic, in order to retun in case of existence of that idempotenceKey in the queue.

    // TODO - Apply idempotenceKey logic here.

    const newJobState = {
      _id,
      relatedId: relatedId,
      table,
      data, // TODO - Maybe it does more sense to search from relatedId Table
      operation,
      status,
      timestamp: new Date(),
    };

    const currentState = await this.getState("jobs");

    const newDate = currentState
      ? [...(currentState as Array<Object>), newJobState]
      : [newJobState];
    await AsyncStorage.setItem("jobs", JSON.stringify(newDate));
  }

  createUniqueIdByTimestamp() {
    return crypto.randomUUID();
  }

  async getState<T>(table?: ILocalTable): Promise<T | null> {
    // TODO - melhorar tipagem
    const state = await AsyncStorage.getItem(table || this.state.table);
    return state ? JSON.parse(state) : null;
  }

  async cleanTable(table: ILocalTable) {
    //! DANGER
    await AsyncStorage.removeItem(table);
  }
}
