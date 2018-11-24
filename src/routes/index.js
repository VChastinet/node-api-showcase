const express = require('express');	
const statusCodeEnum = require('../shared/enum/status-code-enum');	
 const router = express.Router();	
 router.get('/',	
    (req, res, next) => res.status(statusCodeEnum.OK).send({	
        title: 'API em Node Express',	
        version: '1.0.1',
        docs: '/api-doc'
    })	
);	
 module.exports = router;