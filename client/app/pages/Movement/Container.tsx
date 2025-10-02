import React from "react";
import MovementView from "./View";
import { StatementLocalRepository } from "../../repositories/Statement/StatementLocalRepository";

export default function Container() {
    const statementRepo = new StatementLocalRepository();

        function saveStatement(){
            statementRepo.insertState({id:1, name: 'Gustavos'}).then(ret=>{
                console.log('ret', ret)
            }).catch(err=>{
                console.log('err', err)
            });
        }

        function subtractStatement(){
            statementRepo.getStatements().then(ret=>{
                console.log('get', ret)
            }).catch(err=>{
                console.log('err', err)
            });
        }

    return (
        <MovementView handleClickAddButton={saveStatement} handleClickSubtractButton={subtractStatement} />
    )
}