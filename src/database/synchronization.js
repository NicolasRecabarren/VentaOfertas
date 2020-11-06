import Role from '../models/Role';
import User from '../models/User';

async function doSynchronization(){
    await Role.sync({ force: true });
    await User.sync({ force: true });
}

async function dropDatabaseTables(){
    await User.drop();
    await Role.drop();
}

try {
    dropDatabaseTables();
    doSynchronization();

    console.info("the database synchronization is done.");
} catch (error) {
    console.error("A problem has ocurred in synchronization.");
}