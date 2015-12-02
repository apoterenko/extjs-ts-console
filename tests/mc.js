var ManagementConsole=ManagementConsole||{};if(!ManagementConsole.controller){ManagementConsole.controller={}}if(!ManagementConsole.data){ManagementConsole.data={}}if(!ManagementConsole.data.proxy){ManagementConsole.data.proxy={}}if(!ManagementConsole.data.store){ManagementConsole.data.store={}}if(!ManagementConsole.logic){ManagementConsole.logic={}}if(!ManagementConsole.logic.entity){ManagementConsole.logic.entity={}}if(!ManagementConsole.logic.group){ManagementConsole.logic.group={}}if(!ManagementConsole.model){ManagementConsole.model={}}if(!ManagementConsole.overrides){ManagementConsole.overrides={}}if(!ManagementConsole.store){ManagementConsole.store={}}if(!ManagementConsole.view){ManagementConsole.view={}}if(!ManagementConsole.view.main){ManagementConsole.view.main={}}(function(e){var b,k=["constructor","toString","valueOf","toLocaleString"],f={},o={},d=0,l,i,q,g,a,m,c,h,p=function(){var t,s;i=Ext.Base;q=Ext.ClassManager;for(t=k.length;t-->0;){s=(1<<t);o[f[s]=k[t]]=s}for(t in o){d|=o[t]}d=~d;Function.prototype.$isFunction=1;h=!!(q&&q.addAlias);g=Ext.Class.getPreprocessor("config").fn;a=Ext.Class.getPreprocessor("cachedConfig")&&Ext.Class.getPreprocessor("cachedConfig").fn;c=Ext.Class.getPreprocessor("privates")&&Ext.Class.getPreprocessor("privates").fn;m=Ext.ClassManager.postprocessors.deprecated&&Ext.ClassManager.postprocessors.deprecated.fn;b=i.$staticMembers;if(!b){b=[];for(l in i){if(i.hasOwnProperty(l)){b.push(l)}}}e.derive=j;return j.apply(this,arguments)},r=function(A,w,z){var t=z.enumerableMembers,x=A.prototype,v,y,u,s;if(!w){return}if(h){A.addMembers(w)}else{for(v in w){s=w[v];if(s&&s.$isFunction&&!s.$isClass&&s!==Ext.emptyFn&&s!==Ext.identityFn){if(v in x){s.$previous=x[v]}x[v]=y=s;y.$owner=A;y.$name=v}else{x[v]=s}}for(u=1;t;u<<=1){if(t&u){t&=~u;v=f[u];x[v]=y=w[v];y.$owner=A;y.$name=v}}}},n=function(w){var s=function v(){return w.apply(this,arguments)||null},u,t;s.prototype=Ext.Object.chain(w.prototype);for(u=b.length;u-->0;){t=b[u];s[t]=i[t]}return s},j=function(x,A,V,s,z,J,y,S,v,L,E){var t=function D(){return this.constructor.apply(this,arguments)||null},U=t,u={enumerableMembers:s&d,onCreated:E,onBeforeCreated:r,aliases:S},H=V.alternateClassName||[],Q=Ext.global,M,P,R,G,O,Y,X,w,N,C,T,K,F,W,I=q.alternateToName||q.maps.alternateToName,B=q.nameToAlternates||q.maps.nameToAlternates;for(R=b.length;R-->0;){X=b[R];t[X]=i[X]}if(V.$isFunction){V=V(t)}u.data=V;C=V.statics;delete V.statics;V.$className=x;if("$className" in V){t.$className=V.$className}t.extend(A);N=t.prototype;t.xtype=V.xtype=z[0];if(z){N.xtypes=z}N.xtypesChain=J;N.xtypesMap=y;V.alias=S;U.triggerExtended(t,V,u);if(V.onClassExtended){t.onExtended(V.onClassExtended,t);delete V.onClassExtended}if(V.privates&&c){c.call(Ext.Class,t,V)}if(C){if(h){t.addStatics(C)}else{for(T in C){if(C.hasOwnProperty(T)){W=C[T];if(W&&W.$isFunction&&!W.$isClass&&W!==Ext.emptyFn&&W!==Ext.identityFn){t[T]=F=W;F.$owner=t;F.$name=T}t[T]=W}}}}if(V.inheritableStatics){t.addInheritableStatics(V.inheritableStatics);delete V.inheritableStatics}if(N.onClassExtended){U.onExtended(N.onClassExtended,U);delete N.onClassExtended}if(V.config){g.call(Ext.Class,t,V)}if(V.cachedConfig&&a){a.call(Ext.Class,t,V)}if(V.deprecated&&m){m.call(Ext.ClassManager,x,t,V)}u.onBeforeCreated(t,u.data,u);for(R=0,O=v&&v.length;R<O;++R){t.mixin.apply(t,v[R])}for(R=0,O=S.length;R<O;R++){M=S[R];q.setAlias?q.setAlias(t,M):q.addAlias(t,M)}if(V.singleton){U=new t()}if(!(H instanceof Array)){H=[H]}K=q.getName(U);for(R=0,G=H.length;R<G;R++){P=H[R];q.classes[P]=U;if(h){q.addAlternate(t,P)}else{if(K){I[P]=K;H=B[K]||(B[K]=[]);H.push(P)}}}for(R=0,O=L.length;R<O;R+=2){Y=L[R];if(!Y){Y=Q}Y[L[R+1]]=U}q.classes[x]=U;if(!h){if(K&&K!==x){I[x]=K;H=B[K]||(B[K]=[]);H.push(x)}}delete N.alternateClassName;if(u.onCreated){u.onCreated.call(U,U)}if(x){q.triggerCreated(x)}return U};e.derive=p}(Ext.cmd={}));Ext.define("ManagementConsole.overrides.Ajax",{override:"Ext.data.request.Ajax",createResponse:function(e){var b=this,c=b.isXdr,d=c?"":e.getAllResponseHeaders(),a;a=arguments.callee.$previous.apply(this,arguments);if(!Ext.isEmpty(d)){this.overrideHeaderFunctions(a,d.replace(/\r\n/g,"\n").split("\n"))}return a},overrideHeaderFunctions:function(a,b){var c={};Ext.Array.each(b,function(d){d=d.replace(" ","").split(":");c[d[0]]=d[1]});Ext.apply(a,{getResponseHeader:function(d){return c[d]},getAllResponseHeaders:function(){return c}})}});Ext.define("ManagementConsole.overrides.Model",{override:"Ext.data.Model",mixins:[Ext.mixin.Observable],config:{newest:null},constructor:function(){this.mixins.observable.constructor.apply(this,arguments);arguments.callee.$previous.apply(this,arguments)},load:function(a){var b=this,c=function(){b.setNewest(false);b.fireEvent("load",b)};a=a||{};if(Ext.isFunction(a.callback)){a.callback=Ext.Function.createSequence(a.callback,c,a.scope||b)}else{a.callback=c}return arguments.callee.$previous.call(this,a)}});(Ext.cmd.derive("ManagementConsole.data.proxy.RestConfig",Ext.Base,{host:null,version:1,api:"api",contextPath:"/",getHost:function(){return this.host},setHost:function(a){this.host=a},getVersion:function(){return this.version},getApi:function(){return this.api},getContextPath:function(){return this.contextPath}},0,0,0,0,0,0,[ManagementConsole.data.proxy,"RestConfig"],0));(Ext.cmd.derive("ManagementConsole.data.proxy.RestProxy",Ext.data.proxy.Rest,{statics:{etagsCache:{},getEtag:function(b){var a=this.etagsCache[b];Ext.log({msg:"[REST_PROXY]: get etag"}," >> url: "+b+", etag: "+a);return a},setEtag:function(b,a){Ext.log({msg:"[REST_PROXY]: set etag"}," >> url: "+b+", etag: "+a);this.etagsCache[b]=a}},inject:["restConfig"],config:{restConfig:null,noCache:false},appendId:false,constructor:function(){Deft.Injector.inject(this.inject,this);this.withCredentials=this.cors!==false;Ext.data.proxy.Rest.prototype.constructor.apply(this,arguments)},buildUrl:function(c){var b,a=this.getRestConfig();b=c._originalUrl=this.buildOriginalUrl(Ext.data.proxy.Rest.prototype.buildUrl.apply(this,arguments),c.getParams());this.setIfNoneMatchHeader(b);return[this.cors!==false?a.getHost()+"/":a.getContextPath(),a.getApi(),"/",a.getVersion(),b].join("")},processResponse:function(f,b,e,a){var d,c;if(f){c=a.status===304;if(!c){d=a.getResponseHeader("ETag");if(!Ext.isEmpty(d)&&!Ext.isEmpty(e._originalUrl)){this.statics().setEtag(e._originalUrl,d)}}}return Ext.data.proxy.Rest.prototype.processResponse.apply(this,arguments)},buildOriginalUrl:function(a,b){return a.replace(/\{(.+)\}/,function(d,c){if(b&&b.hasOwnProperty(c)){return b[c]}return c})},setIfNoneMatchHeader:function(a){var b=this.statics().getEtag(a);if(!Ext.isEmpty(b)){this.headers=this.headers||{};this.headers["If-None-Match"]=b}}},1,0,0,0,["proxy.restproxy"],0,[ManagementConsole.data.proxy,"RestProxy"],0));(Ext.cmd.derive("ManagementConsole.model.Login",Ext.data.Model,{idProperty:"id",entityName:"login",fields:[{name:"id",type:"int",persist:false},{name:"login",type:"string",persist:false},{name:"password",type:"string"}],proxy:{type:"restproxy",noCache:true}},0,0,0,0,0,0,[ManagementConsole.model,"Login"],0));(Ext.cmd.derive("ManagementConsole.model.Account",Ext.data.Model,{entityName:"account",fields:[{name:"login",type:"string"},{name:"server_url",type:"string"}],proxy:{type:"restproxy",url:"/accounts",noCache:true,cors:false}},0,0,0,0,0,0,[ManagementConsole.model,"Account"],0));(Ext.cmd.derive("ManagementConsole.model.Profile",Ext.data.Model,{idProperty:"id",entityName:"profile",fields:[{name:"id",type:"int"},{name:"group",unique:true,reference:"ManagementConsole.model.Group"},{name:"login",type:"string"},{name:"lastname",type:"string"},{name:"language",type:"string"},{name:"email",type:"string"}],proxy:{type:"restproxy"}},0,0,0,0,0,0,[ManagementConsole.model,"Profile"],0));(Ext.cmd.derive("ManagementConsole.model.Brand",Ext.data.Model,{entityName:"brand",fields:[{name:"color",type:"string"},{name:"color_scheme",type:"string"}],proxy:{type:"restproxy",url:"/groups/{id}/brand"}},0,0,0,0,0,0,[ManagementConsole.model,"Brand"],0));(Ext.cmd.derive("ManagementConsole.model.Group",Ext.data.Model,{idProperty:"id",entityName:"groups",fields:[{name:"id",type:"int"},{name:"name",type:"string"},{name:"has_children",type:"bool"},{name:"children"}],proxy:{type:"restproxy",appendId:true}},0,0,0,0,0,0,[ManagementConsole.model,"Group"],0));(Ext.cmd.derive("ManagementConsole.model.Storage",Ext.data.Model,{idProperty:"id",entityName:"storage",fields:[{name:"id",type:"int"},{name:"name",type:"string"},{name:"space_usage",type:"string"}]},0,0,0,0,0,0,[ManagementConsole.model,"Storage"],0));(Ext.cmd.derive("ManagementConsole.data.store.Storage",Ext.data.Store,{model:"ManagementConsole.model.Storage",proxy:{type:"restproxy",url:"/groups/{id}/storages",reader:{type:"json",rootProperty:"items"}}},0,0,0,0,0,0,[ManagementConsole.data.store,"Storage"],0));(Ext.cmd.derive("ManagementConsole.logic.EntityManager",Ext.Base,{constructor:function(){this.cache={};this.callParent(arguments)},getInstance:function(b,f,c,e){var d=this.toKey(b,f),a=this.cache[d];if(!a){Ext.log({msg:"[ENTITY_MANAGER]: create instance"}," >> key: "+d);this.cache[d]=a=Ext.create(b,c);a.setNewest(true);Ext.callback(e)}else{Ext.log({msg:"[ENTITY_MANAGER]: get instance from cache"}," >> key: "+d)}return a},toKey:function(a,b){return(a+"-"+b).toLowerCase()}},1,0,0,0,0,0,[ManagementConsole.logic,"EntityManager"],0));(Ext.cmd.derive("ManagementConsole.logic.group.GroupDataManager",Ext.Base,{inject:["entityManager"],config:{entityManager:null},constructor:function(){Deft.Injector.inject(this.inject,this);this.tasks=[this.makeLoadGroupStoragesPromise,this.makeLoadGroupPromise,this.makeLoadGroupBrandPromise];this.callParent(arguments)},load:function(c,b,a){Ext.Deferred.parallel(this.tasks,{id:a.id,me:this}).then(function(){Ext.callback(c,b)})},makeLoadGroupBrandPromise:function(){var b=this.me,a=b.getEntityManager().getInstance("ManagementConsole.model.Brand",this.id,{id:this.id});return new Ext.Promise(function(c){a.getNewest()&&a.on("load",function(d){c(d)});a.load()})},makeLoadGroupPromise:function(){var a=Ext.create("ManagementConsole.model.Group",{id:this.id});return new Ext.Promise(function(b){a.load({success:function(c){b(c)}})})},makeLoadGroupStoragesPromise:function(){var b=this.id,a=Ext.create("ManagementConsole.data.store.Storage");return new Ext.Promise(function(c){a.on("load",function(d){c(d)});a.load({params:{id:b}})})}},1,0,0,0,0,0,[ManagementConsole.logic.group,"GroupDataManager"],0));(Ext.cmd.derive("ManagementConsole.logic.RouteManager",Ext.Base,{inject:["application"],config:{application:null},constructor:function(){Deft.Injector.inject(this.inject,this);this.callParent(arguments)},goErrorPage:function(a){this.redirectTo("error")},goGroupPage:function(){Ext.defer(function(){this.redirectTo("group")},1000,this)},redirectTo:function(a){this.getApplication().redirectTo(a)}},1,0,0,0,0,0,[ManagementConsole.logic,"RouteManager"],0));(Ext.cmd.derive("ManagementConsole.logic.entity.Exception",Ext.Base,{config:{status:null,name:null,description:null}},0,0,0,0,["exception"],0,[ManagementConsole.logic.entity,"Exception"],0));(Ext.cmd.derive("ManagementConsole.logic.ExceptionProcessor",Ext.Base,{inject:["routeManager"],config:{routeManager:null},constructor:function(){Deft.Injector.inject(this.inject,this);this.callParent(arguments)},process:function(a){var b,c={};if(a instanceof Ext.data.Operation){b=a.getError();Ext.apply(c,{status:b.status,name:b.statusText,description:b.response.responseText})}this.getRouteManager().goErrorPage(Ext.create("exception",c))}},1,0,0,0,0,0,[ManagementConsole.logic,"ExceptionProcessor"],0));(Ext.cmd.derive("ManagementConsole.logic.DataManager",Ext.Base,{inject:["restConfig","groupDataManager","exceptionProcessor"],config:{restConfig:null,groupDataManager:null,exceptionProcessor:null},constructor:function(){Deft.Injector.inject(this.inject,this);this.callParent(arguments)},loadGroupData:function(){this.loadAccount.apply(this,arguments)},loadAccount:function(c,a){var b=Ext.create("ManagementConsole.model.Account");b.load({params:{login:"alexander.poterenko@acronis.com"},scope:{me:this,callback:c,scope:a},callback:this.onSuccessLoadAccount})},onSuccessLoadAccount:function(c){var b=this.me,a;b.getRestConfig().setHost(c.get("server_url"));a=Ext.create("ManagementConsole.model.Login",{username:c.get("login"),password:"IQgd9ax"});a.save({scope:this,success:b.onSuccessLogin,failure:b.onFailureLogin})},onFailureLogin:function(b,a){var c=this.me;c.getExceptionProcessor().process(a)},onSuccessLogin:function(){var a=Ext.create("ManagementConsole.model.Profile");a.load({scope:this,success:this.me.onSuccessLoadProfile})},onSuccessLoadProfile:function(a){this.me.getGroupDataManager().load(this.callback,this.scope,{id:a.get("group").id})},loadReportData:function(){}},1,0,0,0,0,0,[ManagementConsole.logic,"DataManager"],0));(Ext.cmd.derive("ManagementConsole.logic.AccessManager",Ext.Base,{checkAccess:function(a){Ext.log({msg:'Check access on module: "'+a+'"',level:"log"});return true}},0,0,0,0,0,0,[ManagementConsole.logic,"AccessManager"],0));(Ext.cmd.derive("ManagementConsole.controller.Group",Ext.app.Controller,{},0,0,0,0,0,0,[ManagementConsole.controller,"Group"],0));(Ext.cmd.derive("ManagementConsole.Application",Ext.app.Application,{name:"ManagementConsole",controllers:["Group"],inject:["routeManager"],config:{routeManager:null},constructor:function(){Deft.Injector.configure({dataManager:"ManagementConsole.logic.DataManager",accessManager:"ManagementConsole.logic.AccessManager",routeManager:"ManagementConsole.logic.RouteManager",groupDataManager:"ManagementConsole.logic.group.GroupDataManager",exceptionProcessor:"ManagementConsole.logic.ExceptionProcessor",restConfig:"ManagementConsole.data.proxy.RestConfig",entityManager:"ManagementConsole.logic.EntityManager",application:{value:this}});Deft.Injector.inject(this.inject,this);Ext.app.Application.prototype.constructor.apply(this,arguments)},launch:function(){this.getRouteManager().goGroupPage()}},1,0,0,0,0,0,[ManagementConsole,"Application"],0));(Ext.cmd.derive("ManagementConsole.store.Personnel",Ext.data.Store,{fields:["name","email","phone"],data:{items:[{name:"Jean Luc",email:"jeanluc.picard@enterprise.com",phone:"555-111-1111"},{name:"Worf",email:"worf.moghsson@enterprise.com",phone:"555-222-2222"},{name:"Deanna",email:"deanna.troi@enterprise.com",phone:"555-333-3333"},{name:"Data",email:"mr.data@enterprise.com",phone:"555-444-4444"}]},proxy:{type:"memory",reader:{type:"json",rootProperty:"items"}}},0,0,0,0,["store.personnel"],0,[ManagementConsole.store,"Personnel"],0));(Ext.cmd.derive("ManagementConsole.view.main.MainController",Ext.app.ViewController,{inject:["dataManager","accessManager"],config:{dataManager:null,accessManager:null},routes:{":target":{action:"onTargetAction",before:"onBeforeTargetAction"},group:{action:"onGroupAction",before:"onBeforeGroupAction"}},constructor:function(){Deft.Injector.inject(this.inject,this);Ext.app.ViewController.prototype.constructor.apply(this,arguments)},onGroupAction:function(){this.getView().showGroupPage()},onBeforeGroupAction:function(a){this.getDataManager().loadGroupData(a.resume,a)},onBeforeTargetAction:function(b,a){this.getAccessManager().checkAccess(b);a.resume()},onTargetAction:function(b,a){}},1,0,0,0,["controller.main"],0,[ManagementConsole.view.main,"MainController"],0));(Ext.cmd.derive("ManagementConsole.view.main.MainModel",Ext.app.ViewModel,{data:{name:"ManagementConsole",loremIpsum:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}},0,0,0,0,["viewmodel.main"],0,[ManagementConsole.view.main,"MainModel"],0));(Ext.cmd.derive("ManagementConsole.view.main.List",Ext.grid.Panel,{title:"Personnel",store:{type:"personnel"},columns:[{text:"Name",dataIndex:"name"},{text:"Email",dataIndex:"email",flex:1},{text:"Phone",dataIndex:"phone",flex:1}],listeners:{select:"onItemSelected"}},0,["mainlist"],["component","box","container","panel","tablepanel","gridpanel","grid","mainlist"],{component:true,box:true,container:true,panel:true,tablepanel:true,gridpanel:true,grid:true,mainlist:true},["widget.mainlist"],0,[ManagementConsole.view.main,"List"],0));(Ext.cmd.derive("ManagementConsole.view.main.MainView",Ext.tab.Panel,{ui:"navigation",tabBarHeaderPosition:1,titleRotation:0,tabRotation:0,headerPosition:"left",header:{layout:{align:"stretchmax"},title:{bind:{text:"{name}"},flex:0},iconCls:"fa-th-list"},tabBar:{flex:1,layout:{align:"stretch",overflowHandler:"none"}},defaults:{bodyPadding:20,tabConfig:{plugins:"responsive",responsiveConfig:{wide:{iconAlign:"left",textAlign:"left"},tall:{iconAlign:"top",textAlign:"center",width:120}}}},items:[{title:"Home",iconCls:"fa-home",items:[{xtype:"mainlist"}]},{title:"Users",iconCls:"fa-user",bind:{html:"{loremIpsum}"}},{title:"Groups",iconCls:"fa-users",bind:{html:"{loremIpsum}"}},{title:"Settings",iconCls:"fa-cog",bind:{html:"{loremIpsum}"}}]},0,["main-view"],["component","box","container","panel","tabpanel","main-view"],{component:true,box:true,container:true,panel:true,tabpanel:true,"main-view":true},["widget.main-view"],0,[ManagementConsole.view.main,"MainView"],0));(Ext.cmd.derive("ManagementConsole.view.main.Main",Ext.Container,{controller:"main",viewModel:"main",layout:"card",items:[{xtype:"box",html:"loading"},{xtype:"main-view"}],showGroupPage:function(){this.layout.setActiveItem(1)}},0,0,["component","box","container"],{component:true,box:true,container:true},0,0,[ManagementConsole.view.main,"Main"],0));Ext.application({name:"ManagementConsole",extend:ManagementConsole.Application,mainView:"ManagementConsole.view.main.Main"});