import app from './app';

async function runServer(){
    await app.listen(3000);
    console.log('Server on port 3000')
};

runServer();