import app from './app';

async function runServer(){
    const port = process.env.PORT || 80;
    await app.listen(port);
    console.log(`Server on port ${port}`);
};

runServer();