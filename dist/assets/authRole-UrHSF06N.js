import{_ as T,A as B,l as M,k as U,g as q,a as r,r as A,n as E,f as F,b as o,o as j,c as z,d as u,e,w as t,i as y,M as L,q as P,s as $}from"./index-JKZ21V0p.js";const I=d=>(P("data-v-bdd85e11"),d=d(),$(),d),D={class:"user_auth"},G=I(()=>u("h4",null,"基本信息",-1)),H={class:"auth_table"},J=I(()=>u("h4",null,"角色信息",-1)),O={class:"button-group"},Q={__name:"authRole",setup(d){const k=B(),x=M(),f=U(),{proxy:N}=q(),s=r({nickName:void 0,userName:void 0,userId:void 0}),c=r(!1),g=A({type:"checkbox",showCheckedAll:!0,onlyCurrent:!1}),R=[{title:"角色编号",dataIndex:"roleId"},{title:"角色名称",dataIndex:"roleName"},{title:"权限字符",dataIndex:"roleKey"},{title:"创建时间",dataIndex:"createTime"}],_=r([]),i=r([]),w=()=>{s.value.userId,i.value.join(","),L.success("授权成功")};function V(){k.removeRouterTagFormPath("/system/user-auth"),x.push("/system/user")}return E(()=>{const m=f.params&&f.params.userId;m&&(c.value=!0,F("/system/user/authRole/"+m).then(a=>{s.value=a.user,_.value=a.roles,nextTick(()=>{_.value.forEach(l=>{l.flag&&N.$refs.roleRef.select(l.roleKey,!0)})}),c.value=!1}))}),(m,a)=>{const l=o("a-input"),p=o("a-form-item"),v=o("a-col"),C=o("a-row"),K=o("a-form"),b=o("a-space"),S=o("a-table"),h=o("a-button");return j(),z("div",null,[u("div",D,[G,e(b,{class:"space_user"},{default:t(()=>[e(K,{ref:"formRef",model:s.value,layout:"inline"},{default:t(()=>[e(C,null,{default:t(()=>[e(v,{span:12},{default:t(()=>[e(p,{field:"nickName",label:"用户昵称"},{default:t(()=>[e(l,{modelValue:s.value.nickName,"onUpdate:modelValue":a[0]||(a[0]=n=>s.value.nickName=n),disabled:""},null,8,["modelValue"])]),_:1})]),_:1}),e(v,{span:12},{default:t(()=>[e(p,{field:"userName",label:"登录账号"},{default:t(()=>[e(l,{modelValue:s.value.userName,"onUpdate:modelValue":a[1]||(a[1]=n=>s.value.userName=n),disabled:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),_:1})]),u("div",H,[J,e(S,{ref:"roleRef",selectedKeys:i.value,"onUpdate:selectedKeys":a[2]||(a[2]=n=>i.value=n),bordered:!1,columns:R,"row-key":"roleId",loading:c.value,data:_.value,"row-selection":g},null,8,["selectedKeys","loading","data","row-selection"]),u("div",O,[e(b,{size:20},{default:t(()=>[e(h,{type:"primary",onClick:w},{default:t(()=>[y("提交")]),_:1}),e(h,{onClick:V},{default:t(()=>[y("返回")]),_:1})]),_:1})])])])}}},X=T(Q,[["__scopeId","data-v-bdd85e11"]]);export{X as default};
