/**
 Copyright (C) 2009-2011. ViniSketch SARL - David Thevenin

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
*/

var _toString = Object.prototype.toString;
/** @const */ Object.NULL_TYPE = 'Null';
/** @const */ Object.UNDEFINED_TYPE = 'Undefined';
/** @const */ Object.BOOLEAN_TYPE = 'Boolean';
/** @const */ Object.NUMBER_TYPE = 'Number';
/** @const */ Object.STRING_TYPE = 'String';
/** @const */ Object.OBJECT_TYPE = 'Object';
/** @const */ Object.BOOLEAN_CLASS = '[object Boolean]';
/** @const */ Object.NUMBER_CLASS = '[object Number]';
/** @const */ Object.STRING_CLASS = '[object String]';
/** @const */ Object.ARRAY_CLASS = '[object Array]';
/** @const */ Object.OBJECT_CLASS = '[object Object]';

function _isElement (object)
{
  return !!(object && object.nodeType == 1);
};
Object.isElement = _isElement;

Array.prototype.__toString__ = _toString;
function _isArray (object)
{
  if (!object) { return false; }
  if (!object.__toString__)
  { 
    object.__toString__ = _toString;
  }
  return object.__toString__ ()  == Object.ARRAY_CLASS;
};
Object.isArray = _isArray;

function _isFunction (object)
{
  return typeof object == "function";
};
Object.isFunction = _isFunction;

String.prototype.__toString__ = _toString;
function _isString (object)
{
  if (!object) { return false; }
  if (!object.__toString__)
  { 
    object.__toString__ = _toString;
  }
  return object.__toString__ () == Object.STRING_CLASS;
};
Object.isString = _isString;

Number.prototype.__toString__ = _toString;
function _isNumber (object)
{
  if (!object) { return false; }
  if (!object.__toString__)
  { 
    object.__toString__ = _toString;
  }
  return object.__toString__ () == Object.NUMBER_CLASS;
};
Object.isNumber = _isNumber;

function _isUndefined (object)
{
  return typeof object == "undefined";
};
Object.isUndefined = _isUndefined;

function _camelize ()
{
  var parts = this.split('-'), len = parts.length;
  if (len == 1) { return parts[0]; }

  var camelized = this.charAt(0) == '-'
    ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
    : parts[0];

  for (var i = 1; i < len; i++)
    camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

  return camelized;
}
String.prototype.camelize = _camelize;

function _underscore ()
{
  var underscored = "", len = this.length, code;
  
  for (var i = 0; i < len; i++)
  {
    code = this.charCodeAt (i);
    if (code > 64 && code < 91)
    {
      underscored += '_' + this.charAt (i).toLowerCase();
    }
    else
    {
      underscored += this.charAt (i);
    }
  }
  return underscored;
}
String.prototype.underscore = _underscore;

function _capitalize ()
{
  return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
}
String.prototype.capitalize = _capitalize;

function __slice (obj, start, end)
{
  var l = obj.length, result = new Array (l);
  
  if (!end|| end > l) { end = l; }
  if (!start || start < 0 || start > l) { start = 0; }
  
  var j = 0;
  for (var i = start; i < end; i++)
  {
    result [j++] = obj [i];
  }
  return result;
};

function _slice (start, end)
{
  return __slice (this, start, end);
};

/**
 * Selects a part of an array, and returns the new array.
 *
 *  @param {int} start An integer that specifies where to start the selection 
 *  (The first element has an index of 0). You can also use negative numbers to 
 *  select from the end of an array
 *  @param {int} end An integer that specifies where to end the selection. If 
 *  omitted, slice() selects all elements from the start position and to the end 
 *  of the array
 *  @returns the new array 
 */
if (!Array.prototype.slice) { Array.prototype.slice = _slice; }


/**
 * Removes the elements in the specified interval of this Array.<br/> 
 * Shifts any subsequent elements to the left (subtracts one from their 
 * indices).<br/>
 * This method extends the JavaScript Array prototype.
 * By John Resig (MIT Licensed)
 *
 * @param {int} from Index of the first element to be removed
 * @param {int} to Index of the last element to be removed
 */
function __remove (from, to)
{
  var rest = this.slice ((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply (this, rest);
};
Array.prototype._remove = __remove;

/**
 *  Find an element into this Array.
 *
 * @param {Object} obj Element to locate in the array
 * @param {number} fromIndex The index at which to begin the search. 
 *    Defaults to 0, i.e. the whole array will be searched.
 *    If the index is greater than or equal to the length of the 
 *    array, -1 is returned
 * @return {int} the Index of the element. Return -1 if unfound.
 */
function _indexOf (obj, from)
{
  var len = this.length;

  var from = from?from:0;
  from = (from < 0)? 0: from;

  while (from < len)
  {
    if (this [from] == obj) { return from; }
    from++;
  }
  return -1;
};
Array.prototype.indexOf = _indexOf;

/**
 * Removes the elements in the specified interval of this Array.<br/> 
 * Shifts any subsequent elements to the left (subtracts one from their indices).<br/>
 * This method extends the JavaScript Array prototype.
 *
 * @param {int} from Index of the first element to be removed
 * @param {int} to Index of the last element to be removed
 * @return {Array} the modified array
 */
function _remove (from, to)
{
  if ((typeof(from) == "object") ||
      (typeof(from) == "string"))
  {
    var i = 0;
    while (i < this.length)
    {
      if (this[i] == from) { this._remove (i); }
      else { i++; }
    }
  }
  else { this._remove (from, to); }
  return this;
};
Array.prototype.remove = _remove;

/**
 * Removes all elements of this Array.<br/> 
 *
 * @return {Array} the modified array
 */
function _removeAll ()
{
  while (this.length > 0) { this._remove (0); }
  return this;
};
Array.prototype.removeAll = _removeAll;

function _delete (obj)
{
  if (!obj) { return; }
  if (obj._free) { obj._free (); }
  if (obj.destructor) { obj.destructor (); }
  delete (obj);
  obj = null;
  return obj;
}
var free = _delete;

/**
*  Compute the elements position in terms of the window viewport
**/
function _toAbsolute (element)
{
  if (!element)
  { return null; }

	var x = 0;
  var y = 0;
  var parent = element;
  while (parent)
  {
     var borderXOffset = 0;
     var borderYOffset = 0;
     if (parent != element)
     {
        borderXOffset = parseInt (
          parent.currentStyle?
          parent.currentStyle ["borderLeftWidth"]:0, 0);
        borderYOffset = parseInt (
          parent.currentStyle?
          parent.currentStyle ["borderTopWidth"]:0, 0);
        borderXOffset = isNaN (borderXOffset) ? 0 : borderXOffset;
        borderYOffset = isNaN (borderYOffset) ? 0 : borderYOffset;
     }

     x += parent.offsetLeft - parent.scrollLeft + borderXOffset;
     y += parent.offsetTop - parent.scrollTop + borderYOffset;
     parent = parent.offsetParent;
  }
  var result = new Object ();
  result.x = x; result.y = y;
  return result;
}

/************************************************************
   Class Mechanism
************************************************************/

function object_extend (obj, proto)
{
  for (var prop in proto)
  {
    obj [prop] = proto [prop];
  }
  return (obj);
}

function object_extend_with_proto (obj, proto_name)
{
  if (!obj || !proto_name) { return; }
  var proto = __proto_list [proto_name];
  if (!proto)
  {
    printlnConsole ("Class.new: Unknown proto '" + proto_name + "'");
    return;
  }
  
  for (var prop in proto)
  {
    if (obj [prop]) { continue; }
    
    obj [prop] = proto [prop];
  }
  
  var sub_proto_name = __proto_hierarchy  [proto_name];
  if (sub_proto_name)
  {
    object_extend_with_proto (obj, sub_proto_name);
  }

  return (obj);
}

var __proto_list = new Object ();
var __proto_hierarchy = new Object ();

function class_extend (class_dest_name, class_src_name)
{
  var u_class_dest_name = class_dest_name.underscore ();
  var u_class_src_name = class_src_name.underscore ();
  var proto_dest = __proto_list [u_class_dest_name];
  var proto_src = __proto_list [u_class_src_name];
  var member, prop;

  if (!proto_dest)
  {
    printlnConsole ("Class.extend: Unknown class '" + class_dest_name + "'");
    return;
  }
  if (!proto_src)
  {
    printlnConsole ("Class.extend: Unknown class '" + class_src_name + "'");
    return;
  }
  __proto_hierarchy  [u_class_dest_name] = u_class_src_name;
  proto_dest.__proto__ = proto_src;
//   var u_class_sub_name = __proto_hierarchy [u_class_src_name];
//   
//   for (prop in proto_src)
//   {
//     member = proto_src [prop];
//     if (!proto_dest [prop])
//     {
//       proto_dest [prop] = member;
//     }
//     if (Object.isFunction (member))
//     {
//       if (u_class_sub_name && prop.indexOf (u_class_sub_name) == 0)
//       {
//         continue;
//       }
//       /* manage polymorphisme */
//       fct_name = u_class_src_name + '_' + prop;
//       proto_dest [fct_name] = member;
// //      printlnConsole (class_dest_name + ' __ ' + fct_name);
//     }
//   }
}

function __apply__ (obj, method, args)
{
  if (!obj)
  {
    printlnConsole (" __apply__ Object null");
    return;
  }
  if (!method || !Object.isFunction (obj [method]))
  {
    printlnConsole (" __apply__ unknown method '" + method + "'");
    return;
  }

  if (!args || args.length == 0)
    return obj [method] ();
  else if (args.length == 1)
    return obj [method] (args[0]);
  else if (args.length == 2)
    return obj [method] (args[0], args[1]);
  else if (args.length == 3)
    return obj [method] (args[0], args[1], args[2]);
  else if (args.length == 4)
    return obj [method] (args[0], args[1], args[2], args[3]);
  else if (args.length == 5)
    return obj [method] (args[0], args[1], args[2], args[3], args[4]);
  else if (args.length == 6)
    return obj [method] (args[0], args[1], args[2], args[3], args[4], args[5]);
  else if (args.length == 7)
    return obj [method] (args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
  else
  {
    printlnConsole (" __apply__ Too much parameters...");
  }
}

function class_apply ()
{
  var args = arguments;
  var class_name = args [0];
  var method = args [1];

  if (!class_name || !Object.isString (class_name) ||
      !method || !Object.isString (method))
  {
    printlnConsole ("Class.apply : bad parameters.");
    return;
  }

  if (args.length > 2)
  {
    args = __slice (args, 2);
  }
  else
  {
    args = null;
  }
  var proto_name = class_name.underscore ();
  var proto = __proto_list [proto_name];
  if (!proto)
  {
    printlnConsole ("Class.apply : unknown prototype for class '" + class_name + "'");
    return;
  }
  
  while (proto)
  {
    if (Object.isFunction (proto [method]))
    {
      this.__function_to_call__ = proto [method];
      var result = __apply__ (this, '__function_to_call__', args);
      delete this.__function_to_call__;
      return result;
    }
    proto = proto.__proto__;
  }

  printlnConsole ("Class.super : unknown function '" + method + "'");
}

function class_new ()
{
  var args = arguments;
  var class_name = args [0];
  var proto_name = class_name.underscore ();
  var proto = __proto_list [proto_name];
  if (!proto)
  {
    printlnConsole ("Impossible to instanciate with unknown prototype '" + proto_name + "'");
    return;
  }
  
  var obj = new Object ();
  object_extend_with_proto (obj, proto_name);
  obj.apply = class_apply;
  obj.__proto__ = proto;
  
  if (obj._constructor)
  {
    if (args.length == 1)
      obj._constructor ();
    else if (args.length == 2)
      obj._constructor (args[1]);
    else if (args.length == 3)
      obj._constructor (args[1], args[2]);
    else if (args.length == 4)
      obj._constructor (args[1], args[2], args[3]);
    else if (args.length == 5)
      obj._constructor (args[1], args[2], args[3], args[4]);
    else if (args.length == 6)
      obj._constructor (args[1], args[2], args[3], args[4], args[5]);
    else if (args.length == 7)
      obj._constructor (args[1], args[2], args[3], args[4], args[5], args[6]);
  }
  return obj
}

function class_create (class_name, proto)
{
  var proto_name = class_name.underscore ();
  __proto_list [proto_name] = proto;
  proto.__name__ = proto_name;
  
  return new Object ();
}

function class_add_method (class_name, method_name, func)
{
  var u_class_name = class_name.underscore ();
  var proto = __proto_list [u_class_name];
  if (!proto)
  {
    printlnConsole ("Impossible to add method to unknown class '" + class_name + "'");
    return;
  }
  proto [method_name] = func;
}

var Class = new Object ();
Class.extend = class_extend;
Class.create = class_create;
Class.addMethod = class_add_method;
Class["new"] = class_new;
/**
  Copyright (C) 2009-2011. ViniSketch SARL (c) All rights reserved
  
  THIS SOURCE CODE, ALL THE INTELLECTUAL PROPERTY RIGHTS THAT IT
  CONTAINS, AND ALL COPYRIGHTS PERTAINING THERETO ARE THE EXCLUSIVE
  PROPERTY OF VINISKETCH SARL.
  
  THIS SOURCE CODE SHALL NOT BE COPIED OR REPRODUCED IN
  FULL OR IN PART.
  
  THE PRESENT COPYRIGHT NOTICE MAY NOT BE CHANGED NOR REMOVED FROM THE
  PRESENT FILE.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 *  @class
 *  An ABEvent object, or simply an event, contains information about an input
 *  action such as a button click or a key down. The ABEvent object contains
 *  pertinent information about each event, such as where the cursor was located
 *  or which character was typed.<br>
 *  When an event is catch by an application component, the callback
 *  receives as parameters an instance (or sub instance) of this class.
 *  <p>
 *  It specifies the source of the event (which object has generated the event),
 *  the type of the event and an event data.
 *
 *  @author David Thevenin
 *
 *  @constructor
 *  Main constructor
 *
 *	@param {ABEventSource} src the source of the event [mandatory]
 *	@param {string} type the event type [mandatory]
 *	@param {Object} data complemetary event data [optional]
*/
function ABEvent (src, type, data)
{
/**
 * The component which produce the event
 * @type {ABEventSource|HTMLElement}
 */
  this.src = src;

/**
 * The component which produce the event. <br>
 * In case of DOM event, the ABEvent is mapped to the DOM event. Then
 * the developer has access to srcTarget (and many other data).
 * @deprecated
 * @type {ABEventSource|HTMLElement}
 */
  this.srcTarget = src;

/**
 * The event spec. For instance 'click' for a mouse click event.
 * @type {String}
 */
  this.type = type;

/**
 * The optional data associate to the event.
 * @type {Object|null}
 */
  this.data = data;
}/**
  Copyright (C) 2009-2011. ViniSketch SARL (c) All rights reserved
  
  THIS SOURCE CODE, ALL THE INTELLECTUAL PROPERTY RIGHTS THAT IT
  CONTAINS, AND ALL COPYRIGHTS PERTAINING THERETO ARE THE EXCLUSIVE
  PROPERTY OF VINISKETCH SARL.
  
  THIS SOURCE CODE SHALL NOT BE COPIED OR REPRODUCED IN
  FULL OR IN PART.
  
  THE PRESENT COPYRIGHT NOTICE MAY NOT BE CHANGED NOR REMOVED FROM THE
  PRESENT FILE.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
*/

var abobject_proto = new Object ();

/**
 *  @class
 *  ABObject is the root class of most class hierarchies. Through ABObject,
 *  objects inherit a basic interface for configuration and clone mechanism.
 *  It provides an unique identifier for objects.
 *
 *  @author David Thevenin
 *
 *  @constructor
 *  Main constructor
 *
 *	@param {string} id the identifier [mandatory]
*/
function abobject_constructor (id)
{
  if (!Object.isString (id))
  {
    if (id && id.id) { this.id = id.id; }
  // if no id is specified, create one
    else { this.id = ABObject.createId (); }
  }
  else
  {
    this.id = id;
  }
  
  // save the current object
  ABObject._obs [this.id] = this;
  this.__i__ = false;
}
abobject_proto._constructor = abobject_constructor;

/**
 * Returns an unique Id <p>
 * The algorithm is use a time stamp and a random number to generate the id.
 * @return {String}
 * @private
 */
function _createId ()
{
  return "id_" + new Date().getTime() + "" + Math.floor (Math.random() * 1000);
}
  
/**
 * @private
 */
abobject_proto.id = '';

/**
 * @private
 */
abobject_proto.__i__ = false;

/**
 * Object default init. <p>
 * Should be overloaded by the object extension class.
 *
 * @example
 * myObject = new ABObject (ABObject.createID ());
 * myObject.init ();
 */
function abobject_init ()
{
  if (this.__i__) { return; }
  this.initComponent ();
  
  this.__i__ = true;
}
abobject_proto.init = abobject_init;

/**
 * @private
 */
function abobject_initComponent ()
{};
abobject_proto.initComponent = abobject_initComponent;
  
/**
 * Object configuation method. <p>
 * This is a useful function for configuring an ABObject. It takes as
 * parameters, an associated array <key, value>. Each object member identical 
 * to the key are set with the associated value
 *
 * @param {Object} config the associated array used for configuring the object.
 */
function abobject_configure (config)
{
  if (typeof (config) != 'object') { return; }
  
  for (var key in config)
  {
    if (key == 'id' || key == 'node' || key == 'view') 
    { continue; }
    if (!key.capitalize) { continue; }
    var method = "set" + key.capitalize ();
    if (!this [method]) { continue; }
    this [method] (config [key]);
  }
}
abobject_proto.configure = abobject_configure;
  
/**
 * @protected
 */
function abobject_destructor ()
{}
abobject_proto.destructor = abobject_destructor;

var ABObject = Class.create ('ABObject', abobject_proto);

ABObject._obs = new Object ();

/**
 * Returns an unique Id <p>
 * The algorithm is use a time stamp and a random number to generate the id.
 * @return {String}
 */
ABObject.createId = _createId;/**
  Copyright (C) 2009-2011. ViniSketch SARL (c) All rights reserved
  
  THIS SOURCE CODE, ALL THE INTELLECTUAL PROPERTY RIGHTS THAT IT
  CONTAINS, AND ALL COPYRIGHTS PERTAINING THERETO ARE THE EXCLUSIVE
  PROPERTY OF VINISKETCH SARL.
  
  THIS SOURCE CODE SHALL NOT BE COPIED OR REPRODUCED IN
  FULL OR IN PART.
  
  THE PRESENT COPYRIGHT NOTICE MAY NOT BE CHANGED NOR REMOVED FROM THE
  PRESENT FILE.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
*/


/**
 *  Structure used for managing events
 *  @private
 */
function ABHandler (_spec, _obj, _func)
{
  this.spec = _spec;
  this.obj = _obj;
  this.func = _func;
}

var abeventsource_proto = new Object ();

/**
 *  @class
 *  ABEventSource is an  class that forms the basis of event and command 
 *  processing. All class that handles events must inherit form ABEventSource.
 *
 *  @extends ABObject
 *  @author David Thevenin
 *
 *  @constructor
 *  Main constructor
 *
 *@param {string} id the identifier [mandatory]
*/
function abeventsource_constructor (_id)
{
  if (!Object.isString (_id))
  {
    if (_id && _id.id) { _id = _id.id; }
    else { _id = ABObject.createId (); }
  }

  this.apply ('ABObject', '_constructor', _id);
  
  this.__bindings__ = new Object ();
  this.__node_binds__ = new Object ();
}
abeventsource_proto._constructor = abeventsource_constructor;

/**
 * @protected
 */
abeventsource_proto.__bindings__ = null;

/**
 * @private
 */
abeventsource_proto.__node_binds__ = null;

/***************************************************************

***************************************************************/

/**
 * @protected
 */
function abeventsource_destructor ()
{
  var spec, list_bind, i, handler, binds;
  
  for (spec in this.__bindings__)
  {
    list_bind = this.__bindings__ [spec];
    if (!list_bind) { continue; }
    while (list_bind.length)
    {
      handler = list_bind.pop ();
      delete (handler);
    }
    delete (this.__bindings__ [spec]);
  }
  
  delete (this.__bindings__);
  
  for (spec in this.__node_binds__)
  {
    binds = this.__node_binds__ [spec];
    if (typeof (binds) == "undefined")
    {
      printlnConsole
        ("ABObject.destructor, no bind <" + spec + " exists.");
      continue;
    }
    for (i = 0; i < binds.length; i++)
    {
      data = binds [i];
      data.n.removeEventListener (event, data.h);
    }
  }
  delete (this.__node_binds__);
  
  this.apply ('ABObject', 'destructor');
}
abeventsource_proto.destructor = abeventsource_destructor;

/**
 * @protected
 */
function abeventsource_bind (spec, obj, func)
{
  if (!spec || !obj) { return; }
  
  /** @private */
  var handler = new ABHandler (spec, obj, func),
    list_bind = this.__bindings__ [spec];
  if (!list_bind)
  {
    list_bind = new Array ();
    this.__bindings__ [spec] = list_bind; 
  }
  list_bind [list_bind.length] = handler;
  
  return handler;
}

/**
 * @protected
 */
function abeventsource_unbind (spec, obj, func)
{
  var list_bind = this.__bindings__ [spec], i = 0, bind;
  if (!list_bind) { return; }

  while (i < list_bind.length)
  {
    bind = list_bind [i];
    if (bind.spec == spec)
    {
      if (bind.obj == obj)
      {
        if (Object.isString (func) || Object.isFunction (func) )
        {
          if (bind.func == func)
          {
            list_bind.remove (i);
            delete (bind);
          }
          else { i++; }
        }
        else
        {
          list_bind.remove (i);
          delete (bind);
        }
      }
      else { i++; }
    }
    else { i++; }
  }
}

/**
 *  The event bind method to listen events
 *  <p>
 *  When you want listen an event generated by this object, you can
 *  bind your object (the observer) to this object using 'bind' method.
 *  <p>
 *  Warning:<br>
 *
 * @param {string} spec the event specification [mandatory]
 * @param {ABObject} obj the object interested to catch the event [mandatory]
 * @param {string} func the name of a callback. If its not defined
 *        notify method will be called [optional]
 *        an other "simili thread". 
 */
abeventsource_proto.bind = abeventsource_bind;

/**
 *  The event unbind method
 *  <p>
 *  Should be call when you want stop event listening on this object
 *
 * @param {string} spec the event specification [mandatory]
 * @param {ABObject} obj the object you want unbind [mandatory]
 * @param {string} func the name of a callback. If its not defined
 *        all binding with <spec, obj> will be removed
 */
abeventsource_proto.unbind = abeventsource_unbind;

/**
 *  Propagate an event
 *  <p>
 *  All Object listening this ABEventSource will receive this new handled
 *  event.
 *
 * @param {String} spec the event specification [mandatory]
 * @param {Object} data an optional data event [optional]
 * @param {ABObject} srcTarget a event source, By default this object is
 *        the event source [mandatory]
 */
function abeventsource_propagate (type, data, srcTarget)
{
  var list_bind = this.__bindings__ [type], event, i, handler, func;
  if (!list_bind)
  {
    if (this.__parent)
    {
      if (!srcTarget) { srcTarget = this; }
      this.__parent.propagate (type, data, srcTarget);
    }
    return;
  }
  event = new ABEvent (this, type, data);
  if (srcTarget) { event.srcTarget = srcTarget; }
  
  i = list_bind.length;

  while (i--)
  {
    /** @private */
    handler = list_bind [i];    
    
    if (handler.func)
    {
      if (!handler.obj[handler.func])
      {
        printlnDebug ("Unknown method '" + handler.func +
         "' in class propotype '" + handler.obj.__name__ +  "'");
        return
      }
      handler.obj[handler.func] (event); // specific notify method
    }
    else
    {
      handler.obj.notify (event); // default notify method
    }
  }
}
abeventsource_proto.propagate = abeventsource_propagate;

/**
 * Propagate an data change event
 *
 * who will not receive the event
 */
function abeventsource_propagateChanges (who, info, data) 
{
  var type = "data_changed",
    list_bind = this.__bindings__ [type], event, i, handler, func;
    
  if (!list_bind) { return; }
  
  var e_data = new Object ();
  e_data.info = info;
  e_data.data = data;
  
  event = new ABEvent (this, type, e_data);
  
  i = list_bind.length;

  while (i--)
  {
    /** @private */
    handler = list_bind [i];
    if (handler.obj == who) { continue; }

    if (handler.func)
    {
      if (!handler.obj[handler.func])
      {
        printlnDebug ("Unknown method '" + handler.func +
         "' in class propotype '" + handler.obj.__name__ +  "'");
        return
      }
      handler.obj[handler.func] (event); // specific notify method
    }
    else
    {
      handler.obj.notify (event); // default notify method
    }
  }
  delete (event);
} 
abeventsource_proto.propagateChanges = abeventsource_propagateChanges;

/**
 * if this object receive an event it repropagates it if nobody has 
 * overcharged the notify method.
 * @protected
 */
function abeventsource_notify (event)
{
  this.propagate (event.type, event.data);
}
abeventsource_proto.notify = abeventsource_notify;

var ABEventSource = Class.create ('ABEventSource', abeventsource_proto);
Class.extend ('ABEventSource', 'ABObject');
/**
  Copyright (C) 2009-2011. ViniSketch SARL (c) All rights reserved
  
  THIS SOURCE CODE, ALL THE INTELLECTUAL PROPERTY RIGHTS THAT IT
  CONTAINS, AND ALL COPYRIGHTS PERTAINING THERETO ARE THE EXCLUSIVE
  PROPERTY OF VINISKETCH SARL.
  
  THIS SOURCE CODE SHALL NOT BE COPIED OR REPRODUCED IN
  FULL OR IN PART.
    
  THE PRESENT COPYRIGHT NOTICE MAY NOT BE CHANGED NOR REMOVED FROM THE
  PRESENT FILE.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 *  The KEYBOARD Object
 * <p>
 * <p>
 *  List of predefined event spec:<br>
 *  <ul>
 *  <li> KEYBOARD.KEY_UP
 *  <li> KEYBOARD.ESC
 *  <li> KEYBOARD.ENTER
 *  <li> KEYBOARD.SPACE
 *  <li> KEYBOARD.BACKSPACE
 *  <li> KEYBOARD.SHIFT
 *  <li> KEYBOARD.CTRL
 *  <li> KEYBOARD.ALT
 *  <li> KEYBOARD.NUMLOCK
 *  <li> KEYBOARD.LEFT_ARROW 
 *  <li> KEYBOARD.UP_ARROW 
 *  <li> KEYBOARD.RIGHT_ARROW
 *  <li> KEYBOARD.DOWN_ARROW 
 *  <li> KEYBOARD.A
 *  <li> KEYBOARD.S
 *  <li> KEYBOARD.Z
 *  <li> KEYBOARD.META
 *  <li> KEYBOARD.ANY_MASK
 *  <li> KEYBOARD.UNDO
 *  <li> KEYBOARD.REDO
 *  <li> KEYBOARD.SAVE
 * </ul>
 *  @type {ABEventSource}
 *  @const
 */
var KEYBOARD = Class["new"] ('ABEventSource', '__KEYBOARD__');

/*KEYBOARD._handler_set_down = false;
KEYBOARD._handler_set_up = false;*/

function __keyup_handler (event)
{
  if (!event) 
  { event = document.currentEvent; }
  KEYBOARD.propagate (event.keyCode + KEYBOARD.KEY_UP, event);
}
      
function __keydown_handler (event)
{
  if (!event) 
  { event = document.currentEvent; }
  
  KEYBOARD.propagate (event.keyCode, event);
}
      
function KEYBOARD_bind (keyCode, obj, func, prevent)
{
  var handler = this.abeventsource_bind (keyCode, obj, func),
    self = this;
  /*
  if (keyCode > KEYBOARD.KEY_UP)
  {
    if (!this._handler_set_up)
    {
      document.onkeyup = __keyup_handler;
      this._handler_set_up = true;
    }
  }
  else
  {
    if (!this._handler_set_down)
    {
      document.onkeydown = __keydown_handler;
      this._handler_set_down = true;
    }
  }
  */
};
KEYBOARD.abeventsource_bind = KEYBOARD.bind;
KEYBOARD.bind = KEYBOARD_bind;

KEYBOARD.KEY_UP = 1000; 
KEYBOARD.ENTER = 18;
KEYBOARD.RED = 22;
KEYBOARD.BLUE = 21;
KEYBOARD.GREEN = 23;
KEYBOARD.YELLOW = 24;
KEYBOARD.BACK = 19;

KEYBOARD.LEFT_ARROW = 3;
KEYBOARD.UP_ARROW = 1;
KEYBOARD.RIGHT_ARROW = 4;
KEYBOARD.DOWN_ARROW = 2;


KEYBOARD.ZERO = 10;
KEYBOARD.ONE = 11;
KEYBOARD.TWO = 12;
KEYBOARD.TREE = 13;
KEYBOARD.FOUR = 14;
KEYBOARD.FIVE = 15;
KEYBOARD.SIX = 16;
KEYBOARD.SEVEN = 17;
KEYBOARD.EIGHT = 18;
KEYBOARD.NINE = 19;


/*
*                    COPYRIGHT NOTICE
*
* Copyright (C) 2009-2011. ViniSketch SARL (c) All rights reserved
*
* THIS SOURCE CODE, ALL THE INTELLECTUAL PROPERTY RIGHTS THAT IT
* CONTAINS, AND ALL COPYRIGHTS PERTAINING THERETO ARE THE EXCLUSIVE
* PROPERTY OF VINISKETCH.
*
* THIS SOURCE CODE SHALL NOT BE DISTRIBUTED, COPIED OR REPRODUCED IN
* FULL OR IN PART, NOR SHALL DERIVATIVE WORKS BE CREATED BASED ON THIS
* SOURCE CODE OR THE RELATED SPECIFICATION.
*
* THIS SOURCE CODE MAY BE USED OR COMPILED SOLELY FOR THE PURPOSE OF
* PORTING THE PRODUCT ONTO VENDOR'S SOLUTION. THIS SOURCE
* CODE MAY NOT BE MODIFIED, EVEN PARTIALLY.
*
* THE PRESENT COPYRIGHT NOTICE MAY NOT BE CHANGED NOR REMOVED FROM THE
* PRESENT FILE.
*/

function __setPos (node, x, y)
{
  if (!node) { return; }
  node.normalStyle.left = x + 'px';
  node.normalStyle.top = y + 'px';
}

function __setSize (node, w, h)
{
  if (!node) { return; }
  node.normalStyle.width = w + 'px';
  node.normalStyle.height = h + 'px';
}

function __setVisible (node, v)
{
  if (!node) { return; }
  if (node.normalStyle)
  {
    if (v)
    {
      node.normalStyle.visibility = "visible";
    }
    else
    {
      node.normalStyle.visibility = "hidden";
    }
  }
}

function __getTagName (node)
{
  if (!node.tagName) { return undefined; }
  
  if (typeof node.tagName == "string") { return node.tagName; }
  if (typeof node.tagName == "function") { return node.tagName (); }
  return undefined;
}

function __isVisible (node)
{
  if (!node) { return false; }
  
  if (node.normalStyle || typeof (node.innerHTML) == 'string')
  {
    if (node.normalStyle.visibility == 'hidden') { return false; }
    else { return true; }
  }
/*  else if (node instanceof CharacterData) */
  {
    return true;
  }
}

function __setInnerText (node, text)
{
  if (!node || !node.firstChild) { return; }
  
  node.firstChild.data = text;
};

var abview_proto = new Object ();

/**
 *  The ABView class
 *
 *  @extends ABEventSource
 *  @class
 *  ABView is a class that defines the basic drawing, event-handling, of 
 *  an application. You typically don’t interact with the ABView API
 *  directly; rather, your custom view classes inherit from ABView and
 *  override many of its methods.
 *  <p>
 *  If you’re not creating a custom view class, there are few methods you
 *  need to use
 *
 *  Events:
 *  <ul>
 *    <li /> POINTER_START: Fired after the user click/tap on the view, when 
 *           the user depresses the mouse/screen
 *    <li /> POINTER_MOVE: Fired after the user move the mouse/his finger on
 *           the view.
 *    <li /> POINTER_END: Fired after the user click/tap on the view, when
 *           the user release the mouse/ the pressur on screen.
 *  </ul>
 *  <p>
 *  @example
 *
 *  @author David Thevenin
 *
 *  @constructor
 *   Creates a new ABView
 *
 *	@param {Object} config the configuration stucture [mandatory]
*/
function abview_constructor (config)
{
  this._pos = new Array (2);
  this._pos [0] = -1;
  this._pos [1] = -1;
  this._size = new Array (2);
  this._size [0] = -1;
  this._size [1] = -1;
  
  if (!config) { config = new Object (); }

  var _id;
  if (config.id) { _id = config.id; }
  else
  {
    _id = ABObject.createId ();
    config.id = _id;
  }

  this.apply ('ABEventSource', '_constructor', _id);
  
  this._holes = new Object ();
  this.children = new Object ();

  this.view = this._getGUInode (config);
  if (!this.view)
  {
    printlnConsole ('ABView constructor failed. No view!');
    return;
  }
  this.view.id = this.id;
  this.view._comp_ = this;
  
  this._instrument_view (this.view);
  this._parse_view (this.view);
}
abview_proto._constructor = abview_constructor;
/********************************************************************
                    Layout constant
*********************************************************************/

/*****************************************************************
 *                Private members
 ****************************************************************/
/**
 * @protected
 * @type {boolean}
 */
abview_proto._navigation_delegate = null;

/**
 * @protected
 * @type {boolean}
 */
abview_proto._visible = true;

/**
 * @protected
 * @type {Array}
 */
abview_proto._pos  = null;

/**
 * @protected
 * @type {Array}
 */
abview_proto._size = null;
    
/**
 * @protected
 * @type {ABAnimation}
 */
abview_proto._show_animation = null;
abview_proto.__show_clb = null;

/**
 * @protected
 * @type {ABAnimation}
 */
abview_proto._hide_animation = null;
abview_proto.__hide_clb = null;

/*****************************************************************
 *     Properties declaration
 ****************************************************************/
/** 
 * Getter|Setter Navigation delegate
 * @function.
 * @type {Array.<delegate>}
 */ 
function abview_set_navigationDelegate (v)
{
  this._navigation_delegate = v;
};
abview_proto.setNavigationDelegate = abview_set_navigationDelegate;

/** 
 * Getter|Setter for size. Gives access to the size of the GUI Object
 * @name ABView#size 
 * @function.
 * @type {Array.<number>}
 */ 
function abview_set_size (v)
{
  if (!v) { return; } 
  if (!Object.isArray (v) || v.length != 2) { return; }
  if (!Object.isNumber (v[0]) || !Object.isNumber(v[1])) { return; }
  
  this._size [0] = v [0];
  this._size [1] = v [1];
  
  if (!this.view) { return; }
  this._updateSize ();
};
abview_proto.setSize = abview_set_size;

/**
 * @type {Array.<number>}
 */
function abview_get_size ()
{
  var view = this.view;
  if (view && view.parentNode)
  {
    this._size [0] = view.offsetWidth;
    this._size [1] = view.offsetHeight;
  }
  return this._size.slice ();
};
abview_proto.getSize = abview_get_size;

/** 
 * Getter|Setter for position. Gives access to the position of the GUI Object
 * @name ABView#position 
 * @function. 
 * @type Array
 */ 
function abview_set_position (v)
{
  if (!v) { return; }
  if (!Object.isArray (v) || v.length != 2) { return; }
  if (!Object.isNumber (v[0]) || !Object.isNumber(v[1])) { return; }
  
  this._pos [0] = v [0];
  this._pos [1] = v [1];
  
  if (!this.view) { return; }
  this._updatePos ();
};
abview_proto.setPosition = abview_set_position;

/**
 * @type {Array.<number>}
 */
function abview_get_position ()
{
  var view = this.view;
  if (view && view.parentNode)
  {
    this._pos [0] = view.offsetLeft;
    this._pos [1] = view.offsetTop;
  }
  return this._pos.slice ();
};
abview_proto.getPosition = abview_get_position;

/**
 * Hide or show the object.
 * obj.visible = true <=> obj.show (), obj.visible = false <=> obj.hide (), 
 * @name ABView#visible 
 * @type {boolean}
 */
function abview_set_visible (v)
{
  if (v)
  { this.show (); }
  else
  { this.hide (); }
};
abview_proto.setVisible = abview_set_visible;

/**
 * Return true is the object is visible. False otherwise.
 * @type {boolean}
 */
function abview_get_visible ()
{
  return this._visible;
};
abview_proto.getVisible = abview_get_visible;

/*****************************************************************
 *
 ****************************************************************/
/**
 * @protected
 */
function abview_destructor ()
{
  var key, a, i, child;
  if (this.__parent)
  {
    this.__parent.remove (this);
  }
  for (key in this.children)
  {
    a = this.children [key];
    if (!a) { continue; }
    
    if (Object.isArray (a))
    {
      for (i = 0; i < a.length; i++)
      {
        child = a [i];
        free (child);
      }
    }
    else
    { free (a); }
    delete (this.children [key]);
  }
  this.children = new Object ();
  delete (this.view);
  
  this.apply ('ABEventSource', 'destructor');
};
abview_proto.destructor = abview_destructor;

/**
 * @protected
 */
function abview_refresh ()
{
  var key, a, i, child;

  for (key in this.children)
  {
    a = this.children [key];
    if (!a) { continue; }
    
    if (Object.isArray (a))
    {
      for (i = 0; i < a.length; i++)
      {
        child = a [i];
        if (!child || !child.refresh) { continue; }
        child.refresh ();
      }
    }
    else if (a.refresh)
    { a.refresh (); }
  }
};
abview_proto.refresh = abview_refresh;

/**
 * @private
 */
function abview__getGUInode (config)
{
  // 1) the node is passed within config object
  if (config.node)
  {
    return config.node;
  }
  
  var node = null, obj;
  // find a direct reference
  if (config.node_id)
  {
    node = document.getElementById (config.node_id);
    if (node) { return node; }
  }    
      
  // last case : find a direct reference with component id 
  if (config.id)
  {
    node = document.getElementById (config.id);
    if (node) { return node; }
  }
  
  return undefined;
};
abview_proto._getGUInode = abview__getGUInode;
  
/**
 *  Init the GUI object.
 *  <p>
 *  This method should be implemented by all object inheriting from a
 *  ABView class. See the programer's guide for more information.
 *
 *  @example
 *  var myObject = new ABView (config);
 *  myObject.init ();
 *  // now myObject is active
 */
function abview_init ()
{
  this.apply ('ABEventSource', 'init');
  
  this.initSkin ();
};
abview_proto.init = abview_init;

function __view_focus ()
{
  var e = document.currentEvent;
  if (e && e.target && e.target._comp_)
  {
    e.target._comp_._onFocus ();
  }
}

function __view_blur ()
{
  var e = document.currentEvent;
  if (e && e.target && e.target._comp_)
  {
    e.target._comp_._onBlur ();
  }
}

/**
 * @protected
 */
function abview_initSkin (passSizeAndPosInit)
{
  var view = this.view;
  // if the object has view, init size and position
  // Becareful, size and position initialization take time
  if (!passSizeAndPosInit && view)
  {
    this._size [0] = view.offsetWidth;
    this._size [1] = view.offsetHeight;
    this._pos [0] = view.offsetLeft;
    this._pos [1] = view.offsetTop;
  }
  else
  {
    this._pos = new Array (2); this._pos [0] = -1; this._pos [1] = -1;
    this._size = new Array (2); this._size [0] = -1; this._size [1] = -1;
  }
/*
  var self = this;
  this.view.onFocus = __view_focus;
  this.view.onBlur = __view_blur;
*/
};
abview_proto.initSkin = abview_initSkin;

/**
 * @private
 */
function abview__parse_view (node)
{
  if (!node || node.nodeType == 3) { return; }

  var hole_attribute, child;
  
  if (node.attributes != null)
  {
    hole_attribute = node.attributes.getNamedItem ("x-hag-hole");
    if (hole_attribute)
    {
      this._holes [hole_attribute.nodeValue] = node;
      return; // hole can not include hode
    }
  }
  
  child = node.firstElementChild;
  while (child)
  {
    this._parse_view (child);
    child = child.nextElementSibling;
  }
};
abview_proto._parse_view = abview__parse_view;

/**
 * @private
 */
function abview__instrument_view (node)
{
};
abview_proto._instrument_view = abview__instrument_view;

function abview__onFocus ()
{
  Application._current_focus_comp = this;
  
  if (this._navigation_delegate && this._navigation_delegate.onFocus)
  {
    this._navigation_delegate.onFocus (this);
  }
};
abview_proto._onFocus = abview__onFocus;

function abview__onBlur ()
{
  if (this._navigation_delegate && this._navigation_delegate.onBlur)
  {
    this._navigation_delegate.onBlur (this);
  }
};
abview_proto._onBlur = abview__onBlur

function abview__onUp ()
{
  if (this._navigation_delegate && this._navigation_delegate.onUp)
  {
    this._navigation_delegate.onUp (this);
  }
};
abview_proto._onUp = abview__onUp

function abview__onDown ()
{
  if (this._navigation_delegate && this._navigation_delegate.onDown)
  {
    this._navigation_delegate.onDown (this);
  }
};
abview_proto._onDown = abview__onDown;

function abview__onLeft ()
{
  if (this._navigation_delegate && this._navigation_delegate.onLeft)
  {
    this._navigation_delegate.onLeft (this);
  }
};
abview_proto._onLeft = abview__onLeft;

function abview__onRight ()
{
  if (this._navigation_delegate && this._navigation_delegate.onRight)
  {
    this._navigation_delegate.onRight (this);
  }
};
abview_proto._onRight = abview__onRight;

function abview__onBeforeActive ()
{};
abview_proto._onBeforeActive = abview__onBeforeActive;

function abview__onActive ()
{
  if (this._navigation_delegate && this._navigation_delegate.onActive)
  {
    this._navigation_delegate.onActive (this);
  }
};
abview_proto._onActive = abview__onActive;

/**
 * @private
 */
function abview_notify (event)
{
};
abview_proto.notify = abview_notify;

/**
 *  Return true if the set component is a child o the current component
 *
 *	@param {ABEventSource} child The component to be removed.
 *	@return {boolean}
 */
function abview_isChild (child)
{
  if (!child) { return false; }
  
  var key, a, hole;
  
  for (key in this.children)
  {
    a = this.children [key];
    if (!a) { continue; }
    
    if (a == child || (Object.isArray (a) && a.indexOf (child) != -1))
    {
      return true;
    }
  }

  return false;
};
abview_proto.isChild = abview_isChild;

/**
 * @private
 */
function abview_add_object (child, extension, view)
{
  if (!child) { return; }
  if (!view) { view = child.view; }
  else { child.__gui_object__hack_view__ = view; }
  
  if (this.isChild (child)) { return; }
  
  var key, a, b, hole;
  if (!view)
  { key = ABView.NON_G_OBJECT; }
  // a non graphical object
  else if (!extension)
  { key = ABView.ANY_PLACE; }
  else
  { key = extension; }
  
  a = this.children [key];
  if (a && Object.isArray (a))
  { a [a.length] = child; }
  else if (a)
  {
    b = new Array ();
    b [0] = a;
    b [1] = child;
    this.children [key] = b;
  }
  else
  { this.children [key] = child; }

  hole = this._holes [key];
  if (view && hole)
  {
    if (view.parentNode)
    {
      if (view.parentNode == hole)
      {
        child.__parent = this;
        return;
      }
      view.parentNode.removeChild (view);
    }
    hole.appendChild (view);
    child.__parent = this;
  }
};
abview_proto.add_object = abview_add_object;

/**
 *  Add the specified child component to this component.
 *  <p>
 *  The component can be a graphic component (ABView) or
 *  a non graphic component (ABEventSource).
 *  In case of ABView its mandatory to set the extension.
 *  <p>
 *  The add is a lazy add! The child's view can be already in
 *  the HTML DOM. In that case, the add methode do not modify the DOM.
 *  <p>
 *  @example
 *  var myButton = new Button (conf);
 *  myObject.add (myButton, 'children');
 *
 *	@param {ABEventSource} child The component to be added.
 *	@param {String} extension [optional] The hole into a ABView will be insert.
*/
function abview_add (child, extension)
{
  this.add_object (child, extension);
};
abview_proto.add = abview_add;

/**
 * @private
 */
function abview_remove_object (child)
{
  if (!child) { return; }
  
  var key, a, hole, view;
  
  if (child.__gui_object__hack_view__)
  {
    view = child.__gui_object__hack_view__;
  }
  else { view = child.view; }
  
  if (view)
  {
    for (key in this.children)
    {
      a = this.children [key];
      if (!a) { continue; }
      
      if (a == child || (Object.isArray (a) && a.indexOf (child) != -1))
      {
        if (Object.isArray (a)) {a.remove (child);}
        else { delete (this.children [key]); }
        
        hole = this._holes [key];
        if (hole) { hole.removeChild (view); }
        
        child.__parent = null;
        break;
      }
    }
  }
};
abview_proto.remove_object = abview_remove_object;
  
/**
 *  Remove the specified child component from this component.
 * 
 *  @example
 *  myObject.remove (myButton);
 *
 *	@param {ABEventSource} child The component to be removed.
*/
function abview_remove (child)
{
  this.remove_object (child);
};
abview_proto.remove = abview_remove;

/**
 *  Remove all children components from this component and free them.
 * 
 *  @example
 *  myObject.removeAllChildren ();
 */
function abview_removeAllChildren ()
{
  var key, a, child;

  for (key in this.children)
  {
    a = this.children [key];
    if (!a) { continue; }
    
    if (Object.isArray (a))
    {
      while (a.length)
      {
        child = a [0];
        this.remove (child);
        free (child);
      }
    }
    else
    {
      this.remove (a);
      free (a);
    }
    delete (this.children [key]);
  }
  this.children = new Object ();
};
abview_proto.removeAllChildren = abview_removeAllChildren;

/********************************************************************
                GUI Utilities
********************************************************************/

/**
 * @private
 */
function abview__updateSizeAndPos ()
{
};
abview_proto._updateSizeAndPos = abview__updateSizeAndPos;

/**
 * @private
 */
function abview__updateSize ()
{
};
abview_proto._updateSize = abview__updateSize;

/**
 * @private
 */
function abview__updatePos ()
{
};
abview_proto._updatePos = abview__updatePos;

/********************************************************************
                
********************************************************************/

/**
 *  Displays the GUI Object
 */
function abview_show ()
{
  if (!this.view) { return; }
  if (this._visible) { return; }
  
  __setVisible (this.view, true);

  if (this._show_animation)
  {
    this._show_animation.process (this, this._show_object, this);
  }
  else
  {
    this._show_object ();
  }
};
abview_proto.show = abview_show;

/**
 *  Show the GUI Object
 *
 *  @private
 */
function abview__show_object ()
{
  if (!this.view) { return; }

  this._visible = true;
  
/*
  _propagate (this.id);

  if (this.__show_clb)
  {
    if (this._show_animation)
    { this.__show_clb.call (this); }
    else
    {
      var self = this;
      setTimeout (function () {self.__show_clb.call (self);}, 0);
    }
  }
*/
};
abview_proto._show_object = abview__show_object;

/**
 *  Hides the GUI Object
*/
function abview_hide ()
{
  if (!this.view) { return; }
  if (!this._visible) { return; }

  if (this._hide_animation)
  {
    this._hide_animation.process (this, this._hide_object, this);
  }
  else
  {
    this._hide_object ();
  }
};
abview_proto.hide = abview_hide;

/**
 *  Hides the GUI Object
 *
 *  @private
 */
function abview__hide_object ()
{
  if (!this.view) { return; }

  this._visible = false;
  
  __setVisible (this.view, false);
//  _propagate (this.id);
};
abview_proto._hide_object = abview__hide_object;

/********************************************************************
                state management
********************************************************************/
  
/**
 *  Set the visibility of the ABView.
 *
 *  <p>
 *  @example
 *  myObject.setVisible (false);
 *
 *	@param {Boolean} visibility The visibility can be 'true' or 'false'.
*/
function abview_setVisible (visibility)
{
  if (!this.view) { return; }
  
  __setVisible (this.view, visibility);
};
abview_proto.setVisible = abview_setVisible;

/********************************************************************
                
********************************************************************/
/**
 * @public
 */
function abview_setFocus ()
{
  if (!this.view)
  { return; }
  
  browser.lockScreen ();
/*  this.view.focus (); */
  if (Application._current_focus_comp)
  {
    Application._current_focus_comp._onBlur ();
  }
  this._onFocus ();
  browser.unlockScreen ();
}
abview_proto.setFocus = abview_setFocus;

var ABView = Class.create ('ABView', abview_proto);
Class.extend ('ABView', 'ABEventSource');

/********************************************************************
                    Delay constant
*********************************************************************/

/**
 * Feed back remanence in ms before select a item
 * @const
 */
ABView.SELECT_DELAY = 150;

/**
 * Feed back remanence in ms  before unselect a item
 * @const
 */
ABView.UNSELECT_DELAY = 300;

/**
 * Threshold in px  use to unselect a item when pointer move
 * @const
 */
ABView.MOVE_THRESHOLD = 20;

/********************************************************************
                    
*********************************************************************/

/**
 * @private
 */
ABView.NON_G_OBJECT = '_non_g_object';
/**
 * @private
 */
ABView.ANY_PLACE = 'children';
/**
 * @private
 */
ABView._positionStyle = undefined;/**
 Copyright (C) 2009-2011. ViniSketch SARL - David Thevenin

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
*/

var abtextlabel_proto = new Object ();

/**
 * A ABTextLabel.
 * @constructor
 * @extends ABView
 */
function abtextlabel_constructor (config)
{
  this.apply ('ABView', '_constructor', config);
}
abtextlabel_proto._constructor = abtextlabel_constructor;

/**
 * The text value
 * @protected
 * @type {string}
 */
abtextlabel_proto._text = "";

/*****************************************************************
 *
 ****************************************************************/

/**
 * Set the text value
 * @param {string} v
 */
function abtextlabel_set_text (v)
{
  if (typeof (v) == "undefined") { v = ''; }
  else if (Object.isNumber (v)) { v = '' + v; }
  else if (!Object.isString (v))
  {
    if (!v.toString) { return; }
    v = v.toString ();
  }
  
  this._text = v;
  __setInnerText (this.view, this._text);
}
abtextlabel_proto.setText = abtextlabel_set_text;

/**
 * get the text value
 * @type {string}
 */
function abtextlabel_get_text ()
{
  return this._text;
}
abtextlabel_proto.getText = abtextlabel_get_text;

/*****************************************************************
 *
 ****************************************************************/

/**
 * @protected
 */
function abtextlabel_initSkin ()
{
  this.apply ('ABView', 'initSkin');
  if (!this._text) { return; }
  
  __setInnerText (this.view, this._text);
}
abtextlabel_proto.initSkin = abtextlabel_initSkin;

var ABTextLabel = Class.create ('ABTextLabel', abtextlabel_proto);
Class.extend ('ABTextLabel', 'ABView');
/**
 Copyright (C) 2009-2011. ViniSketch SARL - David Thevenin

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
*/

var abnavtextlabel_proto = new Object ();
/**
 * A ABNavTextLabel.
 * @constructor
 * @extends ABView
 */
function abnavtextlabel_constructor (config)
{
  this.apply ('ABView', '_constructor', config);
}
abnavtextlabel_proto._constructor = abnavtextlabel_constructor;

/**
 * The text value
 * @protected
 * @type {string}
 */
abnavtextlabel_proto._text = "";

/**
 * The text when the width has focus
 * @protected
 * @type {string}
 */
abnavtextlabel_proto._focus_text = null;

/**
 * The text when the width is active
 * @protected
 * @type {string}
 */
abnavtextlabel_proto._active_text = null;

/**
 * The default view
 * @protected
 * @type {HtmlPElement}
 */
abnavtextlabel_proto._default_view = null;

/**
 * The focus view
 * @protected
 * @type {HtmlPElement}
 */
abnavtextlabel_proto._focus_view = null;

/**
 * The active view
 * @protected
 * @type {HtmlPElement}
 */
abnavtextlabel_proto._active_view = null;

/*****************************************************************
 *
 ****************************************************************/

/**
 * Set the text value
 * @param {string} v
 */
function abnavtextlabel_set_text (v)
{
  if (typeof (v) == "undefined") { v = ''; }
  else if (Object.isNumber (v)) { v = '' + v; }
  else if (!Object.isString (v))
  {
    if (!v.toString) { return; }
    v = v.toString ();
  }
  
  this._text = v;
  __setInnerText (this._default_view, this._text);
  if (!Object.isString (this._focus_text))
  {
    __setInnerText (this._focus_view, this._text);
  }
  if (!Object.isString (this._active_text))
  {
    __setInnerText (this._active_view, this._text);
  }
}
abnavtextlabel_proto.setText = abnavtextlabel_set_text;

/**
 * get the text value
 * @type {string}
 */
function abnavtextlabel_get_text ()
{
  return this._text;
}
abnavtextlabel_proto.getText = abnavtextlabel_get_text;

/**
 * The text when the widget has the focus
 * @param {string} v
 */
function abnavtextlabel_set_focus_text (v)
{
  if (typeof (v) == "undefined") { v = ''; }
  else if (Object.isNumber (v)) { v = '' + v; }
  else if (!Object.isString (v))
  {
    if (!v.toString) { return; }
    v = v.toString ();
  }
  
  this._focus_text = v;
  __setInnerText (this._focus_view, this._focus_text);
}
abnavtextlabel_proto.setFocusText = abnavtextlabel_set_focus_text;

/**
 * get the text value
 * @type {string}
 */
function abnavtextlabel_get_focus_text ()
{
  return this._focus_text;
}
abnavtextlabel_proto.getFocusText = abnavtextlabel_set_focus_text;

/**
 * The text when the widget is active
 * @param {string} v
 */
function abnavtextlabel_set_active_text (v)
{
  if (typeof (v) == "undefined") { v = ''; }
  else if (Object.isNumber (v)) { v = '' + v; }
  else if (!Object.isString (v))
  {
    if (!v.toString) { return; }
    v = v.toString ();
  }
  
  this._active_text = v;
  __setInnerText (this._active_view, this._active_text);
}
abnavtextlabel_proto.setActiveText = abnavtextlabel_set_active_text;

/**
 * get the text value
 * @type {string}
 */
function abnavtextlabel_get_active_text ()
{
  return this._active_text;
}
abnavtextlabel_proto.getActiveText = abnavtextlabel_get_active_text;

/*****************************************************************
 *
 ****************************************************************/

/**
 * @protected
 */
function abnavtextlabel_destructor ()
{
  delete (this._default_view);
  delete (this._focus_view);
  delete (this._active_view);
  
  this.apply ('ABView', 'destructor');
}
abnavtextlabel_proto.destructor = abnavtextlabel_destructor;

function abnavtextlabel__onFocus ()
{
  __setVisible (this._default_view, false);
  __setVisible (this._focus_view, true);
  __setVisible (this._active_view, false);
  
  this.apply ('ABView', '_onFocus');
}
abnavtextlabel_proto._onFocus = abnavtextlabel__onFocus;

function abnavtextlabel__onBlur ()
{
  __setVisible (this._default_view, true);
  __setVisible (this._focus_view, false);
  __setVisible (this._active_view, false);
  
  this.apply ('ABView', '_onBlur');
}
abnavtextlabel_proto._onBlur = abnavtextlabel__onBlur;

function abnavtextlabel__onBeforeActive ()
{
  __setVisible (this._default_view, false);
  __setVisible (this._focus_view, false);
  __setVisible (this._active_view, true);
  
  this.apply ('ABView', '_onBeforeActive');
}
abnavtextlabel_proto._onBeforeActive = abnavtextlabel__onBeforeActive;

function abnavtextlabel__onActive ()
{
  __setVisible (this._default_view, false);
  __setVisible (this._focus_view, true);
  __setVisible (this._active_view, false);
  
  this.apply ('ABView', '_onActive');
}
abnavtextlabel_proto._onActive = abnavtextlabel__onActive;

/**
 * @protected
 */
function abnavtextlabel_initSkin ()
{
  this.apply ('ABView', 'initSkin');
  
  if (this.view)
  {
    var child = this.view.firstChild;
    while (child && __getTagName (child) != 'p' && 
          __getTagName (child) != 'P')
    { child = child.nextSibling; }
    
    if (!child)
    {
      printlnConsole ("ERROR ABNavTextLabel.initSkin 1");
      return;
    }
    this._default_view = child;

    child = child.nextSibling;
    while (child && __getTagName (child) != 'p' && 
          __getTagName (child) != 'P')
    { child = child.nextSibling; }
    
    if (!child)
    {
      printlnConsole ("ERROR ABNavTextLabel.initSkin 2");
      return;
    }
    this._focus_view = child;

    child = child.nextSibling;
    while (child && __getTagName (child) != 'p' && 
          __getTagName (child) != 'P')
    { child = child.nextSibling; }
    
    if (!child)
    {
      printlnConsole ("ERROR ABNavTextLabel.initSkin 3");
      return;
    }
    this._active_view = child;
  }
}
abnavtextlabel_proto.initSkin = abnavtextlabel_initSkin;

var ABNavTextLabel = Class.create ('ABNavTextLabel', abnavtextlabel_proto);
Class.extend ('ABNavTextLabel', 'ABView');
/**
 Copyright (C) 2009-2011. ViniSketch SARL - David Thevenin

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
*/

var abnavimageview_proto = new Object ();

/**
 * A ABNavImageView.
 * @constructor
 * @extends ABView
 */
function abnavimageview_constructor (config)
{
  this.apply ('ABView', '_constructor', config);
  
  // init default image src with the attribute node img.src
  // if it exists. Use getAttribute instead of direct property
  // in order to have a relative path (without base)
  if (this._default_view)
  { this._default_src = this._default_view.data; }
  if (this._active_view)
  { this._active_src = this._active_view.data; }
  if (this._focus_view)
  { this._focus_src = this._focus_view.data; }
}
abnavimageview_proto._constructor = abnavimageview_constructor;

/**
 * The image url
 * @private
 * @type {string}
 */
abnavimageview_proto._default_src = '';
abnavimageview_proto._focus_src = '';
abnavimageview_proto._active_src = '';

/*****************************************************************
 *
 ****************************************************************/

/**
 * Set the text value
 * @param {string} v
 */
function abnavimageview_set_src (v)
{
  if (!Object.isString (v)) { return; }
  this._default_src = v;
  
  if (this._default_view)
  {
    this._default_view.data = this._default_src;
  }
}
abnavimageview_proto.setSrc = abnavimageview_set_src;

/**
 * get the text value
 * @type {string}
 */
function abnavimageview_get_src ()
{
  return this._default_src;
}
abnavimageview_proto.getSrc = abnavimageview_get_src;

/**
 * The text when the widget has the focus
 * @param {string} v
 */
function abnavimageview_set_focus_src (v)
{
  if (!Object.isString (v)) { return; }
  this._focus_src = v;
  
  if (this._focus_view)
  {
    this._focus_view.data = this._focus_src;
  }
}
abnavimageview_proto.setFocusSrc = abnavimageview_set_focus_src;

/**
 * get the text value
 * @type {string}
 */
function abnavimageview_get_focus_src ()
{
  return this._focus_src;
}
abnavimageview_proto.getFocusSrc = abnavimageview_get_focus_src;

/**
 * The text when the widget is active
 * @param {string} v
 */
function abnavimageview_set_active_src (v)
{
  if (!Object.isString (v)) { return; }
  this._active_src = v;
  
  if (this._active_view)
  {
    this._active_view.data = this._active_src;
  }
}
abnavimageview_proto.setActiveSrc = abnavimageview_set_active_src;

/**
 * get the text value
 * @type {string}
 */
function abnavimageview_get_active_src ()
{
  return this._active_src;
}
abnavimageview_proto.getActiveSrc = abnavimageview_get_active_src;

/**
 * Set the image size
 * @name ABNavImageView#size 
 *
 * @type {Array.<number>}
 */
function abnavimageview_set_size (v)
{
  if (!Object.isArray (v) && v.length != 2)
  {
    if (!Object.isNumber (v[0]) || !Object.isNumber(v[1])) { return; }
  }
/* 
  if (this.view)
  {
    this.view.setAttribute ('width', v [0]);
    this.view.setAttribute ('height', v [1]);
  }
 */

  this._size [0] = v [0];
  this._size [1] = v [1];
//  this._updateSize ();
}
abnavimageview_proto.setSize = abnavimageview_set_size;

/**
 *
 * @return {Array.<number>}
 */
function abnavimageview_get_size ()
{
  if (this.view && this.view.parentNode)
  {
    this._size [0] = this.view.offsetWidth;
    this._size [1] = this.view.offsetHeight;
  }
  return this._size.slice ();
}
abnavimageview_proto.getSize = abnavimageview_get_size;

/*****************************************************************
 *
 ****************************************************************/  
function abnavimageview__onFocus ()
{
  __setVisible (this._default_view, false);
  __setVisible (this._focus_view, true);
  __setVisible (this._active_view, false);
  
  this.apply ('ABView', '_onFocus');
}
abnavimageview_proto._onFocus = abnavimageview__onFocus;

function abnavimageview__onBlur ()
{
  __setVisible (this._default_view, true);
  __setVisible (this._focus_view, false);
  __setVisible (this._active_view, false);
  
  this.apply ('ABView', '_onBlur');
}
abnavimageview_proto._onBlur = abnavimageview__onBlur;

function abnavimageview__onBeforeActive ()
{
  __setVisible (this._default_view, false);
  __setVisible (this._focus_view, false);
  __setVisible (this._active_view, true);
  
  this.apply ('ABView', '_onBeforeActive');
}
abnavimageview_proto._onBeforeActive = abnavimageview__onBeforeActive;

function abnavimageview__onActive ()
{
  __setVisible (this._default_view, false);
  __setVisible (this._focus_view, true);
  __setVisible (this._active_view, false);
  
  this.apply ('ABView', '_onActive');
}
abnavimageview_proto._onActive = abnavimageview__onActive;

/*****************************************************************
 *
 ****************************************************************/  
/**
 * @protected
 */
function abnavimageview_destructor ()
{
  if (this.view)
  {
    // force image free
    this._default_view.data = 
      'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
    this._focus_view.data = 
      'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
    this._active_view.data = 
      'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
    delete (this._default_view);
    delete (this._focus_view);
    delete (this._active_view);
  }

  this.apply ('ABView', 'destructor');
}
abnavimageview_proto.destructor = abnavimageview_destructor;

/**
 *
 * @protected
 */
function abnavimageview_initSkin ()
{
  this.apply ('ABView', 'initSkin');

  if (this.view)
  {
    var child = this.view.firstChild;
    while (child && __getTagName (child) != 'object' && 
          __getTagName (child) != 'OBJECT')
    { child = child.nextSibling; }
    
    if (!child)
    {
      printlnConsole ("ERROR ABNavImageView.initSkin 1");
      return;
    }
    this._default_view = child;

    child = child.nextSibling;
    while (child && __getTagName (child) != 'object' && 
          __getTagName (child) != 'OBJECT')
    { child = child.nextSibling; }
    
    if (!child)
    {
      printlnConsole ("ERROR ABNavImageView.initSkin 2");
      return;
    }
    this._focus_view = child;

    child = child.nextSibling;
    while (child && __getTagName (child) != 'object' && 
          __getTagName (child) != 'OBJECT')
    { child = child.nextSibling; }
    
    if (!child)
    {
      printlnConsole ("ERROR ABNavImageView.initSkin 3");
      return;
    }
    this._active_view = child;
  }
}
abnavimageview_proto.initSkin = abnavimageview_initSkin;

var ABNavImageView = Class.create ('ABNavImageView', abnavimageview_proto);
Class.extend ('ABNavImageView', 'ABView');
/**
 Copyright (C) 2009-2011. ViniSketch SARL - David Thevenin

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
*/

var abimageview_proto = new Object ();

/**
 * A ABImageView.
 * @constructor
 * @extends ABView
 */
function abimageview_constructor (config)
{
  this.apply ('ABView', '_constructor', config);
  
  // init default image src with the attribute node img.src
  // if it exists. Use getAttribute instead of direct property
  // in order to have a relative path (without base)
  if (this.view && this.view.data)
  {
    this._src = this.view.data;
  }
}
abimageview_proto._constructor = abimageview_constructor;

/**
 * The image url
 * @private
 * @type {string}
 */
abimageview_proto._src = null;

/*****************************************************************
 *
 ****************************************************************/

/**
 * Set the image url
 * @name ABImageView#src 
 * @type {string}
 */
function abimageview_set_src (v)
{
  if (!Object.isString (v)) { return; }
  
  this._src = v;
  
  if (this.view)
  {
    this.view.data = this._src;
  }
}
abimageview_proto.setSize = abimageview_set_src;

/**
 * Get the image url
 * @return {string}
 */
function abimageview_get_src ()
{
  return this._src;
}
abimageview_proto.getSrc = abimageview_get_src;

/**
 * Set the image size
 * @name ABImageView#size 
 *
 * @type {Array.<number>}
 */
function abimageview_set_size (v)
{
  if (!Object.isArray (v) && v.length != 2)
  {
    if (!Object.isNumber (v[0]) || !Object.isNumber(v[1])) { return; }
  }
/* 
  if (this.view)
  {
    this.view.setAttribute ('width', v [0]);
    this.view.setAttribute ('height', v [1]);
  }
 */

  this._size [0] = v [0];
  this._size [1] = v [1];
//  this._updateSize ();
}
abimageview_proto.setSize = abimageview_set_size;

/**
 *
 * @return {Array.<number>}
 */
function abimageview_get_size ()
{
  if (this.view && this.view.parentNode)
  {
    this._size [0] = this.view.offsetWidth;
    this._size [1] = this.view.offsetHeight;
  }
  return this._size.slice ();
}
abimageview_proto.getSize = abimageview_get_size;

/*****************************************************************
 *
 ****************************************************************/  
/**
 * @protected
 */
function abimageview_destructor ()
{
  if (this.view)
  {
    // force image free
    this.view.data = 
      'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
  }

  this.apply ('ABView', 'destructor');
}
abimageview_proto.destructor = abimageview_destructor;

/**
 *
 * @protected
 */
function abimageview_initSkin ()
{
  this.apply ('ABView', 'initSkin');

  if (!this.view) { return; }
  this.view.data = this._src;
/* 
  this.view.setAttribute ('width', "100%");
  this.view.setAttribute ('height', "100%");

 */
}
abimageview_proto.initSkin = abimageview_initSkin;

var ABImageView = Class.create ('ABImageView', abimageview_proto);
Class.extend ('ABImageView', 'ABView');
/**
 Copyright (C) 2009-2011. ViniSketch SARL - David Thevenin

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
*/

var application_proto = new Object ();

/**
 *  All application inherit from Application class.<br/>
 *  This is the root component from which all other components (widgets, ...)
 *  are dependent on.
 *  @class
 *  All application inherit from Application class. <br/>
 *  This is the root component from which all other components (widgets, ...)
 *  are dependent on.
 *  <p>
 *  The class offers you a set of usefull method for laoding
 *  Javascript or CSS, know the current GUI orientation...
 *  <p>
 *  You should not create your own Application instante, because it is
 *  automatically generated by ViniSketch Designer.
 *
 *  @author David Thevenin
 *
 *  @constructor
 *  Main constructor
 *
 *	@param {string} type the event type [optional]
*/
function application_constructor (config)
{
  this.apply ('ABView', '_constructor', config);
  
  Application_applications [this.id] = this;
};
application_proto._constructor = application_constructor;

/**
 * @private
 */
var Application_applications = new Object ();

/*****************************************************************
 *
 ****************************************************************/
 
 /**
 * @private
 */
function application_keyboardListener (event)
{
  if (!Application._current_focus_comp)
  { return; }

  var comp = Application._current_focus_comp;
    
  if (!comp)
  { return; }
  
  if (!NAVIGATION_GRAPH) { return; }
  
  browser.lockScreen ();

  var navData = NAVIGATION_GRAPH [comp.id];
  if (navData)
  {
    var id = navData [event.type];
    if (ABObject._obs [id])
    {
      ABObject._obs [id]._onFocus ();
      comp._onBlur ();
    }
  }
 
  if (event.type == KEYBOARD.UP_ARROW) {
    comp._onUp ();
  }

  else if (event.type == KEYBOARD.DOWN_ARROW) {
    comp._onDown ();
  }

  else if (event.type == KEYBOARD.LEFT_ARROW) {
    comp._onLeft ();
  }

  else if (event.type == KEYBOARD.RIGHT_ARROW) {
    comp._onRight ();
  }
 
  else if (event.type == KEYBOARD.ENTER) {
    comp._onBeforeActive ();
  }
 
  else if (event.type == KEYBOARD.ENTER + KEYBOARD.KEY_UP) {
    comp._onActive ();
  }

  browser.unlockScreen ();
}
application_proto.keyboardListener = application_keyboardListener;

/**
* @protected
*/
function application_initSkin ()
{
  this.apply ('ABView', 'initSkin');

  this.body = this.view;
      
  KEYBOARD.bind (KEYBOARD.UP_ARROW, this, 'keyboardListener');
  KEYBOARD.bind (KEYBOARD.DOWN_ARROW, this, 'keyboardListener');
  KEYBOARD.bind (KEYBOARD.LEFT_ARROW, this, 'keyboardListener');
  KEYBOARD.bind (KEYBOARD.RIGHT_ARROW, this, 'keyboardListener');
  KEYBOARD.bind (KEYBOARD.KEY_UP + KEYBOARD.ENTER, this,
    'keyboardListener');
  KEYBOARD.bind (KEYBOARD.ENTER, this, 'keyboardListener');
}
application_proto.initSkin = application_initSkin;

function application_exit ()
{
  if (close)
  {
    close ();
  }
}
application_proto.exit = application_exit;

var Application = Class.create ('Application', application_proto);
Class.extend ('Application', 'ABView');

// because focus is call before the keyboard event,
// we manage a double focus comp system : the current and the new
// If a new is set it means focus just change and we have to send
// keyboard event to the previous one (current) and change the current
// comp with the new one
// If new is null is means we receive a keyboard event without focus change
// then we just have to sen event to current comp.
Application._current_focus_comp = null;

/**
 * @private
 */
function application_sendStart ()
{
  var key, obj;
  for (key in Application_applications)
  {
    obj = Application_applications [key];
    obj.propagate ('start');
//    if (obj.propagate) { obj.propagate ('start'); }
  }
}
Application.sendStart = application_sendStart;