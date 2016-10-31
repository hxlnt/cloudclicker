var Particle = require('particle-api-js');
var azure = require('azure-storage');
var port = process.env.PORT || 3000;
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var newEvent;
var tableService = azure.createTableService();
var entGen = azure.TableUtilities.entityGenerator;
var particle = new Particle();

var emailsSentToday, emailsSentThisMonth, emailsSentEver, emailsTrashedToday, emailsTrashedThisMonth, emailsTrashedEver;

// Initialize web app
server.listen(port);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
    console.log("App started.");
});

io.on('connection', function (socket) {
    updateFromTable();
    
    // Connect to Particle
particle.login({ username: process.env.myparticleemail, password: process.env.myparticlepw }).then(
    function(){
    particle.getEventStream({ deviceId: process.env.myparticledeviceid, name: 'buttonPressed', auth: process.env.myparticletoken }).then(function (stream) {
        stream.on('event', function (data) {
            if (data.data == 's') { 
                newEvent = "Email sent!" 
                console.log("Event: " + newEvent);
                socket.emit('sentUpdate');
        }
            else if (data.data == 't') { 
                newEvent = "Email trashed!"
                console.log("Event: " + newEvent);
                socket.emit('trashedUpdate');
         }
            
            });
        });
    });

    socket.on('disconnect', function () {
        console.log('Disconnected.');
    });

    function updateFromTable() {
        var sentEverQuery = new azure.TableQuery()
            .select(['RowKey'])
            .where('PartitionKey eq ?', 'Email sent!');
        var trashedEverQuery = new azure.TableQuery()
            .select(['RowKey'])
            .where('PartitionKey eq ?', 'Email trashed!');
        tableService.queryEntities('mytable', sentEverQuery, null, function (error, result, response) {
            if (!error) {
                socket.emit('sentData', result.entries);
                console.log('sent initial data');
            }
        });
        tableService.queryEntities('mytable', trashedEverQuery, null, function (error, result, response) {
            if (!error) {
                socket.emit('trashedData', result.entries);
                console.log('trashed initial data');
            }
        });
    }
});