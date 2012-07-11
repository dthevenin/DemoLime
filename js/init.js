var _app_loaded_ = false;

function printlnConsole () {};
function printConsole () {};
function printlnDebug () {};
function printDebug () {};

function demolime_initComponent ()
{
  var config, default_values;

  this.apply ("Application", "initComponent");
  
  config = new Object ();
  config.id = "hak_id_1313530637240599256";
  this.mainMenu = Class["new"]("ABView", config);
  object_extend (this.mainMenu, demo_lime_main_menu);
  this.add (this.mainMenu, 'children');
  
  config = new Object ();
  config.id = "hak_id_1313531256653443898";
  this.slideShowView = Class["new"]("ABView", config);
  object_extend (this.slideShowView, demo_lime_slide_show_view);
  this.add (this.slideShowView, 'children');
  this.mainMenu.init ();
  this.slideShowView.init ();
}
Class.addMethod ("DemoLime", "initComponent", demolime_initComponent);

main_menu_proto = new Object ();


function main_menu_initSkin ()
{
  this.apply ("ABView", "initSkin");
  
  this.buttonOne.setNavigationDelegate (this);
  this.buttonTwo.setNavigationDelegate (this);
  this.buttonThree.setNavigationDelegate (this);
}
main_menu_proto.initSkin = main_menu_initSkin;

function main_menu_show ()
{
  __setSize (this.view, 960, 540);

this.apply ("ABView", "show");
  
  this.buttonOne.setFocus ();
}
main_menu_proto.show = main_menu_show;

function main_menu_hide ()
{
  this.apply ("ABView", "hide");
  
  __setSize (this.view, 0, 0);
}
main_menu_proto.hide = main_menu_hide;

function main_menu_active (obj)
{
  if (obj == this.buttonOne)
  {
    this.propagate ('showView', 1);
  }
}
main_menu_proto.onActive = main_menu_active;


function main_menu_notify (event)
{
 
}
main_menu_proto.notify = main_menu_notify;

var demo_lime_main_menu = main_menu_proto;

function main_menu_initComponent ()
{
  var config, default_values;

  this.apply ("ABView", "initComponent");
  
  config = new Object ();
  config.id = "hak_id_1313530693401967309";
  this.buttonOne = Class["new"]("ABNavTextLabel", config);
  this.add (this.buttonOne, 'children');
  
  config = new Object ();
  config.id = "hak_id_1313530943804710406";
  this.buttonTwo = Class["new"]("ABNavTextLabel", config);
  this.add (this.buttonTwo, 'children');
  
  config = new Object ();
  config.id = "hak_id_1313530950296519042";
  this.buttonThree = Class["new"]("ABNavTextLabel", config);
  this.add (this.buttonThree, 'children');
  this.buttonOne.init ();
  this.buttonTwo.init ();
  this.buttonThree.init ();
  default_values = new Object ();
  default_values.text = "SlideShow";  this.buttonOne.configure (default_values);
  default_values = new Object ();
  default_values.text = "Demo 2";  this.buttonTwo.configure (default_values);
  default_values = new Object ();
  default_values.text = "Demo 3";  this.buttonThree.configure (default_values);
}
main_menu_proto.initComponent = main_menu_initComponent;
slide_show_view_proto = new Object ();


function slide_show_view_initSkin ()
{
  this.apply ("ABView", "initSkin");
  this.backButton.setNavigationDelegate (this);
}
slide_show_view_proto.initSkin = slide_show_view_initSkin;

function slide_show_active (obj)
{
  this.propagate ('back');
}
slide_show_view_proto.onActive = slide_show_active;

function slide_show_show ()
{
  __setSize (this.view, 960, 540);

  this.apply ("ABView", "show");
  
  this.backButton.setFocus ();
}
slide_show_view_proto.show = slide_show_show;


function slide_show_hide ()
{
  this.apply ("ABView", "hide");
  
  __setSize (this.view, 0, 0);
}
slide_show_view_proto.hide= slide_show_hide;


var demo_lime_slide_show_view = slide_show_view_proto;

function slide_show_view_initComponent ()
{
  var config, default_values;

  this.apply ("ABView", "initComponent");
  
  config = new Object ();
  config.id = "hak_id_131353133605651835";
  this.abImageView1 = Class["new"]("ABImageView", config);
  this.add (this.abImageView1, 'children');
  
  config = new Object ();
  config.id = "hak_id_1313531345246445610";
  this.abImageView2 = Class["new"]("ABImageView", config);
  this.add (this.abImageView2, 'children');
  
  config = new Object ();
  config.id = "hak_id_1313531349218187550";
  this.abImageView3 = Class["new"]("ABImageView", config);
  this.add (this.abImageView3, 'children');
  
  config = new Object ();
  config.id = "hak_id_1313531384103534989";
  this.backButton = Class["new"]("ABNavTextLabel", config);
  this.add (this.backButton, 'children');
  this.abImageView1.init ();
  this.abImageView2.init ();
  this.abImageView3.init ();
  this.backButton.init ();
  default_values = new Object ();
  default_values.text = "Back";  this.backButton.configure (default_values);
}
slide_show_view_proto.initComponent = slide_show_view_initComponent;

function initApplication ()
{
  var obj = undefined;
  var default_values = new Object ();

  
  config = new Object ();
  config.id = "hak_id_1313530614577749389";
  this._demo_lime = Class["new"]("DemoLime", config);
  this._demo_lime.init ();
  Application.sendStart ();
}


var NAVIGATION_GRAPH = new Object ();
NAVIGATION_GRAPH.hak_id_1313530693401967309 = new Object ();
NAVIGATION_GRAPH.hak_id_1313530693401967309[2] = 'hak_id_1313530943804710406';
NAVIGATION_GRAPH.hak_id_1313530693401967309[1] = 'hak_id_1313530950296519042';
NAVIGATION_GRAPH.hak_id_1313530943804710406 = new Object ();
NAVIGATION_GRAPH.hak_id_1313530943804710406[2] = 'hak_id_1313530950296519042';
NAVIGATION_GRAPH.hak_id_1313530943804710406[1] = 'hak_id_1313530693401967309';
NAVIGATION_GRAPH.hak_id_1313530950296519042 = new Object ();
NAVIGATION_GRAPH.hak_id_1313530950296519042[2] = 'hak_id_1313530693401967309';
NAVIGATION_GRAPH.hak_id_1313530950296519042[1] = 'hak_id_1313530943804710406';

