import app from './app';

async function runServer(){
    console.log(process.env);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Server on port ${port}`);
};

runServer();