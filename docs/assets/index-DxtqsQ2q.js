import{a as he,m as we,g as Ie,b as d,r as Ce,p as Ne,h as u,G as Ue,o as m,c as O,d as R,e,w as l,j as r,H as g,k as c,i as y,t as Pe,F as X,C as Z,f as D,I as K,K as $e}from"./index-CNOJrj9I.js";const Re={class:"user_search"},De={class:"user_content"},Fe={class:"user_content_header"},Le={style:{"margin-bottom":"8px"}},Se={__name:"index",setup(qe){const ee=we(),{proxy:h}=Ie(),s=d({}),v=d({userName:"",phonenumber:"",status:"",createTime:""}),I=d({resetPassword:""}),z=d(""),C=d(!1),N=d([]),U=d(!1),F=d(!0),le=Ce({type:"checkbox",showCheckedAll:!0,onlyCurrent:!1}),B=d([]),L=d([]),S=d([]),w=d(!1),q=d(""),ae=d(void 0),M=d(!0),Y=d(void 0),T=d(void 0),te={resetPassword:[{required:!0,message:"密码不能为空"},{minLength:5,message:"用户密码长度必须介于5-20之间"},{maxLength:20,message:"用户密码长度必须介于5-20之间"}]},se={userName:[{required:!0,message:"用户名称不能为空"},{minLength:2,message:"用户名称长度必须介于2-20之间"},{maxLength:20,message:"用户名称长度必须介于2-20之间"}],nickName:[{required:!0,message:"用户昵称不能为空"}],password:[{required:!0,message:"用户密码不能为空"},{minLength:5,message:"用户名称长度必须介于5-20之间"},{maxLength:20,message:"用户名称长度必须介于5-20之间"}],phonenumber:[{match:/^(?:(?:\+|00)86)?1\d{10}$/,message:"请输入正确的手机号码"}]};function ne(){D("/system/user/deptTree").then(n=>{Y.value=n.data})}function j(){s.value={userId:void 0,deptId:void 0,userName:void 0,nickName:void 0,password:void 0,phonenumber:void 0,email:void 0,sex:void 0,status:"0",remark:void 0,postIds:[],roleIds:[]},h.$refs.userRef.resetFields()}const ue=()=>{},oe=()=>{h.$refs.formRef.resetFields(),N.value=[]},de=n=>{L.value=n,M.value=n.length!=1,n.length>0?F.value=!1:F.value=!0},re=()=>{j(),D("/system/user/detail").then(n=>{T.value=n.posts,S.value=n.roles,w.value=!0,q.value="添加用户",s.value.password=ae.value})},E=n=>{j();const t=n.userId||L.value;D(`/system/user/detail/${t}`).then(p=>{s.value=p.data,T.value=p.posts,S.value=p.roles,s.value.roleIds=p.roleIds,w.value=!0,q.value="修改用户",s.value.password=""})},G=n=>{const t=n.userId||L.value;K.confirm({title:"提示",content:'是否确认删除用户编号为"'+t+'"的数据项?',titleAlign:"start",onOk:()=>{}})},ie=n=>{z.value=n,C.value=!0,I.value.resetPassword="",setTimeout(()=>{h.$refs.resetPwdRef.focus()})},me=()=>{h.$refs.pwdFormRef.validate().then(n=>{}).catch(()=>{})},pe=()=>{h.$refs.userRef.validate().then(n=>{n||s.value.userId}).catch(()=>{})},fe=n=>{let t=n.status==="0"?"启用":"停用";K.confirm({title:"提示",content:`确认要${t}${n.userName}用户吗?`,titleAlign:"start",onOk:()=>{},onCancel:()=>{n.status=n.status==="0"?"1":"0"}})},ce=n=>{const t=n.userId;ee.push("/system/user-auth/role/"+t)},H=()=>{U.value=!0,D("/system/user/list",$e(v.value,N.value)).then(n=>{U.value=!1,B.value=n.rows}).catch(n=>{U.value=!1})};return Ne(()=>{H(),ne()}),(n,t)=>{const p=u("a-input"),o=u("a-form-item"),b=u("a-option"),P=u("a-select"),ve=u("a-range-picker"),i=u("a-button"),V=u("a-space"),A=u("a-form"),$=u("Icon"),J=u("a-tooltip"),_=u("a-table-column"),_e=u("a-switch"),be=u("a-table"),Q=u("a-modal"),f=u("a-col"),xe=u("a-tree-select"),ge=u("a-input-password"),W=u("a-radio"),Ve=u("a-radio-group"),ke=u("a-textarea"),ye=u("a-row"),x=Ue("hasPermi");return m(),O("div",null,[R("div",Re,[e(V,null,{default:l(()=>[e(A,{ref:"formRef",model:v.value,layout:"inline",onSubmit:ue},{default:l(()=>[e(o,{field:"userName",label:"用户名称"},{default:l(()=>[e(p,{modelValue:v.value.userName,"onUpdate:modelValue":t[0]||(t[0]=a=>v.value.userName=a)},null,8,["modelValue"])]),_:1}),e(o,{field:"phonenumber",label:"手机号码"},{default:l(()=>[e(p,{modelValue:v.value.phonenumber,"onUpdate:modelValue":t[1]||(t[1]=a=>v.value.phonenumber=a)},null,8,["modelValue"])]),_:1}),e(o,{field:"status",label:"状态"},{default:l(()=>[e(P,{modelValue:v.value.status,"onUpdate:modelValue":t[2]||(t[2]=a=>v.value.status=a),style:{width:"180px"},"allow-clear":""},{default:l(()=>[e(b,{value:"0",label:"正常"}),e(b,{value:"1",label:"停用"})]),_:1},8,["modelValue"])]),_:1}),e(o,{label:"创建时间"},{default:l(()=>[e(ve,{modelValue:N.value,"onUpdate:modelValue":t[3]||(t[3]=a=>N.value=a),style:{width:"254px"},"time-picker-props":{},format:"YYYY-MM-DD"},null,8,["modelValue"])]),_:1}),e(o,null,{default:l(()=>[e(V,null,{default:l(()=>[e(i,{type:"primary","html-type":"search"},{default:l(()=>[r("搜索")]),_:1}),e(i,{type:"outline",onClick:oe},{default:l(()=>[r("重置")]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),_:1})]),R("div",De,[R("div",Fe,[e(V,null,{default:l(()=>[g((m(),c(i,{type:"primary",onClick:re},{icon:l(()=>[e($,{icon:"plus"})]),default:l(()=>[r("新增")]),_:1})),[[x,["system:user:add"]]]),g((m(),c(i,{type:"primary",status:"success",disabled:M.value,onClick:E},{icon:l(()=>[e($,{icon:"editor"})]),default:l(()=>[r("修改")]),_:1},8,["disabled"])),[[x,["system:user:edit"]]]),g((m(),c(i,{type:"primary",status:"danger",disabled:F.value,onClick:G},{icon:l(()=>[e($,{icon:"delete"})]),default:l(()=>[r("删除")]),_:1},8,["disabled"])),[[x,["system:user:remove"]]])]),_:1}),e(V,null,{default:l(()=>[e(J,{content:"刷新"},{default:l(()=>[e(i,{shape:"circle",onClick:H},{icon:l(()=>[e($,{icon:"refresh"})]),_:1})]),_:1})]),_:1})]),e(be,{class:"user_table",bordered:!1,"row-key":"userId",loading:U.value,"row-selection":le,data:B.value,onSelect:de},{columns:l(()=>[e(_,{title:"用户编号",width:120,"data-index":"userId",align:"center",sortable:{sortDirections:["ascend","descend"]}}),e(_,{title:"用户名称","data-index":"userName",align:"center",sortable:{sortDirections:["ascend","descend"]}}),e(_,{title:"用户昵称","data-index":"nickName",align:"center"}),e(_,{title:"部门","data-index":"dept.deptName",align:"center"}),e(_,{title:"手机号码","data-index":"phonenumber",align:"center"}),e(_,{title:"状态","data-index":"status",align:"center"},{cell:l(({record:a})=>[e(J,{content:a.status==="0"?"正常":"停用"},{default:l(()=>[e(_e,{modelValue:a.status,"onUpdate:modelValue":k=>a.status=k,"checked-value":"0","unchecked-value":"1",onChange:k=>fe(a)},null,8,["modelValue","onUpdate:modelValue","onChange"])]),_:2},1032,["content"])]),_:1}),e(_,{title:"创建时间","data-index":"createTime",align:"center"}),e(_,{title:"操作",align:"center"},{cell:l(({record:a})=>[a.userId!="1"?g((m(),c(i,{key:0,type:"text",size:"mini",onClick:k=>E(a)},{default:l(()=>[r("修改")]),_:2},1032,["onClick"])),[[x,["system:user:edit"]]]):y("",!0),a.userId!="1"?g((m(),c(i,{key:1,type:"text",status:"danger",size:"mini",onClick:k=>G(a)},{default:l(()=>[r("删除")]),_:2},1032,["onClick"])),[[x,["system:user:remove"]]]):y("",!0),a.userId!="1"?g((m(),c(i,{key:2,type:"text",size:"mini",onClick:k=>ie(a)},{default:l(()=>[r("重置密码")]),_:2},1032,["onClick"])),[[x,["system:user:resetPwd"]]]):y("",!0),a.userId!="1"?g((m(),c(i,{key:3,type:"text",size:"mini",onClick:k=>ce(a)},{default:l(()=>[r("分配角色")]),_:2},1032,["onClick"])),[[x,["system:user:edit"]]]):y("",!0)]),_:1})]),_:1},8,["loading","row-selection","data"])]),e(Q,{visible:C.value,"onUpdate:visible":t[6]||(t[6]=a=>C.value=a),title:"提示"},{footer:l(()=>[e(V,null,{default:l(()=>[e(i,{onClick:t[5]||(t[5]=a=>C.value=!1)},{default:l(()=>[r("取 消")]),_:1}),e(i,{type:"primary",onClick:me},{default:l(()=>[r("确 定")]),_:1})]),_:1})]),default:l(()=>[R("div",Le,'请输入 "'+Pe(z.value.userName)+'" 用户的新密码',1),e(A,{ref:"pwdFormRef",model:I.value,"auto-label-width":"",rules:te},{default:l(()=>[e(o,{field:"resetPassword",class:"pwd-item"},{default:l(()=>[e(p,{ref:"resetPwdRef",modelValue:I.value.resetPassword,"onUpdate:modelValue":t[4]||(t[4]=a=>I.value.resetPassword=a)},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["visible"]),e(Q,{visible:w.value,"onUpdate:visible":t[19]||(t[19]=a=>w.value=a),title:q.value,width:700},{footer:l(()=>[e(V,null,{default:l(()=>[e(i,{onClick:t[18]||(t[18]=a=>w.value=!1)},{default:l(()=>[r("取 消")]),_:1}),e(i,{type:"primary",onClick:pe},{default:l(()=>[r("确 定")]),_:1})]),_:1})]),default:l(()=>[e(A,{ref:"userRef",model:s.value,rules:se},{default:l(()=>[e(ye,null,{default:l(()=>[e(f,{span:12},{default:l(()=>[e(o,{label:"用户昵称",field:"nickName","label-col-flex":"100px"},{default:l(()=>[e(p,{modelValue:s.value.nickName,"onUpdate:modelValue":t[7]||(t[7]=a=>s.value.nickName=a),placeholder:"请输入用户昵称","max-length":30},null,8,["modelValue"])]),_:1})]),_:1}),e(f,{span:12},{default:l(()=>[e(o,{label:"归属部门",field:"deptId","label-col-flex":"100px"},{default:l(()=>[e(xe,{modelValue:s.value.deptId,"onUpdate:modelValue":t[8]||(t[8]=a=>s.value.deptId=a),data:Y.value,"field-names":{title:"label",key:"id"},placeholder:"请选择归属部门"},null,8,["modelValue","data"])]),_:1})]),_:1}),e(f,{span:12},{default:l(()=>[e(o,{label:"手机号码",field:"phonenumber","label-col-flex":"100px"},{default:l(()=>[e(p,{modelValue:s.value.phonenumber,"onUpdate:modelValue":t[9]||(t[9]=a=>s.value.phonenumber=a),placeholder:"请输入手机号码","max-length":11},null,8,["modelValue"])]),_:1})]),_:1}),e(f,{span:12},{default:l(()=>[e(o,{label:"邮箱",field:"email","label-col-flex":"100px"},{default:l(()=>[e(p,{modelValue:s.value.email,"onUpdate:modelValue":t[10]||(t[10]=a=>s.value.email=a),placeholder:"请输入邮箱","max-length":50},null,8,["modelValue"])]),_:1})]),_:1}),e(f,{span:12},{default:l(()=>[s.value.userId==null?(m(),c(o,{key:0,label:"用户名称",field:"userName","label-col-flex":"100px"},{default:l(()=>[e(p,{modelValue:s.value.userName,"onUpdate:modelValue":t[11]||(t[11]=a=>s.value.userName=a),placeholder:"请输入用户名称","max-length":30},null,8,["modelValue"])]),_:1})):y("",!0)]),_:1}),e(f,{span:12},{default:l(()=>[s.value.userId==null?(m(),c(o,{key:0,label:"用户密码",field:"password","label-col-flex":"100px"},{default:l(()=>[e(ge,{modelValue:s.value.password,"onUpdate:modelValue":t[12]||(t[12]=a=>s.value.password=a),placeholder:"请输入用户密码","max-length":20},null,8,["modelValue"])]),_:1})):y("",!0)]),_:1}),e(f,{span:12},{default:l(()=>[e(o,{label:"用户性别",field:"sex","label-col-flex":"100px"},{default:l(()=>[e(P,{modelValue:s.value.sex,"onUpdate:modelValue":t[13]||(t[13]=a=>s.value.sex=a)},{default:l(()=>[e(b,{label:"男",value:"0"}),e(b,{label:"女",value:"1"}),e(b,{label:"未知",value:"2"})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(f,{span:12},{default:l(()=>[e(o,{label:"状态",field:"status","label-col-flex":"100px"},{default:l(()=>[e(Ve,{modelValue:s.value.status,"onUpdate:modelValue":t[14]||(t[14]=a=>s.value.status=a)},{default:l(()=>[e(W,{value:"0",label:"正常"},{default:l(()=>[r("正常")]),_:1}),e(W,{value:"1",label:"停用"},{default:l(()=>[r("停用")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(f,{span:12},{default:l(()=>[e(o,{label:"岗位",field:"postIds","label-col-flex":"100px"},{default:l(()=>[e(P,{modelValue:s.value.postIds,"onUpdate:modelValue":t[15]||(t[15]=a=>s.value.postIds=a)},{default:l(()=>[(m(!0),O(X,null,Z(T.value,a=>(m(),c(b,{key:a.postName,value:a.postId,label:a.postName},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(f,{span:12},{default:l(()=>[e(o,{label:"角色",field:"status","label-col-flex":"100px"},{default:l(()=>[e(P,{modelValue:s.value.roleIds,"onUpdate:modelValue":t[16]||(t[16]=a=>s.value.roleIds=a)},{default:l(()=>[(m(!0),O(X,null,Z(S.value,a=>(m(),c(b,{key:a.roleName,value:a.roleId,label:a.roleName},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(f,{span:24},{default:l(()=>[e(o,{label:"备注",field:"remark","label-col-flex":"100px"},{default:l(()=>[e(ke,{modelValue:s.value.remark,"onUpdate:modelValue":t[17]||(t[17]=a=>s.value.remark=a)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),_:1},8,["visible","title"])])}}},Ae=he(Se,[["__scopeId","data-v-f62d274c"]]);export{Ae as default};
