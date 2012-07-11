var TestLime = function TestLime (config)
{
  this.parent = Application;
  this.parent (config);
  this.constructor = TestLime;
};

TestLime.prototype = {

  initSkin: function ()
  {
    Application.prototype.initSkin.call (this);
    this.bind ('start', this, 'applicationStarted');
  },

  applicationStarted : function (event)
  {
    this.menuView.labelSS.setFocus ();
    
    this.slideShowView.config ();
    this.plalaView.config ();
    this.plalaView.bind ('exit', this);
    this.slideShowView.bind ('exit', this);
      
    this.slideShowView.hide ();
    this.plalaView.hide ();
    
    this.menuView.labelSS.navigationDelegate = this;
    this.menuView.labelPlala.navigationDelegate = this;
    this.menuView.labelLI.navigationDelegate = this;
  },
  
  notify : function (event)
  {
    if (event.type === 'exit' && event.src === this.slideShowView)
    {
      this.menuView.labelSS.setFocus ();
      this.menuView.show ();
      this.slideShowView.hide ();
    }
    
    if (event.type === 'exit' && event.src === this.plalaView)
    {
      this.menuView.labelPlala.setFocus ();
      this.menuView.show ();
      this.plalaView.hide ();
    }
    
  },
        
  onActive : function (obj)
  {
    switch (obj)
    {
      case this.menuView.labelSS:
        this.slideShowView.show ();
        this.menuView.hide ();
        this.slideShowView.setFocus ();
        break;
        
      case this.menuView.labelPlala:
        this.menuView.hide ();
        this.plalaView.show ();
        this.plalaView.setFocus ();
        break;  
    }
  },
        
  onRight : function (obj)
  {
    switch (obj)
    {
      case this.labelSS:
        this.slideShowView.setFocus ()
         break;
        
      case this.labelPlala:
        this.plalaView.setFocus ()
         break;
    }
  },
};
TestLime.prototype.__proto__ = Application.prototype;