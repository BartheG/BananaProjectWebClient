const express = require('express');
const app = express();

const m_const = require('./const');
const dbop = require('./src/Database/database');
const imp_renderer = require('./src/Renderers/GlobalRenderer');

const renderer = new imp_renderer.GlobalRenderer()
const readdb = new dbop.DatabaseOperations()

const ManageReq = require('./src/Renderers/ManageReq');
const FuncManageReq = new ManageReq.MReq();

const User = require('./src/Database/UserHandling');
const UserOperations = new User.User();

app.set('view engine','ejs');
app.use(express.static('./public/'));
app.use(express.json());

//Redirect if the user is not logged in
app.use((req,res,next) => {
	if ((!UserOperations.m_isConnected())
	&& (req.url != '/login')
	&& (req.url != '/getdiscount'))
		return res.redirect('/login');
	else {
		next();
	}
});

//Basic route of the application (check if the Web Client is online.)
app.get('/',(req,res) => {
	res.render('index', { page:'Home',data:'<h1>Welcome Home</h1>' });
});

app.get('/products', (req,res) => {
	res.render('index', {
		page:'Product Management',
		data:'<div><img id="index-loadinganim" class="img-center" src="/assets/loading.gif"/></div>'
	});
});

//Update informations of a product
app.post('/products/update', (req,res) => {
	var m_id = req.body.id_tochange;
	var parsedData = FuncManageReq.parse( req.body,'id_tochange' );
	readdb.updater(
		'products',
		m_id,
		parsedData[0],
		parsedData[1]
	);
	res.json(req.body);
});

//Page to allows the user add a new product.
app.get('/newproduct', (req,res) => {
	res.render('index', { page:'New Product', data:renderer.run( 'nproduct','' ) });
})

//Add new product in Database
app.post('/newproduct/add', (req,res) => {
	readdb.m_new('products', {
		'ble':req.body.bleid,
		'classification':-1,
		'name':req.body.name,
		'price':req.body.price,
		'date':null
	});
	res.json(req.body);
});

//Route to delete a product from the database
app.post('/products/delete', (req,res) => {
	var m_id = req.body.id_todelete;
	readdb.deleter(
		'products',
		m_id
	);
	res.json(req.body);
});

//Get all products from the database and displays it.
app.get('/products/load',(req,res) => {
	readdb.reader('products').then((data) => {
		res.writeHead(200, {
			'Content-Type': 'text/plain',
			'Access-Control-Allow-Origin': '*'
		});
		res.end(
			renderer.run('prodmanage',data)
		);
	}).catch((err) => {
		console.log('Error:',err)
	});
});

//Page to allows the user to change the discount based on classification.
app.get('/manage', (req,res) => {
	readdb.reader('equivdiscount').then((data) => {
		res.render('index', {
			page:'Discount Management',
			data:renderer.run( 'discmanage',data )
		});
	});
});

//Update discount based on classification (in backend).
app.post('/manage/update', (req,res) => {
	var m_id = req.body.id_tochange;
	var parsedData = FuncManageReq.parse( req.body,'id_tochange' );
	readdb.updater(
		'equivdiscount',
		m_id,
		parsedData[0],
		parsedData[1]
	);
	res.json(req.body);
});

app.get('/ldata',(req,res) => {
	res.render('index', {
		page:'Labelized Data',
		data:'<div><img id="index-loadinganim" class="img-center" src="/assets/loading.gif"/></div>'
	});
});

//Get classification data from the database
app.get('/ldata/load',(req,res) => {
	readdb.reader('cldata').then((data) => {
		res.writeHead(200, {
			'Content-Type': 'text/plain',
			'Access-Control-Allow-Origin': '*'
		});
		res.end(
			renderer.run('ldata',data)
		);
	}).catch((err) => {
		console.log('Error:',err)
	});
});

//User Login renderer (render in HTML form to login)
app.get('/login', (req,res) => {
	res.render('login', { page:'Login', data:renderer.run('login','') });
});

//User Login route, with connexion handled with Firebase.
app.post('/login', (req,res,nxt) => {
	UserOperations.m_login(
		req.body.username,
		req.body.password
	).then((m_res) => {
		if (m_res) {
			res.json(req.body);
		} else {
			nxt();
		}
	}).catch((err) => {
		console.log(err)
	});
});

//User signout route
app.get('/signout', (req,res) => {
	UserOperations.m_SignOut();
	return res.redirect('/login');
})

const pble = require('./src/Renderers/BleToDiscount');

//Route which returns all the discounts available in the database.
app.post('/getdiscount', (req,res) => {
	readdb.reader('products').then((data) => {
		readdb.reader('equivdiscount').then((equivdiscount) => {
			var blemethod = new pble.ParseBle();
			blemethod.run(
				req.body.m_idble,
				data,
				equivdiscount
			).then((m_res) => {
				res.json(m_res);
			}).catch((err) => {
				console.log(err);
			})
		})
	}).catch((err) => {
		console.log('Error:',err)
	});
});

//We specify a port or we use a default system port
app.listen(process.env.PORT || m_const.PORT, () => {
	console.log('Listen on', process.env.PORT || m_const.PORT);
});