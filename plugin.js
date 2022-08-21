(function(){"use strict";const j=require("request"),O=require("fs"),W=require("path"),q={info:{name:"AppNotifications",authors:[{name:"QWERT",discord_id:"678556376640913408",github_username:"QWERTxD"}],github_raw:"https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/InAppNotifications/InAppNotifications.plugin.js",version:"1.0.6",description:"Displays notifications such as new messages, friends added in Discord."},changelog:[{title:"Fix error spam",type:"Fix error spam",items:["Updated version of SmolAlli's fix to the constant spam of error messages (Credits to her). Should work for both the people that were previously having the issue and the the people that weren't."]}],defaultConfig:[{type:"slider",name:"Notification display time (seconds)",note:"Sets the amount of time for a notification to stay on-screen.",min:3,max:25,id:"notiTime",value:3,markers:[...Array(20).keys()].map(b=>b+=1),stickToMarkers:!0},{type:"dropdown",name:"Notifications Position",note:"Note: a client reload is required for changes to take effect.",value:0,id:"position",options:[{label:"Top Right",value:0},{label:"Top Left",value:1},{label:"Bottom Right",value:2},{label:"Bottom Left",value:3}]},{type:"textbox",name:"Keyword Notifications",note:"Push notifications if certain words were sent in a message. (Separate with a comma)",id:"keywords",value:""},{type:"switch",name:"keywords case sensitive",id:"case",value:!1},{type:"switch",name:"Mark message as read when closing",note:"Marks the message as read if you press the close button on a notification.",id:"markAsRead",value:!0},{type:"switch",name:"Display author's highest role color if available",note:"Sets the author's color in the notification to its highest role color.",id:"roleColor",value:!1},{type:"switch",name:"Disable when window is not focused",note:"Do not push notifications if Discord is not focused.",id:"disableIfNoFocus",value:!1},{type:"switch",name:"Disable on Do Not Disturb",note:"Do not push notifications if the current user status is Do Not Disturb.",id:"disableOnDnd",value:!1},{type:"switch",name:"Disable DMs notifications",note:"Do not push notifications from DM chats.",id:"ignoreDMs",value:!1},{type:"switch",name:"Friend requests notifications",note:"Push notifications for accepted friend requests.",id:"relationshipsNotis",value:!0},{type:"switch",name:"Disable Group DMs notifications",note:"Do not push notifications from DM groups.",id:"ignoreDMGroups",value:!1},{type:"textbox",name:"Ignored Users IDs (Split with `, `)",note:"Do not push notifications if the author's id is specified.",id:"ignoredUsers",value:""},{type:"textbox",name:"Ignored Servers IDs (Split with `, `)",note:"Do not push notifications if the message was sent from a specific server.",id:"ignoredServers",value:""},{type:"textbox",name:"Ignored Channels IDs (Split with `, `)",note:"Do not push notifications if the message was sent from a specific channel.",id:"ignoredChannels",value:""}]};module.exports=global.ZeresPluginLibrary?(([b,I])=>{const{DiscordModules:M,WebpackModules:l,PluginUtilities:P,Settings:ce,Patcher:G}=I,{React:s,ReactDOM:_,Dispatcher:S,UserStore:f,ChannelStore:Q,GuildStore:J,NavigationUtils:K,UserStatusStore:C,SelectedChannelStore:X,GuildMemberStore:H,UserProfileModals:Z,InviteActions:U}=M,E=l.getByProps("ChannelTypes").ChannelTypes,N=l.getByProps("isSuppressEveryoneEnabled"),B=l.getByProps("isRawMessageMentioned"),D=l.getByProps("parse","parseTopic"),V=l.getByProps("bulkAck","ack"),Y=l.findByDisplayName("CallJoin"),k=l.findByDisplayName("ImagePlaceholder"),ee=l.findByDisplayName("PersonAdd"),A=l.findByDisplayName("Close"),$=l.findByDisplayName("StickerSmall"),F=l.getByProps("AnimatedAvatar"),m={online:"#43b581",dnd:"#f04747",away:"#faa61a",offline:"#747f8d",brand:"#7289da"},T={...l.getByProps("horizontal","flex","justifyStart"),...l.getByProps("avatar","alt")},te=l.getByProps("useSpring"),{useSpring:ie,animated:z}=te,ne=r=>{const e=new Set,i={getState(n){return n?n(r):r},setState(n){const a=typeof n=="function"?n(r):n;r=Object.assign({},r,a),e.forEach(o=>{o(r)})},get listeners(){return e},on(n){if(!e.has(n))return e.add(n),()=>e.delete(n)},off(n){return e.delete(n)}};function t(n){n=typeof n=="function"?n:o=>o;const a=s.useReducer(o=>o+1,0)[1];return s.useEffect(()=>{const o=()=>a();return e.add(o),()=>e.delete(o)},[]),n(i.getState())}return[t,i]},{useEffect:se,useState:oe}=s,[re,y]=ne({toasts:[]}),u=new class{Toasts={_api:y,get RunningToasts(){return y.getState(r=>r.toasts)},Toast:function(e){const{children:i=[],avatar:t,id:n,author:a,onClick:o=p=>{},color:v,time:d=3e3,onManualClose:x,icon:w}=e,[c,h]=oe(!1);se(p=>{c&&(y.setState(g=>{const L=g.toasts.findIndex(le=>le.id===n);return L<0||g.toasts.splice(L,1),g}),e.onClose&&e.onClose())},[c]);const R=ie({from:{progress:0,scale:c?1:0},to:{progress:100,scale:c?0:1},onRest:p=>{h(!0)},config:p=>{let g=d;return p==="scale"&&(g=100),{duration:g}}});return s.createElement(z.div,{className:"qwert-toast",id:n,onMouseOver:p=>{R.progress.pause()},onMouseOut:p=>{R.progress.resume()},style:{scale:R.scale.to(p=>p)},children:[w&&s.createElement("div",{className:"qwert-toast-icon-container",children:w}),t&&s.createElement("div",{className:"qwert-toast-avatar-container",children:s.createElement("img",{src:t,className:"qwert-toast-avatar"})}),s.createElement("div",{onClick:function(){o(),h(!0)}},a&&s.createElement("strong",{className:"qwert-toast-author"},a),s.createElement("div",{className:`qwert-toast-text ${T.flex} ${T.horizontal} ${T.noWrap} ${T.justifyStart}`},i)),s.createElement(z.div,{className:"qwert-toast-bar",style:{width:R.progress.to(p=>`${p}%`),background:v??m.brand}}),s.createElement("svg",{className:"qwert-toast-close",width:"16",height:"16",viewBox:"0 0 24 24",onClick:function(){x&&x(),h(!0)}},s.createElement(A))]})},detroy(r){const e=y.getState().toasts,i=e.find(t=>t.id===r);if(!i||!i.ref.current)return!1;i.ref.current.close(),e.toasts.splice(e.toasts.indexOf(i),1),y.setState({toasts})},create(r,e){const i=u.createUUID();return y.setState(t=>({toasts:t.toasts.concat({children:r,...e,id:i})})),i},initialize(){const r=document.createElement("div");r.className="qwert-toasts";function e(){return re(t=>t.toasts).map(t=>s.createElement(u.Toasts.Toast,{...t,key:t.id}))}_.render(s.createElement(e,{}),r),!document.querySelector(".qwert-toasts")&&document.getElementById("app-mount").appendChild(r)},shutdown(){const r=document.getElementsByClassName("qwert-toasts")[0];_.unmountComponentAtNode(r),r.remove()}};createUUID(){return"xxxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g,function(r){var e=Math.random()*16|0,i=r=="x"?e:e&3|8;return i.toString(16)})}initialize(){this.Toasts.initialize()}shutdown(){this.Toasts.shutdown()}};class ae extends b{constructor(){super(),this.getSettingsPanel=()=>this.buildSettingsPanel().getElement();const e=this.onMessage.bind(this);this.onMessage=t=>{try{e(t)}catch(n){console.log("%c[InAppNotifications]%c Error!%c","color: #3a71c1;","font-weight: 700; color: #b3001b;",`
`,n);try{u.Toasts.create(`There was an error while trying to start the plugin.
 Try checking the console for any erros from this plugin.
For any further support, click here to join my support server.`,{author:"In App Notifications",color:m.dnd,icon:s.createElement(A,{style:{color:m.dnd}}),time:7e3,onClick:()=>{U.acceptInviteAndTransitionToInviteChannel("zMnHFAKsu3")}})}catch{BdApi.alert("InAppNotifications",`There was an error while trying to start the plugin.
 Try checking the console for any erros from this plugin.
For any further support, join my support server (https://discord.gg/zJbXFXNAhJ)`)}}};const i=this.friendRequest.bind(this);this.friendRequest=t=>{try{i(t)}catch(n){console.log("%c[InAppNotifications]%c Error!%c","color: #3a71c1;","font-weight: 700; color: #b3001b;",`
`,n);try{u.Toasts.create(`There was an error while trying to start the plugin.
 Try checking the console for any erros from this plugin.
For any further support, click here to join my support server.`,{author:"In App Notifications",icon:s.createElement(A,{style:{color:m.dnd}}),time:7e3,onClick:()=>{U.acceptInviteAndTransitionToInviteChannel("zMnHFAKsu3")}})}catch{BdApi.alert("InAppNotifications",`There was an error while trying to start the plugin.
 Try checking the console for any erros from this plugin.
For any further support, join my support server (https://discord.gg/zJbXFXNAhJ)`)}}}}onStart(){S.subscribe("MESSAGE_CREATE",this.onMessage),S.subscribe("FRIEND_REQUEST_ACCEPTED",this.friendRequest),u.initialize(),P.addStyle("QWERTLib",`
            .qwert-toasts {
                position: absolute;
                right: 10px;
                left: ${[0,1].includes(this.settings.position)?"20px":"10px"};
                right: 10px;
                ${[0,1].includes(this.settings.position)?"top: 10px":"bottom: 30px;"}
                justify-content: flex-start;
                align-items: ${[0,2].includes(this.settings.position)?"flex-end":"flex-start"};
                display: flex;
                flex-direction: column;
                pointer-events: none;
                z-index: 9999;
               }
               .qwert-toast {
                position: relative;
                display: -webkit-inline-box;
                pointer-events: all;
                align-items: center;
                min-height: 24px;
                backdrop-filter: blur(5px);
                border-radius: 3px;
                box-shadow: var(--elevation-medium);
                padding: 10px 12px 10px 10px;
                max-width: 50vw;
                opacity: 1;
                margin-top: 10px;
                color: white;
                background: rgba(10,10,10,0.5);
                overflow: hidden;
                cursor: pointer;
               }
               .qwert-toast:hover .qwert-toast-image {
                display: block;
               }
               .qwert-toast-image {  
                position: relative;
                display: none;
                pointer-events: all;
                min-height: 24px;
                max-width: 50vw;
                margin-top: 2px;
                max-width: 300px;
                max-height: 300px;
               }
               
               .qwert-toast-text {
                position: relative;
                display: block;
                max-width: 400px;
                flex: 1 0 auto;
                font-size: 14px;
                font-weight: 500;
                white-space: nowrap;
                word-wrap: break-word;
                overflow: hidden;
                text-overflow: ellipsis;     
               }
               .qwert-toast:hover .qwert-toast-text {
                white-space: normal;
               }
               .qwert-toast-author {
                font-size: 14px;
                max-width: 400px;
                max-height: 24px;
                white-space: nowrap;
                word-wrap: break-word;
                text-overflow: ellipsis;
                margin-bottom: 2px;
               }
               .qwert-toast-bar {
                height: 3px;
                position: absolute;
                bottom: 0;
                left: 0;
               }
               .qwert-toast-avatar {
                height: 22px;
                height: 22px;
                border-radius: 50%;
               }
               .qwert-toast-avatar-container {
                padding-right: 5px;
                margin-top: 1px;
                top: 10px;
               }
               .qwert-toast-icon {
                height: 22px;
                height: 22px;
                border-radius: 50%;
                  }
      
               .qwert-toast-icon-container {
                padding-right: 5px;
                margin-top: 1px;
                top: 10px;
               }
               .qwert-toast-close {
                margin-left: 5px;
                cursor: pointer;
               }
            }`)}onMessage({message:e}){const i=f.getUser(e.author.id),t=Q.getChannel(e.channel_id),n=e.attachments.filter(c=>typeof c?.content_type=="string"&&c?.content_type.startsWith("image")),a=this.settings.notiTime;if(!t||t.id===X.getChannelId())return!1;let o;const v=this.checkKeywords(e);if(!this.supposedToNotify(e,t)&&!v)return;let d="";if(t.guild_id){const c=J.getGuild(t.guild_id),h=H.getMember(t.guild_id,i.id)?.colorString;this.settings.roleColor&&h?d=[s.createElement("div",{style:{color:h??"white",display:"inline"}},i.tag),` (${c.name}, #${t.name})`]:d=`${i.tag} (${c.name}, #${t.name})`}if(t.type===E.GROUP_DM&&(d=`${i.tag} (${t.name})`,(!t.name||t.name===" "||t.name==="")&&(d=`${i.tag} (${t.rawRecipients.map(c=>c.username).join(", ")})`)),t.type===E.DM&&(d=`${i.tag}`),e.call&&(o=[s.createElement(Y,{style:{height:"16px",width:"16px",color:m.online,marginRight:"2px"}}),"Started a call"]),e.attachments.length!==0&&(o=[s.createElement(k,{style:{height:"16px",width:"16px",marginRight:"2px"}}),D.parse(e.content,"div",{channelId:t.id})],e.content===""&&(o=[s.createElement(k,{style:{height:"16px",width:"16px",marginRight:"2px"}}),"Attachment"])),e.embeds.length!==0&&(o=[s.createElement(k,{style:{height:"16px",width:"16px",marginRight:"2px"}}),D.parse(e.content,"div",{channelId:t.id})],e.content===""&&(o=[s.createElement(k,{style:{height:"16px",width:"16px",marginRight:"2px"}}),e.embeds[0].description!==""?e.embeds[0].description:"Embed"])),e.stickers&&(o=[s.createElement($,{style:{height:"16px",width:"16px",marginRight:"2px"}}),D.parse(e.content,"div",{channelId:t.id})],e.content===""&&(o=[s.createElement($,{style:{height:"16px",width:"16px",marginRight:"2px"}}),"Sticker"])),n[0]&&o.push(s.createElement("img",{className:"qwert-toast-image",src:n[0].url,style:{maxWidth:"300px",maxHeight:"300px"}})),!this.checkSettings(e,t))return;const x=o||D.parse(e.content,"div",{channelId:t.id}),w=isNaN(a*1e3)?3e3:a*1e3;u.Toasts.create(x,{icon:s.createElement(F.default,{src:i.getAvatarURL(),status:C.getStatus(i.id),size:F.Sizes.SIZE_32,isMobile:C.isMobileOnline(i.id)}),author:d,time:w,onClick:()=>{K.replaceWith(`/channels/${e.guild_id||"@me"}/${e.channel_id}/${e.id}`)},onManualClose:()=>{!this.settings.markAsRead||V.ack(e.channel_id)}})}escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}checkKeywords(e){let i=!1;const{content:t}=e,n=this.settings.keywords.trim().split(",").map(a=>a.trim()).filter(a=>a!=="");if(n.length===0)return!1;for(let a of n)if(a=this.escapeRegex(a),new RegExp(`\\b${a}\\b`,"g").test(this.settings.case?t:t.toLowerCase())){i=!0;break}return i}supposedToNotify(e,i){if(e.author.id===f.getCurrentUser().id)return!1;const t=N.isSuppressEveryoneEnabled(e.guild_id||"@me"),n=N.isSuppressRolesEnabled(e.guild_id||"@me");if(N.allowAllMessages(i))return!0;try{return B.isRawMessageMentioned(e,f.getCurrentUser().id,t,n)}catch{return B.isRawMessageMentioned({rawMessage:e,userId:f.getCurrentUser().id,suppressEveryone:t,suppressRoles:n})}}checkSettings(e,i){let t=!0;const n=this.settings.ignoredUsers.trim().split(","),a=this.settings.ignoredServers.trim().split(","),o=this.settings.ignoredChannels.trim().split(","),v=this.settings.ignoreDMs,d=this.settings.ignoreDMGroups,x=this.settings.disableOnDnd,w=C.getStatus(f.getCurrentUser().id)==="dnd",c=this.settings.disableIfNoFocus,h=document.hasFocus();return x&&(t=!w),c&&(h||(t=!1)),v&&i.type===E.DM&&(t=!1),d&&i.type===E.GROUP_DM&&(t=!1),n.includes(e.author.id)&&(t=!1),a.includes(i.guild_id)&&(t=!1),o.includes(i.id)&&(t=!1),t}friendRequest({user:e}){!this.settings.relationshipsNotis||(e=f.getUser(e.id),u.Toasts.create([s.createElement(ee,{style:{height:"16px",width:"16px",color:m.online,marginRight:"2px"}}),"Accepted your friend request."],{author:e.tag,avatar:e.getAvatarURL(),onClick:()=>{Z.open(e.id)}}))}onStop(){S.unsubscribe("MESSAGE_CREATE",this.onMessage),S.unsubscribe("FRIEND_REQUEST_ACCEPTED",this.friendRequest),P.removeStyle("QWERTLib"),u.shutdown(),G.unpatchAll()}}return ae})(global.ZeresPluginLibrary.buildPlugin(q)):class{constructor(){this._config=q}load(){BdApi.showConfirmationModal("Library plugin is needed","The library plugin needed for AQWERT'sPluginBuilder is missing. Please click Download Now to install it.",{confirmText:"Download",cancelText:"Cancel",onConfirm:()=>{j.get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js",(b,I,M)=>{if(b)return electron.shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");O.writeFileSync(W.join(BdApi.Plugins.folder,"0PluginLibrary.plugin.js"),M)})}})}start(){}stop(){}}})();
