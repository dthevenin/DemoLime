var lime_drpc_proto = new Object ();

function lime_drpc_constructor (config)
{
  this.apply ('Application', '_constructor', config);
}
lime_drpc_proto._constructor = lime_drpc_constructor;

function lime_drpc_initSkin ()
{
  this.apply ('Application', 'initSkin');
  this.bind ('start', this, 'applicationStarted');
}
lime_drpc_proto.initSkin = lime_drpc_initSkin;

function lime_drpc_applicationStarted (event)
{
  // your code to execute when the application si launched
  this.firstItemView.setFocus ();
  
  this.firstItemView.setNavigationDelegate (this);
  this.secondItemView.setNavigationDelegate (this);
  this.thirdItemView.setNavigationDelegate (this);
  
  this.currentContentView = this.firstContentView;
  this.secondContentView.hide ();
  this.thirdContentView.hide ();
  this.contentPortalView.hide ();
  this.currentContentView.show ();

  this.videoView.setSrc (Content.data [0].videoUrl);
  this.videoView.play ();
  
  this.setUsedKeyList ("basic data-button numeric-tuning");
  KEYBOARD.bind (KEYBOARD.ONE, this);
  KEYBOARD.bind (KEYBOARD.RED, this);
  KEYBOARD.bind (KEYBOARD.BLUE, this);  this.loadingView.hide ();
}
lime_drpc_proto.applicationStarted = lime_drpc_applicationStarted;

function lime_drpc_notify (event)
{
  if (event.type == KEYBOARD.ONE)
  {
    this.detailButton.setFocus ();
    this.videoView.hide ();
    this.loadingView.show ();
    this.goToPage ("VodDetail");//, Content.getParameters ());
  }
  
  else if (event.type == KEYBOARD.RED)
  {
    this.loadingView.show ();
    this.videoView.hide ();
    this.goToPage ("CmSelect");
  }
 
  else if (event.type == KEYBOARD.BLUE)
  {
    this.loadingView.show ();
    this.videoView.hide ();
    this.goToIndexPage ();
  }
}
lime_drpc_proto.notify = lime_drpc_notify;

function lime_drpc_onFocus (obj)
{
  if (obj == this.firstItemView)
  {
    this.currentContentView.hide ();
    this.currentContentView = this.firstContentView;
    this.currentContentView.show ();
    
    Content.selectContentNum = 1000;
    this.videoView.setSrc (Content.data [0].videoUrl);
    this.videoView.play ();
  }
  
  else if (obj == this.secondItemView)
  {
    this.currentContentView.hide ();
    this.currentContentView = this.secondContentView;
    this.currentContentView.show ();
    
    Content.selectContentNum = 1001;
    this.videoView.setSrc (Content.data [1].videoUrl);
    this.videoView.play ();
  }

  else if (obj == this.thirdItemView)
  {
    this.currentContentView.hide ();
    this.currentContentView = this.thirdContentView;
    this.currentContentView.show ();
    
    Content.selectContentNum = 1002;
    this.videoView.setSrc (Content.data [2].videoUrl);
    this.videoView.play ();
  }
}
lime_drpc_proto.onFocus = lime_drpc_onFocus;

var LimeDRPC = Class.create ('LimeDRPC', lime_drpc_proto);
Class.extend ('LimeDRPC', 'Application');
