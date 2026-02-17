import AsyncStorage from "@react-native-async-storage/async-storage";

interface IHandleRepository {
  table: ILocalTable;
}

interface IJobState {
  table: ILocalTable;
  data: Record<string, unknown>;
  relatedId: string;
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
        JSON.stringify(data)
      );

      const testSetJob = await this.insertQueueNetworkUpdate({
        table: this.table,
        data,
        relatedId: data._id as string,
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
      const _id =
        Math.random().toString(36).substring(2) + Date.now().toString(36);
      data = { ...data, _id };
      const currentState = await this.getState<T[]>(this.table);
      console.log("currentState", currentState);
      const oldState = currentState ? Array.from(currentState) : [];
      console.log("oldState", oldState);
      const newData = [...oldState, data];
      console.log("newData", newData);
      await AsyncStorage.setItem(this.table, JSON.stringify(newData));
      await this.insertQueueNetworkUpdate({
        table: this.table,
        relatedId: _id,
        data,
      }); // Double check here
      this.checkStorage();
      return data;
    } catch (err) {
      console.log("error insertState", err); // Dispatch event for modal error.
    }
  }

  async insertQueueNetworkUpdate({ relatedId, table, data }: IJobState) {
    const _id = this.createUniqueIdByTimestamp();

    const newJobState = {
      _id,
      relateId: relatedId,
      table,
      data,
      timestamp: new Date(),
    };

    const currentState = await this.getState("jobs");
    const newDate = currentState
      ? [...(currentState as Array<Object>), newJobState]
      : [newJobState];
    await AsyncStorage.setItem("jobs", JSON.stringify(newDate));
  }

  createUniqueIdByTimestamp() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  async getState<T>(table?: ILocalTable): Promise<T | null> { // TODO - melhorar tipagem
    const state = await AsyncStorage.getItem(table || this.state.table);
    return state ? JSON.parse(state) : null;
  }

  async cleanTable(table: ILocalTable) { //! DANGER
    await AsyncStorage.removeItem(table);
  }
}
