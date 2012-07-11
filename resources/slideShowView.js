/**
 *  Prototype extention for the object slideShowView
 */
var demo_lime_slide_show_view_proto = new Object ();

function slide_show_view_initSkin ()
{
  this.apply ("ABView", "initSkin");
  this.backButton.setNavigationDelegate (this);
}
demo_lime_slide_show_view_proto.initSkin = slide_show_view_initSkin;

/**
 *  Active state delegateion methode
 */
function slide_show_active (obj)
{
  this.propagate ('back');
}
demo_lime_slide_show_view_proto.onActive = slide_show_active;

function slide_show_show ()
{
  __setSize (this.view, 960, 540);

  this.apply ("ABView", "show");
  
  //set the focus to the back button
  this.backButton.setFocus ();
}
demo_lime_slide_show_view_proto.show = slide_show_show;


function slide_show_hide ()
{
  this.apply ("ABView", "hide");
  
  __setSize (this.view, 0, 0);
}
demo_lime_slide_show_view_proto.hide= slide_show_hide;

