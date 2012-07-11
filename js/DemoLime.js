var demo_lime_proto = new Object ();

function demo_lime_constructor (config)
{
  this.apply ('Application', '_constructor', config);
}
demo_lime_proto._constructor = demo_lime_constructor;

function demo_lime_initSkin ()
{
  this.apply ('Application', 'initSkin');
  this.bind ('start', this, 'applicationStarted');
}
demo_lime_proto.initSkin = demo_lime_initSkin;

function demo_lime_applicationStarted (event)
{
  /* your code to execute when the application si launched */
  
  this.slideShowView.bind ('back', this);
  this.mainMenu.bind ('showView', this);
  
  this.slideShowView.hide ();
  this.mainMenu.show ();
}
demo_lime_proto.applicationStarted = demo_lime_applicationStarted;

function demo_lime_notify (event)
{
  /* your code to manage events */
  
  if (event.type == 'back')
  {
    this.mainMenu.show ();
    this.slideShowView.hide ();
  }
  
  else if (event.type == 'showView')
  {
    if (event.data == 1)
    {
      this.mainMenu.hide ();
      this.slideShowView.show ();
    }
  }
}
demo_lime_proto.notify = demo_lime_notify;

var DemoLime = Class.create ('DemoLime', demo_lime_proto);
Class.extend ('DemoLime', 'Application');
