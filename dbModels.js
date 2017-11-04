
var mongoose = require('mongoose');

mongoose.connect('mongodb://adminuser:adminpassword@ds145275.mlab.com:45275/assettrack');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    id: Number,
    username: String,
    password: String
});
var batchSchema = new Schema({
    id: String,
    name: String,
    assignedUser:userSchema
});

var batchLocSchema = new Schema({
    batch:batchSchema,
    latlog: String, //if provided
    date:Date
});

var assetSchema = new Schema({
        batch:batchSchema,
        id: Number,
        name: String,
        assignedUser:userSchema
})

var userModel = mongoose.model('user',userSchema);
var batchModel = mongoose.model('batch',batchSchema);
var batchLocModel = mongoose.model('batchLoc',batchLocSchema);
var assetModel = mongoose.model('asset',assetSchema);
module.exports=
    {
        assetObj : function () {
            return assetModel;
        }
        ,
        batchObj : function () {
            return batchModel;
        },
        batchLocObj : function () {
            return batchLocModel;
        },
        userObj : function()
        {
            return userModel;
        }

    }


    console.log('models loaaded');

