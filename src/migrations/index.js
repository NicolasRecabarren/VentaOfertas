import { tables } from './tables';

//const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

async function createDatabaseTables(){
    const orderedTables = tables.sort( (tableA, tableB) => {
        if( tableA.order > tableB.order ) return  1;
        if( tableA.order < tableB.order ) return -1;
        return 0;
    });
    
    let steps = orderedTables.map( table => table.order );
    steps = [...new Set(steps)];
    
    await asyncForEach(steps, async (numStep) => {
        const modelsToCreate = orderedTables.filter( table => table.order === numStep );

        // Creamos las tablas en orden para que no hayan errores con las llaves foráneas.
        await Promise.all(
            modelsToCreate.map( model => {
                return new Promise( async (resolve,reject) => {

                    // Si el modelo posee relaciones, realizaremos las llaves aquí.
                    if( Object.keys(model).includes('belongsTo') ){
                        asyncForEach(model.belongsTo, async ({modelName,foreignKey}) => {
                            const foreignModel = tables.filter( table => table.name === modelName)[0];
                            model.instance.belongsTo(foreignModel.instance, { foreignKey });
                        });
                    }
                    
                    // Creamos la tabla en la base de datos.
                    await model.instance.sync({ alter:true, force: false }).catch(
                        err => console.log(err)
                    );
                    resolve();
                });
            })
        );
    });
}

async function dropDatabaseTables(){
    const orderedTables = tables.sort( (tableA, tableB) => {
        if( tableA.order < tableB.order ) return  1;
        if( tableA.order > tableB.order ) return -1;
        return 0;
    });
    
    let steps = orderedTables.map( table => table.order );
    steps = [...new Set(steps)];

    await asyncForEach( steps, async (numStep) => {
        const modelsToDelete = orderedTables.filter( table => table.order === numStep );

        // Eliminamos las tablas en orden para que no hayan errores con las llaves foráneas.
        await Promise.all(
            modelsToDelete.map( model => {
                return new Promise( async (resolve,reject) => {
                    // Eliminamos la tabla en la base de datos.
                    await model.instance.drop().catch(
                        err => console.log(err)
                    );
                    resolve();
                });
            })
        );
    });
}

async function doSynchronization(){
    await dropDatabaseTables();
    
    createDatabaseTables().then(
        () => console.info("Database synchronization is done."),
        (error) => {
            console.error("A problem has ocurred in synchronization.");
            console.log(error);
        }
    );
}

doSynchronization();