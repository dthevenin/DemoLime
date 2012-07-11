var belle_maison_proto = new Object ();

function belle_maison_constructor (config)
{
  this.apply ('Application', '_constructor', config);
}
belle_maison_proto._constructor = belle_maison_constructor;

function belle_maison_initSkin ()
{
  this.apply ('Application', 'initSkin');
  this.bind ('start', this, 'applicationStarted');
}
belle_maison_proto.initSkin = belle_maison_initSkin;

function belle_maison_applicationStarted (event)
{
  this.fpOneView.hide ();
  this.fpTwoView.hide ();
  this.mainMenu.show ();
  
  this.mainMenu.bind ('mainMenuSelect', this);
  this.fpTwoView.bind ('mainMenuSelect', this);
  this.fpOneView.bind ('menu', this);
}
belle_maison_proto.applicationStarted = belle_maison_applicationStarted;

function belle_maison_notify (event)
{
  if (event.type == 'mainMenuSelect')
  {
    this.mainMenu.hide ();
    this.fpTwoView.hide ();
    if (event.data == 1)
    { this.fpOneView.show (); }
    else if (event.data == 2)
    { this.fpTwoView.show (); }
    
  }
  if (event.type == 'menu')
  {
    this.fpOneView.hide ();
    this.fpTwoView.hide ();
    this.mainMenu.show ();
  }
}
belle_maison_proto.notify = belle_maison_notify;

var BelleMaison = Class.create ('BelleMaison', belle_maison_proto);
Class.extend ('BelleMaison', 'Application');