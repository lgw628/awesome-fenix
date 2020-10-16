(window.webpackJsonp=window.webpackJsonp||[]).push([[135],{640:function(t,e,r){"use strict";r.r(e);var n=r(11),i=Object(n.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"容器持久化存储"}},[t._v("容器持久化存储")]),t._v(" "),r("p",[t._v("容器实质上是镜像的运行时实例，为了保证镜像能够重复地产生出一致的运行时实例，必须要求镜像是持久而稳定的，在容器中发生的一切数据变动操作都不能真正地写入到镜像之中，否则就会破坏镜像的持久和稳定的性质。因此，容器中的数据修改操作，都是基于"),r("a",{attrs:{href:"https://en.wikipedia.org/wiki/Copy-on-write",target:"_blank",rel:"noopener noreferrer"}},[t._v("写入时复制"),r("OutboundLink")],1),t._v("（Copy-on-Write）策略来实现的，容器会利用"),r("a",{attrs:{href:"https://en.wikipedia.org/wiki/OverlayFS",target:"_blank",rel:"noopener noreferrer"}},[t._v("叠加式文件系统"),r("OutboundLink")],1),t._v("（OverlayFS）的特性，当需要对根镜像进行修改时，容器会将变更内容写入到独立区域并“覆盖”原有内容。这种改动通常都是临时的，当容器被删除时，这些改动也将一并移除，不复存在。因此，如果不进行额外的处理，容器默认是没有永久存储的。")]),t._v(" "),r("p",[t._v("而另一方面，容器作为信息系统的运行载体，必定会产生出有价值的、应该被持久保存的信息，譬如扮演数据库角色的容器，大概没有什么数据库能够接受像缓存服务一样重启之后数据会全部丢失；多个容器之间也往往需要通过共享存储来实现某些交互，譬如"),r("RouterLink",{attrs:{to:"/immutable-infrastructure/container/container-build-system.html"}},[t._v("以前")]),t._v("曾经举过的例子，Nginx容器产生日志、Filebeat容器收集日志，两者就需要共享同一块存储区域才能协同工作。因此便有了本节的话题，容器的持久化存储。")],1)])}),[],!1,null,null,null);e.default=i.exports}}]);