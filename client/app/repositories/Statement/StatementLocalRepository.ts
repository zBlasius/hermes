import HandleRepository from '../HandleRepository'

interface IStatementLocalRepository {
  _id:string;
  description?: string;
  amount: number;
  date: Date;
  type: 'income' | 'outcome';
}

interface INewStatement {
  [key: string]: unknown;
  description?: string;
  amount: number;
  date: Date;
  type: 'income' | 'outcome';
}

export class StatementLocalRepository extends HandleRepository{
  constructor() {
    super({ table: "statements" });
  }

  async getStatements(){
    const statements =  await this.getState('statements');
    console.log('statements', statements)
    return statements;
  }

  async updateStatement(statement: IStatementLocalRepository){
    const saveData = await this.saveState<IStatementLocalRepository>(statement);
    return saveData;
  }

  async insertStatement(statement: INewStatement){
    const insertData = await this.insertState<INewStatement>(statement);
    return insertData;
  }
}