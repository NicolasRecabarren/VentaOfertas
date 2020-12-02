import app from './app';

async function runServer(){
    const port = process.env.PORT || 3000;
    console.log(`Puerto: ${port}`);
    await app.listen(port);
    console.log(`Server on port ${port}`);
};

runServer();