const StatusCodeEnum = Object.freeze({
    'OK': 200,
    'CREATED': 201,
    'ACCEPTED': 202,
    'NO_CONTENT': 204,
    'BAD_REQUEST': 400,
    'UNAUTHOURIZED': 401,
    'FORBIDDEN': 403,
    'NOT_FOUND': 404,
    'SERVER_ERROR': 500,
});

module.exports = StatusCodeEnum;
