import HandleRepository from '../HandleRepository'

interface INewJob {
  [key: string]: unknown;
  description?: string;
  amount: number;
  date: Date;
  type: 'income' | 'outcome';
}

export class JobsLocalRepository extends HandleRepository{
  constructor() {
    super({ table: "jobs" });
  }

  async getJobs(){
    const jobs =  await this.getState('jobs');
    console.log('jobs', jobs)
    return jobs;
  }

  async syncJobs(){
    // Logic to sync jobs with remote server
    console.log('Syncing jobs with remote server...');
  }

}