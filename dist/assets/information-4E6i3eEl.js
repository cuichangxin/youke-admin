import{_ as N,a as f,C as g,b as u,o as w,j as h,w as l,e,i as m}from"./index-JKZ21V0p.js";const C={__name:"information",props:{user:{type:Object}},setup(c){const _=c,s=f(null),o=f({name:void 0,userName:void 0,phone:void 0,email:void 0,dept:void 0,sex:"0"}),v={nickName:[{required:!0,message:"昵称不能为空"}],phonenumber:[{required:!0,message:"手机号码不能为空"},{pattern:/^1[3|4|5|6|7|8|9][0-9]\d{8}$/,message:"请输入正确的手机号码"}],email:[{required:!0,message:"邮箱不能为空"},{type:"email",message:"请输入正确的邮箱地址"}]},b=async()=>{var a;await((a=s.value)==null?void 0:a.validate())},V=async()=>{var a;await((a=s.value)==null?void 0:a.resetFields())};return g(()=>_.user,a=>{a&&(o.value={nickName:a.nickName,phonenumber:a.phonenumber,email:a.email,sex:a.sex})},{immediate:!0}),(a,n)=>{const r=u("a-input"),d=u("a-form-item"),i=u("a-radio"),k=u("a-radio-group"),p=u("a-button"),x=u("a-space"),y=u("a-form");return w(),h(y,{ref_key:"formRef",ref:s,model:o.value,class:"form",rules:v,"label-col-props":{span:5},"wrapper-col-props":{span:16}},{default:l(()=>[e(d,{field:"nickName",label:"用户昵称"},{default:l(()=>[e(r,{modelValue:o.value.nickName,"onUpdate:modelValue":n[0]||(n[0]=t=>o.value.nickName=t),placeholder:"请输入您的昵称"},null,8,["modelValue"])]),_:1}),e(d,{field:"phonenumber",label:"手机号码"},{default:l(()=>[e(r,{modelValue:o.value.phonenumber,"onUpdate:modelValue":n[1]||(n[1]=t=>o.value.phonenumber=t),placeholder:"请输入您的手机号码"},null,8,["modelValue"])]),_:1}),e(d,{field:"email",label:"邮箱"},{default:l(()=>[e(r,{modelValue:o.value.email,"onUpdate:modelValue":n[2]||(n[2]=t=>o.value.email=t),placeholder:"请输入您的邮箱"},null,8,["modelValue"])]),_:1}),e(d,{field:"sex",label:"性别"},{default:l(()=>[e(k,{modelValue:o.value.sex,"onUpdate:modelValue":n[3]||(n[3]=t=>o.value.sex=t)},{default:l(()=>[e(i,{value:"0"},{default:l(()=>[m("男")]),_:1}),e(i,{value:"1"},{default:l(()=>[m("女")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(d,null,{default:l(()=>[e(x,null,{default:l(()=>[e(p,{type:"primary",onClick:b},{default:l(()=>[m(" 保存 ")]),_:1}),e(p,{type:"secondary",onClick:V},{default:l(()=>[m(" 重置 ")]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])}}},q=N(C,[["__scopeId","data-v-dd6b20e6"]]);export{q as default};
