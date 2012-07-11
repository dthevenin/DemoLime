/**
 *  Prototype declaration for the class DemoLime
 */
var demo_lime_proto = new Object ();

/**
 *  Class constructor
 */
function demo_lime_constructor (config)
{
  this.apply ('Application', '_constructor', config);
}
demo_lime_proto._constructor = demo_lime_constructor;

/**
 *  Class init view
 */
function demo_lime_initSkin ()
{
  this.apply ('Application', 'initSkin');
  this.bind ('start', this, 'applicationStarted');
}
demo_lime_proto.initSkin = demo_lime_initSkin;

/**
 *  Method called when the application is loaded and started
 */
function demo_lime_applicationStarted (event)
{
  /* your code to execute when the application si launched */
  
  // events listening
  this.slideShowView.bind ('back', this);
  this.widgetsView.bind ('back', this);
  this.mainMenu.bind ('showView', this);
  
  // show the main view and hide others
  this.slideShowView.hide ();
  this.widgetsView.hide ();
  this.mainMenu.show ();
}
demo_lime_proto.applicationStarted = demo_lime_applicationStarted;

/**
 *  Events listening method
 */
function demo_lime_notify (event)
{
  /* your code to manage events */
  
  if (event.type == 'back')
  {
    this.mainMenu.show ();
    this.slideShowView.hide ();
    this.widgetsView.hide ();
  }
  
  else if (event.type == 'showView')
  {
    if (event.data == 1)
    {
      this.mainMenu.hide ();
      this.slideShowView.show ();
    }
    if (event.data == 2)
    {
      this.mainMenu.hide ();
      this.widgetsView.show ();
    }
  }
}
demo_lime_proto.notify = demo_lime_notify;

/**
 *  Class declaration
 */
var DemoLime = Class.create ('DemoLime', demo_lime_proto);
Class.extend ('DemoLime', 'Application');
