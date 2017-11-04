var express =  require('express');
var app = express();
var PORT = 3030;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // support
app.use(bodyParser.json()); // support json encoded bodies

var db = require('./dbModels');



app.post('/createBatch',function(req,resp)
{
    var batchInfo = req.body.batchInfo;
    logger.debug('batch info' + JSON.stringify(batchInfo));

    var batchObj = db.batchObj();
    var batch = new batchObj();

    batch.findOne().sort('-id').exec().then(function(data)
    {

        var id = 1;
        if (data != null) {
            id = data.id + 1;
        }
        batch.id = id;
        batch.name = batchInfo.name;
        batch.save().then(function()
        {
            return batch;
        }).catch(function (err) {

            return 'err';
        })
    }).cath(function (err)
    {
        return 'err';
    });

    return flag;
});

app.post('/updateLocation',function(req,resp)
{
    var flag=false;
    var batchInfo = req.body.batchInfo;
    var locationInfo = req.body.locationInfo;
    logger.debug('batch info' + JSON.stringify(batchInfo));
    var locationObj = db.batchLocObj();
    var location = new locationObj();

    location.find().sort('-id').exec().then(function(data)
    {
        var id = 1;
        if (data != null) {
            id = data.id + 1;
        }
        location.id = id;
        location.name = locationInfo.name;
        location.batch=batchInfo;
        location.save().then(function()
        {
            flag=true;
        }).catch(function (err) {
            //do something
        })
    });
    return flag;
});

app.post('/addAsset',function(req,resp)
{
    var flag=false;
    var batchInfo = req.body.batchInfo;
    var assetInfo = req.body.assetInfo;
    logger.debug('asset info' + JSON.stringify(batchInfo));
    var assetObj = db.assetObj();
    var asset = new assetObj();

    asset.find().sort('-id').exec().then(function(data)
    {
        var id = 1;
        if (data != null) {
            id = data.id + 1;
        }
        asset.id = id;
        asset.name = assetInfo.name;
        asset.batch=batchInfo;
        asset.save().then(function()
        {
            flag=true;
        }).catch(function (err) {
            //do something
        })
    });
    return flag;
});

app.get('/listAllAssets/:userId',function(req,resp)
{
    var userId = req.params.id;

    db.assetObj().find({creatorUser:userId}).then(function(data)
    {
        if(data!=null)
            resp.send(data);
    })
    catch(function(err)
    {
        console.debug('couldnt find list');
        resp.send('err');
    });
});

app.get('/fetchConsignment/:batchId',function(req,resp)
{
    var assetId = req.params.batchId;


    db.batchLocObj().find({batch:assetId}).then(function(data)
    {
        if(data!=null)
            resp.send(data);
        resp.send('err');
    }
    ).catch(function(err)
     {
                resp.send('err')
            }
        )
});



app.get('/fetchConsignment/:conID',(req,resp)=>
{

    var conId = req.params.id;

    //if(conId.isNaN())
      //  return "err";
    db.assetObj().findOne({id:conId}).then(
     function(data)
     {
         console.log(data)
         return data;
     }
    )
}
);

app.get('/ds',function(req,resp){
    testModel.find(function(err,data)
    {
        if(err)
            console.error(err)
        console.log(data);
    });



    resp.send('gasd');
})

app.listen(PORT,()=>{console.log(PORT)});