(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{290:function(e,t,n){},430:function(e,t,n){"use strict";n.r(t);var c,a=n(0),r=n.n(a),o=n(28),i=n.n(o),j=(n(290),n(496)),s=n(235),u=n(491),b=n(475),O=n(40),l=n(255),f=n(258),d=n(18),h=n(494),x=n(490),p=n(501),v=n(498),y=n(30),m=n(492),g=n(7),C=function(e){return Object(g.jsx)(m.a,Object(y.a)(Object(y.a)({},e),{},{InputLabelProps:{shrink:!0},variant:"outlined"}))},w=n(4),k=n(470),E=n(471),S=n(472),F=n(159),D=n(160);!function(e){e.Forward="forward",e.Backward="backward"}(c||(c={}));var M=Object(k.a)((function(e){return{root:{padding:e.spacing(1.5)},withError:{color:F.a[600]},NoError:{color:D.a[600]}}})),T=function(e){var t=e.operationMode,n=e.error,a=M(n);return Object(g.jsx)("div",{className:Object(w.a)(a.root,n?a.withError:a.NoError),children:t===c.Forward?Object(g.jsx)(E.a,{}):Object(g.jsx)(S.a,{})})},_=n(497),K=n(44),P=n.n(K),R=n(95),A=n(499),L=function(){var e=Object(R.a)(P.a.mark((function e(){var t;return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://openexchangerates.org/api/currencies.json");case 2:return t=e.sent,e.next=5,t.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),I=function(e){var t=function(){var e=Object(a.useState)(null),t=Object(d.a)(e,2),n=t[0],c=t[1],r=Object(A.a)("currencies",L,{refetchOnWindowFocus:!1,refetchOnMount:!1,staleTime:60});return Object(a.useEffect)((function(){var e=r.data;if(e){var t=Object.keys(e).map((function(t){return{key:t,name:e[t]}}));c(t)}}),[r.data]),Object(a.useMemo)((function(){return n}),[n])}();return Object(g.jsx)(_.a,Object(y.a)(Object(y.a)({},e),{},{style:{width:300},options:null!==t&&void 0!==t?t:[],getOptionLabel:function(e){return e.name},renderInput:function(e){return Object(g.jsx)(m.a,Object(y.a)(Object(y.a)({},e),{},{label:"Choose a Currency",variant:"outlined"}))}}))},N=n(476),B=n(493),H=function(e){return Object(g.jsx)(B.a,Object(y.a)(Object(y.a)({},e),{},{disableToolbar:!0,autoOk:!0,variant:"inline",format:"dd/MM/yyyy",margin:"normal",maxDate:new Date,minDate:Object(N.a)(new Date,10),id:"date-picker-inline",label:"Convertion Date"}))},W=n(473),X=n(477),z=function(e){return Object(g.jsx)(W.a,Object(y.a)(Object(y.a)({},e),{},{style:{background:"rgb(0 0 0 / 14%)"},size:"small",children:Object(g.jsx)(X.a,{})}))},U=n(156),q=n(478),J=Object(a.memo)((function(e){var t=e.onClick,n=Object(U.a)(e,["onClick"]);return Object(g.jsx)(W.a,Object(y.a)(Object(y.a)({},n),{},{color:"secondary",onClick:t,"aria-label":"remove-convertion-box",size:"small",children:Object(g.jsx)(q.a,{})}))})),Y=n(500),Z=n(488),G=n(474),V=n(482),Q=n(483),$=n(487),ee=n(253),te=n(254),ne=n(122),ce=n(119),ae=n(259),re=n(479),oe=n(480),ie=n(481),je=n(257),se=function(){var e=Object(R.a)(P.a.mark((function e(t){var n,c,a,r,o,i,j,s;return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(n=t.queryKey,c=n[1],a=n[2],r=n[3],o=[c,a].join(""),i=Object(re.a)(r,60),j=r;Object(oe.a)(i)||Object(ie.a)(i);)i=Object(re.a)(i,1);for(;Object(oe.a)(j)||Object(ie.a)(j);)j=Object(re.a)(j,1);return e.next=11,fetch("https://fxmarketapi.com/apitimeseries?api_key=".concat("H89XCTMcishFM3lKnZKl","&currency=").concat(o,"&start_date=").concat(Object(je.a)(i,"yyyy-MM-dd"),"&end_date=").concat(Object(je.a)(j,"yyyy-MM-dd")));case 11:return s=e.sent,e.next=14,s.json();case 14:return e.abrupt("return",e.sent);case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ue=function(e){var t=e.firstCurrency,n=e.secondCurrency,c=function(e,t,n){var c=Object(A.a)(["rates-".concat(e,"-").concat(t,"-").concat(n),e,t,n],se,{refetchOnWindowFocus:!1,refetchOnMount:!1,staleTime:60}),r=Object(a.useState)(null),o=Object(d.a)(r,2),i=o[0],j=o[1];return Object(a.useEffect)((function(){var n=c.data;if(n){var a=[e,t].join(""),r=Object.keys(n.price).map((function(e){return{date:e,rate:n.price[e][a].close}}));j(r)}}),[c.data,e,t]),i}(t,n,e.convertionDate);return c?Object(g.jsx)(V.a,{width:"100%",height:"100%",children:Object(g.jsxs)(Q.a,{width:500,height:300,data:c,margin:{top:5,right:30,left:20,bottom:5},children:[Object(g.jsx)($.a,{strokeDasharray:"3 3"}),Object(g.jsx)(ee.a,{dataKey:"date"}),Object(g.jsx)(te.a,{}),Object(g.jsx)(ne.a,{}),Object(g.jsx)(ce.a,{}),Object(g.jsx)(ae.a,{type:"monotone",dataKey:"rate",name:"".concat(t,"-").concat(n," Rate"),stroke:"#8884d8",activeDot:{r:8}})]})}):null},be=function(e,t,n){return n===c.Forward?e:t},Oe=function(e,t,n){return n===c.Forward?t:e},le=function(e){var t=e.DialogProps,n=e.leftCurrency,c=e.rightCurrency,a=e.operationMode,r=e.convertionDate,o=be(n,c,a),i=Oe(n,c,a);return Object(g.jsxs)(Y.a,Object(y.a)(Object(y.a)({fullScreen:!0,"aria-labelledby":"currency-history-dialog"},t),{},{children:[Object(g.jsx)(Z.a,{id:"customized-dialog-title",children:"Convertion Historical Data: ".concat(o," - ").concat(i," (last 60 days)")}),Object(g.jsx)(G.a,{children:Object(g.jsx)(ue,{firstCurrency:o,secondCurrency:i,convertionDate:r})})]}))},fe=n(504),de=n(140),he=n(230),xe=function(){var e=Object(R.a)(P.a.mark((function e(t){var n,c,a,r,o,i;return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.queryKey,c=n[1],a=n[2],c){e.next=5;break}return e.abrupt("return");case 5:return r=new Date,o=Object(he.a)(a,r)?"https://openexchangerates.org/api/latest.json?app_id=".concat("c266944752f24393afe3cf6f9fde2f3a","&symbols=").concat(c):"https://openexchangerates.org/api/historical/".concat(Object(je.a)(a,"yyyy-MM-dd"),".json?app_id=").concat("c266944752f24393afe3cf6f9fde2f3a","&symbols=").concat(c),e.next=9,fetch(o);case 9:return i=e.sent,e.next=12,i.json();case 12:return e.abrupt("return",e.sent);case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),pe=function(e,t,n,c){var r=Object(a.useState)(null),o=Object(d.a)(r,2),i=o[0],j=o[1],s=Object(a.useState)(!1),u=Object(d.a)(s,2),b=u[0],O=u[1],l=function(e,t,n){var c=Object(a.useState)(null),r=Object(d.a)(c,2),o=r[0],i=r[1],j=Object(a.useState)(""),s=Object(d.a)(j,2),u=s[0],b=s[1],O=Object(A.a)(["rates-".concat(u,"-").concat(n),u,n],xe,{refetchOnWindowFocus:!1,refetchOnMount:!1,staleTime:60});return Object(a.useEffect)((function(){e&&t&&b(function(e,t){var n=[e,t];return arguments.length>2&&void 0!==arguments[2]&&arguments[2]?n.sort().join(","):n.join(",")}(e,t,!0))}),[e,t]),Object(a.useEffect)((function(){var n="".concat(e,"-").concat(t),c=O.data;c&&i((function(e){return Object(y.a)(Object(y.a)({},e),{},Object(de.a)({},n,c.rates))}))}),[O.data,e,t]),Object(a.useMemo)((function(){return o}),[o])}(e,t,n);return Object(fe.a)((function(){if(c){if(l){var n=l["".concat(e,"-").concat(t)];n&&t&&e&&(j(n[t]*c/n[e]),O(!1))}}else O(!0)}),300,[c,e,t,l]),{result:i,withError:b}},ve=Object(a.memo)((function(e){var t=e.removeEnabled,n=e.onRemove,r=Object(a.useState)(""),o=Object(d.a)(r,2),i=o[0],j=o[1],s=Object(a.useState)(""),u=Object(d.a)(s,2),b=u[0],O=u[1],l=Object(a.useState)(""),f=Object(d.a)(l,2),x=f[0],y=f[1],m=Object(a.useState)(""),w=Object(d.a)(m,2),k=w[0],E=w[1],S=Object(a.useState)(new Date),F=Object(d.a)(S,2),D=F[0],M=F[1],_=Object(a.useState)(!1),K=Object(d.a)(_,2),P=K[0],R=K[1],A=Object(a.useState)(null),L=Object(d.a)(A,2),N=L[0],B=L[1],W=Object(a.useState)(!1),X=Object(d.a)(W,2),U=X[0],q=X[1],Y=Object(a.useState)(c.Forward),Z=Object(d.a)(Y,2),G=Z[0],V=Z[1],Q=function(e,t,n){return n===c.Forward?e:t}(i,b,G),$=pe(be(x,k,G),Oe(x,k,G),D,Number(Q)),ee=$.result,te=$.withError;Object(a.useEffect)((function(){B(ee)}),[ee]),Object(a.useEffect)((function(){if(N){var e=N.toFixed(3);G===c.Forward?O(e):j(e)}}),[N,G]),Object(a.useEffect)((function(){q(!(!i||!b)&&!!te)}),[te,i,b]);return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("div",{children:[Object(g.jsxs)(h.a,{marginBottom:1,display:"flex",alignContent:"center",children:[Object(g.jsx)(H,{value:D,onChange:function(e){M(e)}}),Object(g.jsxs)(h.a,{paddingLeft:2,marginTop:4,children:[Object(g.jsx)(z,{disabled:!x||!k,onClick:function(){R(!0)}}),t&&Object(g.jsx)(J,{onClick:n})]})]}),Object(g.jsxs)(h.a,{display:"flex",children:[Object(g.jsx)(C,{error:U,value:i,onChange:function(e){j(e.target.value)},onKeyDown:function(){B(null),V(c.Forward)},label:G===c.Forward?"From":"To"}),Object(g.jsx)(h.a,{marginLeft:1,children:Object(g.jsx)(I,{onChange:function(e,t){t&&y(t.key)}})}),Object(g.jsx)(h.a,{marginLeft:1,marginRight:1,children:Object(g.jsx)(T,{error:U,operationMode:G})}),Object(g.jsx)(h.a,{marginRight:1,children:Object(g.jsx)(I,{onChange:function(e,t){t&&E(t.key)}})}),Object(g.jsx)(C,{error:U,value:b,onChange:function(e){O(e.target.value)},onKeyDown:function(){B(null),V(c.Backward)},label:G===c.Forward?"To":"From"})]})]}),!!x&&!!k&&Object(g.jsx)(le,{leftCurrency:x,rightCurrency:k,convertionDate:D,operationMode:G,DialogProps:{open:P,onClose:function(){R(!1)}}}),Object(g.jsx)(p.a,{open:U,children:Object(g.jsx)(v.a,{severity:"error",children:"Invalid amount!"})})]})})),ye=n(489),me=Object(a.memo)((function(e){var t=e.onClick,n=Object(U.a)(e,["onClick"]);return Object(g.jsx)(W.a,Object(y.a)(Object(y.a)({},n),{},{style:{color:D.a[600]},onClick:t,"aria-label":"remove-convertion-box",children:Object(g.jsx)(ye.a,{})}))})),ge=function(){var e=Object(a.useState)([0]),t=Object(d.a)(e,2),n=t[0],c=t[1],r=n.length>1;return Object(g.jsxs)(h.a,{margin:"auto",padding:10,width:"max-content",children:[n.map((function(e,t){return Object(g.jsxs)("div",{children:[Object(g.jsx)(h.a,{paddingTop:1,paddingBottom:1,display:"flex",children:Object(g.jsx)(ve,{removeEnabled:r,onRemove:(a=e,function(){console.log(Object({NODE_ENV:"production",PUBLIC_URL:"/ultimate-currency-converter-dev",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_OPENEXCHANGE_API_KEY:"c266944752f24393afe3cf6f9fde2f3a",REACT_APP_FXMARKET_API_KEY:"H89XCTMcishFM3lKnZKl"})),c((function(e){return e.filter((function(e){return e!==a}))}))})})}),t!==n.length-1&&Object(g.jsx)(x.a,{})]},e);var a})),Object(g.jsx)(x.a,{}),Object(g.jsx)(h.a,{width:"100%",display:"flex",justifyContent:"center",children:Object(g.jsx)(me,{onClick:function(){c((function(e){return[].concat(Object(f.a)(e),[e[e.length-1]+1])}))}})})]})},Ce=new j.a,we=function(){return Object(g.jsx)(s.a,{client:Ce,children:Object(g.jsxs)(O.a,{utils:l.a,children:[Object(g.jsx)(u.a,{position:"fixed",children:Object(g.jsx)(b.a,{children:"Ultimate Currency Converter \ud83d\ude80"})}),Object(g.jsx)(ge,{})]})})},ke=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,505)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),r(e),o(e)}))};i.a.render(Object(g.jsx)(r.a.StrictMode,{children:Object(g.jsx)(we,{})}),document.getElementById("root")),ke()}},[[430,1,2]]]);
//# sourceMappingURL=main.8b9700c0.chunk.js.map