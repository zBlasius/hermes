import AsyncStorage from "@react-native-async-storage/async-storage";

interface IHandleRepository {
  table: ILocalTable;
}

interface IJobState {
  table: ILocalTable;
  data: Record<string, unknown>;
}

type ILocalTable = "users" | "statements" | "jobs"; // All local tables avaliable here.

export default class HandleRepository {
  // TODO - Test this code
  timestamp: Date = new Date();
  table: ILocalTable = "users";

  constructor(private state: IHandleRepository) {
    this.timestamp = new Date();
    this.table = this.state.table;
  }

  async saveState(data: Record<string, unknown>) {
    try {
      const testSetItem = await AsyncStorage.setItem(this.table, JSON.stringify(data));

      const testSetJob = await this.insertJobState({ table: this.table, data }); // Double check here
      console.log('testSetItem', testSetItem, 'testSetJob', testSetJob)
      return;
    } catch (error) {
      console.log("error"); // Dispatch event for modal error.
      return;
    }
  }

  async insertState(data: Record<string, unknown>) {

    try {
        const currentState = await this.getState(this.table);
        console.log('currentState', currentState)
        const oldState = currentState ? Array.from(currentState) : [];
        console.log('oldState', oldState)
        const newData = [...oldState, data];
        console.log('newData', newData)
        await AsyncStorage.setItem(this.table, JSON.stringify(newData));
        await this.insertJobState({ table: this.table, data }); // Double check here
        return;
    } catch(err){
        console.log("error insertState", err); // Dispatch event for modal error.
    }
  }

  async insertJobState({ table, data }: IJobState) {
    //! If I have concurency problems here, consider to use AsyncStorage.multimerge:
    // https://react-native-async-storage.github.io/async-storage/docs/api/#multimerge

    const newJobState = { table, data, timestamp: new Date() };
    const currentState = await this.getState("jobs");
    const newDate = currentState
      ? [...(currentState as Array<Object>), newJobState]
      : [newJobState];
    await AsyncStorage.setItem("jobs", JSON.stringify(newDate));
    return;
  }

  async getState(table?: ILocalTable) {
    const state = await AsyncStorage.getItem(table || this.state.table) ;
    return state ? JSON.parse(state) : null;
  }
}
