function    zebra_tables(id,start,click) {
    var table=null,t=null;
    if(!start) start=0;
    if( (table = self.document.getElementById(id)) ) {
        var rows = table.getElementsByTagName('TR')
        for(var i=start ; i < rows.length ; i++) {
            rows[i].className=((i%2)?' rowOdd ':' rowEven ')+rows[i].className;
            rows[i].onmouseover= function(){ this.className = ' rowRuled '+this.className; return false; }
            rows[i].onmouseout = function(){ this.className=this.className.replace(/\s*rowRuled\s*/,' '); return false; }
            //if(click) rows[i].onclick    = function(evt){  if(!evt) evt=event;
            //    if( evt.target && (evt.target.tagName!='TD'&&evt.target.tagName!='TR') ) return true;
            //    if(this.className.indexOf('rowSelected')>-1)
            //    this.className = this.className.replace(/\s*rowSelected\s*/,' ');
            //    else this.className = ' rowSelected '+this.className;
            //    return true;}
        }
        /*
        t = document.getElementsByClassName('xfButtonView');
        for(var i=0 ; i < t.length ; i++) {
            t[i].parentNode.style.display='none';
            t[i].parentNode._xf_link=t[i].href;
            t[i].parentNode.onclick    = function(evt){  if(!evt) evt=event;
                if( evt.target && (evt.target.tagName!='TD'&&evt.target.tagName!='TR') ) return true;
                window.location=evt.target._xf_link;
                return true;
            }
        }
        t = document.getElementsByClassName('xfButtonUpdate');
        for(var i=0 ; i < t.length ; i++) {
            t[i].parentNode.style.display='none';
            t[i].parentNode.parentNode._xf_link=t[i].href;
            Event.observe(t[i].parentNode.parentNode, 'click', function(evt) {
                window.location=this._xf_link;
                return true;
            });
        }
        if( t=rows[0].getElementsByTagName('TH') )
            t[0].style.display='none';
        */
    }
    if(document.forms['xF_FilterForm'] && document.forms['xF_FilterForm'].elements[0] )
        try{ document.forms['xF_FilterForm'].elements[0].focus(); }catch(e) {}

/*
    if(window.cssQuery) {
        var tags = cssQuery("*[title]");
        for(var i=0 ; i < tags.length ; i++ ) {
            tags[i].onmouseover = function() { window.status=this.title; }
        }
    }

    if(window.cssQuery && window.makeNiceTitles) {
        var tags = cssQuery("[title]");
        for(var i=0 ; i < tags.length ; i++) {
            tags[i].setAttribute("nicetitle", tags[i].title);
            //tags[i].setAttribute("title", " ");
            addEvent(tags[i], "mouseover", showNiceTitle);
            addEvent(tags[i], "mouseout", hideNiceTitle);
            addEvent(tags[i], "focus", showNiceTitle);
            addEvent(tags[i], "blur", hideNiceTitle);
        }
    }
*/
    xfABM_InitListAndForm();

    return false;
}

function    tabSheet(tabs,sheets, first_tab) {
    if(!sheets) {
        with(tabs.tabSheet_base) {
            tabSheet_cur.tabSheet_sheet.style.display='none';
            tabSheet_cur.className=tabSheet_cur.className.replace(/ *selected */gi,'');
            tabSheet_cur.blur();
            tabSheet_cur=tabs;
            tabSheet_cur.tabSheet_sheet.style.display='block';
            tabSheet_cur.className=tabSheet_cur.className+' selected';
            if( t=tabSheet_cur.tabSheet_sheet.getAttribute('ontabdisplay') ) {
                eval(t);
            }
        }
        return false;
    }
    if(!first_tab) first_tab=0;
    var counter=0, base=null;
    if(base=tabs=document.getElementById(tabs)) {
        if(tabs=tabs.getElementsByTagName('LI')) {
            if(sheets=document.getElementById(sheets)) {
                if(sheets=sheets.getElementsByTagName('DIV')) {
                    for(var i=0 ; i < sheets.length ; i++) {
                        if(sheets[i].className.substr(0,8)=='tabSheet' && tabs[counter]) {
                            tabs[counter].tabSheet_base = base;
                            tabs[counter].tabSheet_sheet = sheets[i];
                            tabs[counter].onclick = new Function('tabSheet(this)');
                            tabs[counter].tabSheet_sheet.style.display='none';
                            counter++;
                        }
                    }
                    base.tabSheet_cur = tabs[first_tab];
                    if(base.tabSheet_cur.tabSheet_sheet)
                        base.tabSheet_cur.tabSheet_sheet.style.display='block';
                    base.tabSheet_cur.className=base.tabSheet_cur.className+' selected';
                }
            }
        }
    }
}

window.formElementModified = false;
function    xforms_form_init() {
    var t=null;
    Event.observe( window, 'load', function() {
        t = self.document.getElementById('XFABMForm');
		if( !t )
			t = self.document.getElementById('xF_MainForm');
		if( t ) {
            //var first=true;
            var availabletypes = ' text textarea password radio checkbox file ';
            for(var i=0 ; i < t.elements.length ; i++) {
                /*
				if(t.elements[i]&&t.elements[i].type && (availabletypes.indexOf(' '+t.elements[i].type+' ')>=0) && t.elements[i].disabled!=true ) {
                    t.elements[i].onfocus = function() { if(this.select) this.select(); this.className = this.className.replace(/focused/,'')+' focused'; }
                    t.elements[i].onblur = function() { this.className = this.className.replace(/focused/,''); }

					if(first) {
                        try{ t.elements[i].focus(); }catch(e) {}
                        first=false;
                    }

                }
				*/
                if( window.DoNotCheckForModifiedFields=='undefined' ) {
					Event.observe( t.elements[i], 'change', function() {
	                    //this.style.backgroundColor='lightgreen';
						window.formElementModified = true;
	                });
				}
            }
        }
        }, false);
	// Notice: The simple theme does not use all options some of them are limited to the advanced theme
    try{
        tinyMCE.init({
            mode : "textareas",
            plugins : "advhr,advimage,advlink,iespell,contextmenu,paste,fullscreen,table",
            theme : "advanced",
            theme_advanced_styles : "Header 1=header1;Header 2=header2;Header 3=header3;Table Row=tableRow1",
            paste_auto_cleanup_on_paste : true,
            paste_convert_headers_to_strong : false,
            paste_strip_class_attributes : "all",
            paste_remove_spans : false,
            paste_remove_styles : false,
            theme_advanced_toolbar_location : "top",
            theme_advanced_toolbar_align : "left",
            theme_advanced_statusbar_location : "bottom",
            auto_reset_designmode: true,
            editor_selector : "mceEditor",
            relative_urls : false
        });
    }catch(e) { }
    xfABM_InitListAndForm();
}

function    xfABM_InitListAndForm() {
    return;

    Event.observe(window, 'load', function() {
        Gui.init();

        var links = cssQuery("a[class~='xfButtonOpenDialog']");
        for(i=0 ; i < links.length ; i++) {
            links[i].onclick=function() {
                top.Gui.dialogUrl('', this.href+'&NFR=1', '', window);
                Event.stop(this);
                if(window.event) window.event.returnValue=false;
                return false; };
        }
        var links = cssQuery("input[class~='xfButtonOpenDialog']");
        for(i=0 ; i < links.length ; i++) {
            if(links[i].getAttribute)
                var url =links[i].getAttribute('onclick').replace(/.*self.location=\'(.+)\'.*/,'$1');
            else
                var url =links[i].onclick.replace(/.*self.location=\'(.+)\'.*/,'$1');
            links[i].onclick=function() {
                top.Gui.dialogUrl('', url+'&NFR=1', '', window);
                Event.stop(this);
                if(window.event) window.event.returnValue=false;
                return false; };
        }
        var links = cssQuery("input[name='xF_CancelButton']");
        for(i=0 ; i < links.length ; i++) {
            links[i]._prev_onclick = links[i].onclick
            links[i].onclick=function() {
                if(!top.Gui||!top.Gui.closeLast()) { if(this._prev_onclick) this._prev_onclick(); return true; }
                Event.stop(this);
                if(window.event) window.event.returnValue=false;
                return false; };
        }
    }, false);
}

function    xfABM_ShowHideElt(elt) {
    if(typeof(elt)=='string') elt=document.getElementById(elt);
    if(elt && elt.style ) { elt.style.display=(elt.style.display=='none'?'block':'none'); }
    return false;
}

function xfABM_iFrameHeight(e) {
    var h = 0;
    if ( !document.all ) {
        if( h = document.getElementById(e).contentDocument.height )
            document.getElementById(e).style.height = h + 160 + 'px';
    } else if( document.all ) {
        if( h = document.frames(e).document.body.scrollHeight )
            document.all[e].style.height = h + 120 + 'px';
    }
    if(!window.xfABM_iFrameHeight_counter)window.xfABM_iFrameHeight_counter=0;
    if(h<=1 && window.xfABM_iFrameHeight_counter<2) {
        window.xfABM_iFrameHeight_counter++;
        window.setTimeout('xfABM_iFrameHeight(\''+e+'\')',100);
    }
}
function qForms_addEvent(obj, evType, fn){
 if (obj.addEventListener){
   obj.addEventListener(evType, fn, false);
   return true;
 } else if (obj.attachEvent){
   var r = obj.attachEvent("on"+evType, fn);
   return r;
 } else {
   return false;
 }
}
/**
 * Ejemplos de como usar la funcion addEvent
 *
 * qForms_addEvent(window, 'load', foo);
 * qForms_addEvent(window, 'load', bar);
 *
 */
//qForms_addEvent( window, 'load', xforms_form_init);