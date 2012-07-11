
plalaView.initSkin = function () {
  ABView.prototype.initSkin.call (this);
};

plalaView.notify = function (event) {
 
};


plalaView.config = function ()
{
  this.menu1.hide ();
  this.menu2.hide ();
  this.menu3.hide ();
  this.menu4.hide ();
  this.menu5.hide ();
  this.menu6.hide ();
  this.menu7.hide ();

  this.menu1.navigationDelegate = this;
  this.menu2.navigationDelegate = this;
  this.menu3.navigationDelegate = this;
  this.menu4.navigationDelegate = this;
  this.menu5.navigationDelegate = this;
  this.menu6.navigationDelegate = this;
  this.menu7.navigationDelegate = this;
};

plalaView.onLeft = function (obj)
{
  this.propagate ('exit');
};


plalaView.onFocus = function (obj)
{
  obj.show ();
};

plalaView.onBlur = function (obj)
{
  obj.hide ();
};
 
plalaView.setFocus = function ()
{
  this.menu1.setFocus ();
};

