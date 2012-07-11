var test_page_proto = new Object ();
function test_app_contructor (config)
{
  this.apply ("Page", "_constructor", config);
}
test_page_proto._constructor = test_app_contructor;

function test_app_initSkin (event)
{
  this.apply ("Page", "initSkin");
  this.abNavButton1.setFocus ();
  
  this.abNavButton1.bind ('select', this);
}
test_page_proto.initSkin = test_app_initSkin;

function test_app_notify (event)
{
  this.goToIndexPage ();
}
test_page_proto.notify = test_app_notify;


var TestPage = Class.create ('TestPage', test_page_proto);
Class.extend ('TestPage', 'Page');
