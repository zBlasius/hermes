import { injectable, inject } from "inversify";
import { IUserRepository } from "./contracts/IUserRepository";
import { Pool } from "mysql2/typings/mysql/lib/Pool";
import { QueryError, PoolConnection } from "mysql2";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject("database") private connection: Pool) {}

  async get() {
    //* Check if I'll have a new connection for each request

    this.connection.getConnection((err: any, conn: PoolConnection) => {
      conn.query("select * from user", (err: QueryError, resultSet: any[]) => {
        if (err) {
          //TODO: Class to register error logs
          console.log(err);
        }
        
      });
    });
    // connection.getConnection((err: any, conn: PoolConnection) => {
    //     conn.query("select * from user", (err, resultSet: any[]) => {
    //         conn.release();
    //         if (err) {
    //             res.status(500).send({
    //                 message: 'INTERNAL SERVER ERROR',
    //                 result: null
    //             });
    //         } else {
    //             res.status(200).send({
    //                 message: 'OK',
    //                 result: resultSet
    //             });
    //         }
    //     })
    // });
  }
}
