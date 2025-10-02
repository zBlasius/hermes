import AsyncStorage from '@react-native-async-storage/async-storage'
import HandleRepository from './HandleRepository'

const genericObjState = {table: "statement", timestamp: new Date()}

export class StatementLocalRepository extends HandleRepository{
  constructor() {
    super({ table: "statements" });
  }

  async getStatements(){
    const statements =  await this.getState('statements');
    console.log('statements', statements)
    return [];
  }

  async saveStatements(statements: any[]){
    const state = {id:1, name: 'Gustavo'};
    const saveData = await this.saveState(state);
    console.log('saveData', saveData)
    return saveData;
  }
}