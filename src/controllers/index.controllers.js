const indexCtrl = {};

indexCtrl.rendeIndex = (req, res) => {
    res.render('index')
};

indexCtrl.renderAbout = (req, res) => { 
    res.render('about') 
};


module.exports = indexCtrl;
