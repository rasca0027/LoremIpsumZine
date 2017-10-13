var express = require('express');
var Parse = require('parse/node');
var fs = require("fs");
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// index of urls
var index = [
    '/editors', 
    '/section/ENTER', 
    '/project/1', 
    '/project/2', 
    '/project/3', 
    '/section/ESC', 
    '/project/4',
    '/project/5',
    '/project/6',
    '/section/CTRL',
    '/project/7',
    '/project/8',
    '/section/space',
    '/project/9',
    '/project/10',
    '/section/review'
    ];
var tagsColorTable = {
    'ENTER': '#f4764a',
    '360 Video': '#AF1FFF',
    'Illustration': '#5734FF',
    'VR': '#456E37',
    'ESC':'#F27593' ,
    'Creative Coding': '#A0225B',
    'Design': '#0792C4',
    'CTRL': '#f7bf21',
    'AR': '#A7C407',
    'Space': '#42d398',
    'Installation': '#5F7EF8'
};

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', function(request, response) {
    response.render('pages/index');
});


app.get('/editors', function(request, response) {
    response.render('pages/editor', {'title': "Editor's Note"});
});


app.get('/section/:name', function(request, response) {
    var name = request.params.name.toLowerCase();
    var content = fs.readFileSync("data/section.json");
    content = JSON.parse(content);
    var tagline = content[name]['slogan'];
    var color = content[name]['color'];

    var next = index[index.indexOf(request.path) + 1];
    var prev = index[index.indexOf(request.path) - 1];
    
    var context = {
        'name': name,
        'tagline': tagline,
        'color': color,
        'next': next,
        'prev': prev,
        'image': '/section/' + name + '.png'
    };

    response.render('pages/section', context);
});


app.get('/project/:id', function(request, response) {
    var id = request.params.id; 
    var content = fs.readFileSync("data/project" + id + ".json");
    content = JSON.parse(content);
    
    var tag1 = content.tag[0];
    var color1 = tagsColorTable[tag1];
    var tag2 = content.tag[1];
    var color2 = tagsColorTable[tag2];

    var next = index[index.indexOf('/project/'+id) + 1];
    var prev = index[index.indexOf('/project/'+id) - 1];

    var context = {
        'title': content.title,
        'author': content.author,
        'authorLink': content.authorLink,
        'info': content.info,
        'description': content.content,
        'types': content.type,
        'link': content.link,
        'tag1': tag1,
        'tag1color': color1,
        'tag2': tag2,
        'tag2color': color2,
        'pageNum': id,
        'next': next,
        'prev': prev
    };
    response.render('pages/project', context);
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
