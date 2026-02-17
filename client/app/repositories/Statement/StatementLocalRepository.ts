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

interface IStatement {
  _id: string;
  amount: number;
  date: string;
  description: string;
  type: "income" | "outcome";
}

export class StatementLocalRepository extends HandleRepository{ // Should have an interface here
  constructor() {
    super({ table: "statements" });
  }

  async getAll(): Promise<IStatement[] | null> {
    const statements =  await this.getState<IStatement[] | null>('statements');
    console.log('statements', statements)
    return statements;
  }

  async updateStatement(statement: IStatementLocalRepository){
    const saveData = await this.saveState<IStatementLocalRepository>(statement);
    return saveData;
  }

  async insertStatement(statement: INewStatement){
    console.log('statement no repo', statement)
    const insertData = await this.insertState<INewStatement>(statement);
    return insertData;
  }

  async cleanAllStatements(){
    await this.cleanTable('statements');
  }
  
}