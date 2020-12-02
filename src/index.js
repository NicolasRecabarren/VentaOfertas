import app from './app';

const port = process.env.PORT || 3000;

async function runServer(){
    await app.listen(port);
    console.log(`Server on port ${port}`);
};

runServer();