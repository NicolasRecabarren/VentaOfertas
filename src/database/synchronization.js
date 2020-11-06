import Address from '../models/Address';
import AddressType from '../models/AddressType';
import Customer from '../models/Customer';
import District from '../models/District';
import Province from '../models/Province';
import Role from '../models/Role';
import State from '../models/State';
import User from '../models/User';


async function createDatabaseTables(){
    await State.sync({ force: true });
    await Province.sync({ force: true });
    await District.sync({ force: true });

    await AddressType.sync({ force: true });
    await Customer.sync({ force: true });
    await Address.sync({ force: true });

    await Role.sync({ force: true });
    await User.sync({ force: true });
}

async function dropDatabaseTables(){
    await Address.drop();
    await AddressType.drop();
    await Customer.drop();

    await District.drop();
    await Province.drop();
    await State.drop();

    await User.drop();
    await Role.drop();
}

async function doSynchronization(){
    try {
        await dropDatabaseTables();
        await createDatabaseTables();

        console.info("the database synchronization is done.");
    } catch (error) {
        console.error("A problem has ocurred in synchronization.");
        console.log(error);
    }
}

doSynchronization();