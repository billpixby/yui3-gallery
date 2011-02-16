YUI.add("gallery-accordion-horiz-vert",function(b){var f=(0<b.UA.ie&&b.UA.ie<8),h=!(0<b.UA.ie&&b.UA.ie<8),j=(f?1:0);function g(k){if(arguments.length===0){return;}k=k||{};if(b.Lang.isUndefined(k.tabIndex)){k.tabIndex=null;}if(b.Lang.isUndefined(k.horizontal)){k.horizontal=false;}g.superclass.constructor.call(this,k);}function d(){return !b.Lang.isUndefined(b.Anim);}function e(k){return(k&&h&&!b.Lang.isUndefined(b.Anim));}g.NAME="accordion";g.ATTRS={horizontal:{value:false,writeOnce:true},titles:{writeOnce:true},replaceTitleContainer:{value:true,validator:b.Lang.isBoolean},sections:{writeOnce:true},replaceSectionContainer:{value:true,validator:b.Lang.isBoolean},allowAllClosed:{value:false,validator:b.Lang.isBoolean,setter:function(k){this.allow_all_closed=k;return k;}},allowMultipleOpen:{value:false,validator:b.Lang.isBoolean},animateRender:{value:false,writeOnce:true,validator:b.Lang.isBoolean,setter:e},animateInsertRemove:{valueFn:d,validator:b.Lang.isBoolean,setter:e},animateOpenClose:{valueFn:d,validator:b.Lang.isBoolean,setter:e},animateDuration:{value:null,validator:function(k){return(k===null||b.Lang.isNumber(k));}},animateEasing:{value:null,validator:function(k){return(k===null||b.Lang.isFunction(k));}}};g.HTML_PARSER={titles:function(k){return k.all("li div:nth-child(1)");},sections:function(k){return k.all("li div:nth-child(2)");}};var a=b.ClassNameManager.getClassName(g.NAME,"open");var c=b.ClassNameManager.getClassName(g.NAME,"closed");function i(k){b.Event.purgeElement(k,true);while(k.hasChildNodes()){k.removeChild(k.lastChild);}}b.extend(g,b.Widget,{initializer:function(k){this.section_list=[];this.get("allowAllClosed");if(this.get("horizontal")){this.slide_style_name="width";this.slide_size_name="offsetWidth";this.fixed_style_name="height";this.fixed_size_name="offsetHeight";}else{this.slide_style_name="height";this.slide_size_name="offsetHeight";this.fixed_style_name="width";this.fixed_size_name="offsetWidth";}this.after("allowMultipleOpenChange",function(l){if(this.section_list&&this.section_list.length>0&&!l.newVal){this.closeAllSections();}});this.after("allowAllClosedChange",function(l){if(this.section_list&&this.section_list.length>0&&!l.newVal&&this.allSectionsClosed()){this.toggleSection(0);}});},renderUI:function(){this.get("boundingBox").addClass(this.getClassName(this.get("horizontal")?"horiz":"vert"));var n=this.get("titles");if(b.Lang.isString(n)){n=b.all(n);}var o=this.get("sections");if(b.Lang.isString(o)){o=b.all(o);}if(n instanceof b.NodeList&&o instanceof b.NodeList&&n.size()==o.size()){var l=this.get("animateInsertRemove");this.set("animateInsertRemove",this.get("animateRender"));var m=n.size();for(var k=0;k<m;k++){this.appendSection(n.item(k),o.item(k));}this.set("animateInsertRemove",l);}else{if(n instanceof Array&&o instanceof Array&&n.length==o.length){var l=this.get("animateInsertRemove");this.set("animateInsertRemove",this.get("animateRender"));var m=n.length;for(var k=0;k<m;k++){this.appendSection(n[k],o[k]);}this.set("animateInsertRemove",l);}else{}}},getSectionCount:function(){return this.section_list.length;},getTitle:function(k){return this.section_list[k].title;},setTitle:function(k,o){var l=this.section_list[k].title;i(l);var m;if(b.Lang.isString(o)){var m=b.one(o);if(!m){l.set("innerHTML",o);}}else{m=o;}if(m&&this.get("replaceTitleContainer")){var n=l.get("parentNode");n.removeChild(l);n.appendChild(m);this.section_list[k].title=m;m.addClass(this.getClassName("title"));m.addClass(this.section_list[k].open?a:c);}else{if(m){l.appendChild(m);}}if(f){l.setStyle("display",l.get("innerHTML")?"":"none");}},getSection:function(k){return this.section_list[k].content;},setSection:function(k,m){var q=this.section_list[k].content;i(q);var l;if(b.Lang.isString(m)){var l=b.one(m);if(!l){q.set("innerHTML",m);}}else{l=m;}if(l&&this.get("replaceSectionContainer")){var o=q.getStyle("display");var n=q.get("parentNode");n.removeChild(q);n.appendChild(l);this.section_list[k].content=l;l.addClass(this.getClassName("section"));l.addClass(this.section_list[k].open?a:c);l.setStyle("display",o);}else{if(l){q.appendChild(l);}}},_getClip:function(k){return this.section_list[k].clip;},prependSection:function(l,k){return this.insertSection(0,l,k);},appendSection:function(l,k){return this.insertSection(this.section_list.length,l,k);},insertSection:function(m,q,n){this.fire("beforeInsert",m);var r=b.Node.create("<div/>");r.addClass(this.getClassName("title"));r.addClass(c);var p=b.Node.create("<div/>");p.addClass(this.getClassName("section-clip"));p.setStyle(this.slide_style_name,j+"px");if(this.get("animateOpenClose")){p.setStyle("opacity",0);}var o=b.Node.create("<div/>");o.addClass(this.getClassName("section"));o.addClass(c);o.setStyle("display","none");p.appendChild(o);this.section_list.splice(m,0,{title:r,clip:p,content:o,open:false,anim:null});if(m<this.section_list.length-1){this.get("contentBox").insertBefore(r,this.section_list[m+1].title);}else{this.get("contentBox").appendChild(r);}this.setTitle(m,q);r=this.section_list[m].title;var s=r.get(this.slide_size_name);if(this.get("animateInsertRemove")){r.setStyle(this.slide_style_name,j+"px");var l={node:r,from:{opacity:0},to:{opacity:1}};l.to[this.slide_style_name]=s;var k=this._createAnimator(l);k.on("end",function(u,t){this.section_list[t].title.setStyle(this.slide_style_name,"auto");},this,m);k.run();}if(n){this.setSection(m,n);o=this.section_list[m].content;}if(m<this.section_list.length-1){this.get("contentBox").insertBefore(p,this.section_list[m+1].title);}else{this.get("contentBox").appendChild(p);}this.fire("insert",m,s);if(!this.allow_all_closed&&this.allSectionsClosed()){this.toggleSection(0);}return{title:r,content:o};},removeSection:function(m){this.fire("beforeRemove",m);function k(q,p){p[0].removeChild(p[1]);p[0].removeChild(p[2]);}var l=[this.get("contentBox"),this.section_list[m].title,this.section_list[m].clip];if(this.get("animateInsertRemove")){var o={node:this.section_list[m].clip,from:{opacity:1},to:{opacity:0}};
o.to[this.slide_style_name]=j;if(this.section_list[m].open){this._startAnimator(m,o);}o.node=this.section_list[m].title;var n=this._createAnimator(o);n.on("end",k,null,l);n.run();}else{k(null,l);}this.section_list.splice(m,1);if(!this.allow_all_closed&&this.allSectionsClosed()){this.toggleSection(0);}this.fire("remove",m);},findSection:function(l){l=b.Node.getDOMNode(b.one(l));var n=this.section_list.length;for(var k=0;k<n;k++){var o=b.Node.getDOMNode(this.section_list[k].title);var m=b.Node.getDOMNode(this.section_list[k].content);if(l==o||b.DOM.contains(o,l)||l==m||b.DOM.contains(m,l)){return k;}}return false;},isSectionOpen:function(k){return this.section_list[k].open;},openSection:function(k){if(!this.section_list[k].open){this.toggleSection(k);}},closeSection:function(k){if(this.section_list[k].open){this.toggleSection(k);}},allSectionsOpen:function(){var l=this.section_list.length;for(var k=0;k<l;k++){if(!this.section_list[k].open){return false;}}return true;},allSectionsClosed:function(){var l=this.section_list.length;for(var k=0;k<l;k++){if(this.section_list[k].open){return false;}}return true;},toggleSection:function(k){if(!this.section_list[k].open&&!this.get("allowMultipleOpen")){var n=this.allow_all_closed;this.allow_all_closed=true;this.closeAllSections();this.allow_all_closed=n;}else{if(this.section_list[k].open&&!this.allow_all_closed){this.section_list[k].open=false;if(this.allSectionsClosed()){this.section_list[k].open=true;return;}this.section_list[k].open=true;}}function p(t,s){this.section_list[s].clip.setStyle(this.slide_style_name,"auto");this.fire("open",s);}function r(t,s){this.section_list[s].content.setStyle("display","none");this.fire("close",s);}if(!this.section_list[k].open){this.section_list[k].content.setStyle("display","block");this.fire("beforeOpen",k);this.section_list[k].open=true;this.section_list[k].title.replaceClass(c,a);this.section_list[k].content.replaceClass(c,a);var l=this.section_list[k].content.get(this.slide_size_name);if(this.get("animateOpenClose")){var q={node:this.section_list[k].clip,from:{opacity:0},to:{opacity:1}};q.to[this.slide_style_name]=l;var o=this._startAnimator(k,q);o.on("end",p,this,k);}else{var m=this.section_list[k].clip;if(m.getStyle("opacity")=="0"){m.setStyle("opacity",1);}p.call(this,null,k);}}else{this.fire("beforeClose",k);this.section_list[k].open=false;this.section_list[k].title.replaceClass(a,c);this.section_list[k].content.replaceClass(a,c);if(this.get("animateOpenClose")){var q={node:this.section_list[k].clip,from:{opacity:1},to:{opacity:0}};q.to[this.slide_style_name]=j;var o=this._startAnimator(k,q);o.on("end",r,this,k);}else{this.section_list[k].clip.setStyle(this.slide_style_name,j+"px");r.call(this,null,k);}}},openAllSections:function(){if(this.get("allowMultipleOpen")){var l=this.section_list.length;for(var k=0;k<l;k++){if(!this.section_list[k].open){this.toggleSection(k);}}}},closeAllSections:function(){var l=this.section_list.length;var m=true;for(var k=0;k<l;k++){if(this.section_list[k].open){if(!this.allow_all_closed&&m){m=false;}else{this.toggleSection(k);}}}if(!this.allow_all_closed&&m){this.toggleSection(0);}},_createAnimator:function(l){var k=this.get("animateDuration");if(k!==null){l.duration=k;}var m=this.get("animateEasing");if(m!==null){l.easing=m;}return new b.Anim(l);},_startAnimator:function(k,m){var l=this.section_list[k].anim;if(l){l.stop(true);}this.section_list[k].anim=l=this._createAnimator(m);l.on("end",function(o,n,p){if(n<this.section_list.length&&this.section_list[n].anim==p){this.section_list[n].anim=null;}},this,k,l);l.run();return l;}});b.Accordion=g;},"gallery-2011.02.16-20-31",{requires:["widget","selector-css3"],optional:["anim-base"],skinnable:true});