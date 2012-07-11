/**
 *  Prototype extention for the object mainView
 */
var demo_lime_main_menu_proto = new Object ();

function main_menu_initSkin ()
{
  this.apply ("ABView", "initSkin");
  
  // navigation delegate registration
  this.buttonOne.setNavigationDelegate (this);
  this.buttonTwo.setNavigationDelegate (this);
}
demo_lime_main_menu_proto.initSkin = main_menu_initSkin;

function main_menu_show ()
{
  __setSize (this.view, 960, 540);

this.apply ("ABView", "show");
  
  this.buttonOne.setFocus ();
}
demo_lime_main_menu_proto.show = main_menu_show;

function main_menu_hide ()
{
  this.apply ("ABView", "hide");
  
  __setSize (this.view, 0, 0);
}
demo_lime_main_menu_proto.hide = main_menu_hide;

function main_menu_active (obj)
{
  if (obj == this.buttonOne)
  {
    this.propagate ('showView', 1);
  }
  else if (obj == this.buttonTwo)
  {
    this.propagate ('showView', 2);
  }
}
demo_lime_main_menu_proto.onActive = main_menu_active;
