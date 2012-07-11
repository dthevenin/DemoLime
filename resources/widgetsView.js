/**
 *  Prototype extention for the object widetsView
 */
var demo_lime_widgets_view_proto = new Object ();

/**
 *  
 */
function demo_lime_widgets_view_initSkin ()
{
  this.apply ("ABView", "initSkin");
  
  // set the delegate to be inform when states change
  this.backButton.setNavigationDelegate (this);
}
demo_lime_widgets_view_proto.initSkin = demo_lime_widgets_view_initSkin;

/**
 *  
 */
function demo_lime_widgets_view_show ()
{
  this.apply ("ABView", "show");
  
  __setSize (this.view, 960, 540);
  //set the focus to the back button
  this.backButton.setFocus ();
}
demo_lime_widgets_view_proto.show = demo_lime_widgets_view_show;

/**
 *  
 */
function demo_lime_widgets_view_hide ()
{
  this.apply ("ABView", "hide");
  
  __setSize (this.view, 0, 0);
}
demo_lime_widgets_view_proto.hide = demo_lime_widgets_view_hide;
/**
 *  Active state delegateion methode
 */
function demo_lime_widgets_view_active (obj)
{
  this.propagate ('back');
}
demo_lime_widgets_view_proto.onActive = demo_lime_widgets_view_active;
