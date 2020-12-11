const successStatusCodes = [200,201];

const sendJson = (responseObject, message = '', data = {}, status = 500) => {
    responseObject
        .status(status)
        .json({
            error: successStatusCodes.indexOf(status) === -1,
            data,
            message
        })
}

module.exports = {
    sendJson
}