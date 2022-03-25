(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{460:function(_,v,t){_.exports=t.p+"assets/img/hop1.93a7f1c6.png"},647:function(_,v,t){"use strict";t.r(v);var e=t(11),r=Object(e.a)({},(function(){var _=this,v=_.$createElement,e=_._self._c||v;return e("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[e("h1",{attrs:{id:"流量控制"}},[_._v("流量控制")]),_._v(" "),e("p",[_._v("任何一个系统的运算、存储、网络资源都不是无限的，当系统资源不足以支撑外部超过预期的突发流量时，便应该要有取舍，建立面对超额流量自我保护的机制，这个机制就是微服务中常说的“限流”。在介绍限流具体细节前，我们先一起来做一道小学三年级难度的算术四则运算场景应用题：")]),_._v(" "),e("blockquote",[e("p",[e("strong",[_._v("场景应用题")])]),_._v(" "),e("p",[_._v("已知条件：")]),_._v(" "),e("ol",[e("li",[_._v("系统中一个业务操作需要调用 10 个服务协作来完成")]),_._v(" "),e("li",[_._v("该业务操作的总超时时间是 10 秒")]),_._v(" "),e("li",[_._v("每个服务的处理时间平均是 0.5 秒")]),_._v(" "),e("li",[_._v("集群中每个服务均部署了 20 个实例 副本")])]),_._v(" "),e("p",[_._v("求解以下问题：")]),_._v(" "),e("ul",[e("li",[_._v("单个用户访问，完成一次业务操作，需要耗费系统多少处理器时间？"),e("br"),_._v("答：0.5 × 10 = 5 Sec "),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/CPU_time",target:"_blank",rel:"noopener noreferrer"}},[_._v("CPU Time"),e("OutboundLink")],1)]),_._v(" "),e("li",[_._v("集群中每个服务每秒最大能处理多少个请求？"),e("br"),_._v("答：(1 ÷ 0.5) × 20 = 40 "),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Queries_per_second",target:"_blank",rel:"noopener noreferrer"}},[_._v("QPS"),e("OutboundLink")],1)]),_._v(" "),e("li",[_._v("假设不考虑顺序且请求分发是均衡的，在保证不超时的前提下，整个集群能持续承受最多每秒多少笔业务操作？"),e("br"),_._v("答：40 × 10 ÷ 5 = 80 "),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Transactions_per_second",target:"_blank",rel:"noopener noreferrer"}},[_._v("TPS"),e("OutboundLink")],1)]),_._v(" "),e("li",[_._v("如果集群在一段时间内持续收到 100 TPS 的业务请求，会出现什么情况？"),e("br"),_._v("答：这就超纲了小学水平，得看你们家架构师的本事了。")])])]),_._v(" "),e("p",[_._v("对于最后这个问题，如果仍然按照小学生的解题思路，最大处理能力为 80 TPS 的系统遇到 100 TPS 的请求，应该能完成其中的 80 TPS，也即是只有 20 TPS 的请求失败或被拒绝才对，然而这其实是最理想的情况，也是我们追求的目标。事实上，如果不做任何处理的话，更可能出现的结果是这 100 个请求中的每一个都开始了处理，但是大部分请求完成了其中 10 次服务调用中的 8 次或者 9 次，然后就超时没有然后了。多数服务调用都白白浪费掉，没有几个请求能够走完整笔业务操作。譬如早期的 12306 系统就明显存在这样的问题，全国人民都上去抢票的结果是全国人民谁都买不上票。为了避免这种状况出现，一个健壮的系统需要做到恰当的流量控制，更具体地说，需要妥善解决以下三个问题：")]),_._v(" "),e("ul",[e("li",[e("strong",[_._v("依据什么限流？")]),_._v("：要不要控制流量，要控制哪些流量，控制力度要有多大，等等这些操作都没法在系统设计阶段静态地给出确定的结论，必须根据系统此前一段时间的运行状况，甚至未来一段时间的预测情况来动态决定。")]),_._v(" "),e("li",[e("strong",[_._v("具体如何限流？")]),_._v("：解决系统具体是如何做到允许一部分请求能够通行，而另外一部分流量实行受控制的失败降级，这必须了解掌握常用的服务限流算法和设计模式。")]),_._v(" "),e("li",[e("strong",[_._v("超额流量如何处理？")]),_._v("：超额流量可以有不同的处理策略，也许会直接返回失败（如 429 Too Many Requests），或者被迫使它们进入降级逻辑，这种被称为否决式限流。也可能让请求排队等待，暂时阻塞一段时间后继续处理，这种被称为阻塞式限流。")])]),_._v(" "),e("h2",{attrs:{id:"流量统计指标"}},[_._v("流量统计指标")]),_._v(" "),e("p",[_._v("要做流量控制，首先要弄清楚到底哪些指标能反映系统的流量压力大小。相较而言，容错的统计指标是明确的，容错的触发条件基本上只取决于请求的故障率，发生失败、拒绝与超时都算作故障；但限流的统计指标就不那么明确了，限流中的“流”到底指什么呢？要解答这个问题，我们先来理清经常用于衡量服务流量压力，但又较容易混淆的三个指标的定义：")]),_._v(" "),e("ul",[e("li",[e("strong",[_._v("每秒事务数")]),_._v("（Transactions per Second，TPS）：TPS 是衡量信息系统吞吐量的最终标准。“事务”可以理解为一个逻辑上具备原子性的业务操作。譬如你在 Fenix's Bookstore 买了一本书，将要进行支付，“支付”就是一笔业务操作，支付无论成功还是不成功，这个操作在逻辑上是原子的，即逻辑上不可能让你买本书还成功支付了前面 200 页，又失败了后面 300 页。")]),_._v(" "),e("li",[e("strong",[_._v("每秒请求数")]),_._v("（Hits per Second，HPS）：HPS 是指每秒从客户端发向服务端的请求数（请将 Hits 理解为 Requests 而不是 Clicks，国内某些翻译把它理解为“每秒点击数”多少有点望文生义的嫌疑）。如果只要一个请求就能完成一笔业务，那 HPS 与 TPS 是等价的，但在一些场景（尤其常见于网页中）里，一笔业务可能需要多次请求才能完成。譬如你在 Fenix's Bookstore 买了一本书要进行支付，尽管逻辑上它是原子的，但技术实现上，除非你是直接在银行开的商城中购物能够直接扣款，否则这个操作就很难在一次请求里完成，总要经过显示支付二维码、扫码付款、校验支付是否成功等过程，中间不可避免地会发生多次请求。")]),_._v(" "),e("li",[e("strong",[_._v("每秒查询数")]),_._v("（Queries per Second，QPS）：QPS 是指一台服务器能够响应的查询次数。如果只有一台服务器来应答请求，那 QPS 和 HPS 是等价的，但在分布式系统中，一个请求的响应往往要由后台多个服务节点共同协作来完成。譬如你在 Fenix's Bookstore 买了一本书要进行支付，尽管扫描支付二维码时客户端只发送了一个请求，但这背后服务端很可能需要向仓储服务确认库存信息避免超卖、向支付服务发送指令划转货款、向用户服务修改用户的购物积分，等等，这里面每次内部访问都要消耗掉一次或多次查询数。")])]),_._v(" "),e("p",[_._v("以上这三个指标都是基于调用计数的指标，在整体目标上我们当然最希望能够基于 TPS 来限流，因为信息系统最终是为人类用户来提供服务的，用户不关心业务到底是由多少个请求、多少个后台查询共同协作来实现。但是，系统的业务五花八门，不同的业务操作对系统的压力往往差异巨大，不具备可比性；而更关键的是，流量控制是针对用户实际操作场景来限流的，这不同于压力测试场景中无间隙（最多有些集合点）的全自动化操作，真实业务操作的耗时无可避免地受限于用户交互带来的不确定性，譬如前面例子中的“扫描支付二维码”这个步骤，如果用户掏出手机扫描二维码前先顺便回了两条短信息，那整个付款操作就要持续更长时间。此时，如果按照业务开始时计数器加 1，业务结束时计数器减 1，通过限制最大 TPS 来限流的话，就不能准确地反应出系统所承受的压力，所以直接针对 TPS 来限流实际上是很难操作的。")]),_._v(" "),e("p",[_._v("目前，主流系统大多倾向使用 HPS 作为首选的限流指标，它是相对容易观察统计的，而且能够在一定程度上反应系统当前以及接下来一段时间的压力。但限流指标并不存在任何必须遵循的权威法则，根据系统的实际需要，哪怕完全不选择基于调用计数的指标都是有可能的。譬如下载、视频、直播等 I/O 密集型系统，往往会把每次请求和响应报文的大小，而不是调用次数作为限流指标，譬如只允许单位时间通过 100MB 的流量。又譬如网络游戏等基于长连接的应用，可能会把登陆用户数作为限流指标，热门的网游往往超过一定用户数就会让你在登陆前排队等候。")]),_._v(" "),e("h2",{attrs:{id:"限流设计模式"}},[_._v("限流设计模式")]),_._v(" "),e("p",[_._v("与容错模式类似，对于具体如何进行限流，也有一些常见常用的设计模式可以参考使用，本节将介绍"),e("strong",[_._v("流量计数器")]),_._v("、"),e("strong",[_._v("滑动时间窗")]),_._v("、"),e("strong",[_._v("漏桶")]),_._v("和"),e("strong",[_._v("令牌桶")]),_._v("四种限流设计模式。")]),_._v(" "),e("h3",{attrs:{id:"流量计数器模式"}},[_._v("流量计数器模式")]),_._v(" "),e("p",[_._v("做限流最容易想到的一种方法就是设置一个计算器，根据当前时刻的流量计数结果是否超过阈值来决定是否限流。譬如前面场景应用题中，我们计算得出了该系统能承受的最大持续流量是 80 TPS，那就控制任何一秒内，发现超过 80 次业务请求就直接拒绝掉超额部分。这种做法很直观，也确实有些简单的限流就是这么实现的，但它并不严谨，以下两个结论就很可能出乎对限流算法没有了解的同学意料之外：")]),_._v(" "),e("ol",[e("li",[_._v("即使每一秒的统计流量都没有超过 80 TPS，也不能说明系统没有遇到过大于 80 TPS 的流量压力。"),e("br"),_._v("你可以想像如下场景，如果系统连续两秒都收到 60 TPS 的访问请求，但这两个 60 TPS 请求分别是前 1 秒里面的后 0.5 秒，以及后 1 秒中的前面 0.5 秒所发生的。这样虽然每个周期的流量都不超过 80 TPS 请求的阈值，但是系统确实曾经在 1 秒内实在在发生了超过阈值的 120 TPS 请求。")]),_._v(" "),e("li",[_._v("即使连续若干秒的统计流量都超过了 80 TPS，也不能说明流量压力就一定超过了系统的承受能力。"),e("br"),_._v("你可以想像如下场景，如果 10 秒的时间片段中，前 3 秒 TPS 平均值到了 100，而后 7 秒的平均值是 30 左右，此时系统是否能够处理完这些请求而不产生超时失败？答案是可以的，因为条件中给出的超时时间是 10 秒，而最慢的请求也能在 8 秒左右处理完毕。如果只基于固定时间周期来控制请求阈值为 80 TPS，反而会误杀一部分请求，造成部分请求出现原本不必要的失败。")])]),_._v(" "),e("p",[_._v("流量计数器的缺陷根源在于它只是针对时间点进行离散的统计，为了弥补该缺陷，一种名为“滑动时间窗”的限流模式被设计出来，它可以实现平滑的基于时间片段统计。")]),_._v(" "),e("h3",{attrs:{id:"滑动时间窗模式"}},[_._v("滑动时间窗模式")]),_._v(" "),e("p",[e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Sliding_window_protocol",target:"_blank",rel:"noopener noreferrer"}},[_._v("滑动窗口算法"),e("OutboundLink")],1),_._v("（Sliding Window Algorithm）在计算机科学的很多领域中都有成功的应用，譬如编译原理中的"),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Peephole_optimization",target:"_blank",rel:"noopener noreferrer"}},[_._v("窥孔优化"),e("OutboundLink")],1),_._v("（Peephole Optimization）、TCP 协议的流量控制（Flow Control）等都使用到滑动窗口算法。对分布式系统来说，无论是服务容错中对服务响应结果的统计，还是流量控制中对服务请求数量的统计，都经常要用到滑动窗口算法。关于这个算法的运作过程，建议你能发挥想象力，在脑海中构造如下场景：在不断向前流淌的时间轴上，漂浮着一个固定大小的窗口，窗口与时间一起平滑地向前滚动。任何时刻静态地通过窗口内观察到的信息，都等价于一段长度与窗口大小相等、动态流动中时间片段的信息。由于窗口观察的目标都是时间轴，所以它被称为形象地称为“滑动时间窗模式”。")]),_._v(" "),e("p",[_._v("举个更具体的例子，假如我们准备观察时间片段为 10 秒，并以 1 秒为统计精度的话，那可以设定一个长度为 10 的数组（设计通常是以双头队列去实现，这里简化一下）和一个每秒触发 1 次的定时器。假如我们准备通过统计结果进行限流和容错，并定下限流阈值是最近 10 秒内收到的外部请求不要超过 500 个，服务熔断的阈值是最近 10 秒内故障率不超过 50%，那每个数组元素（图中称为 Buckets）中就应该存储请求的总数（实际是通过明细相加得到）及其中成功、失败、超时、拒绝的明细数，具体如下图所示。")]),_._v(" "),e("div",{staticClass:"custom-block center"},[e("p",[e("img",{attrs:{src:t(460),alt:""}}),_._v("\n滑动窗口模式示意（"),e("a",{attrs:{href:"https://github.com/Netflix/Hystrix/wiki",target:"_blank",rel:"noopener noreferrer"}},[_._v("图片来自 Hystrix 使用文档"),e("OutboundLink")],1),_._v("）")])]),_._v(" "),e("blockquote",[e("p",[_._v("文中虽然引用了 Hystrix 文档的图片，但 Hystrix 实际上是基于 RxJava 实现的，RxJava 的响应式编程思路与下面描述差异颇大。笔者的本意并不是去讨论某一款流量治理工具的具体实现细节，以下描述的步骤作为原理来理解是合适的。")])]),_._v(" "),e("p",[_._v("当频率固定每秒一次的定时器被唤醒时，它应该完成以下几项工作，这也就是滑动时间窗的工作过程：")]),_._v(" "),e("ol",[e("li",[_._v("将数组最后一位的元素丢弃掉，并把所有元素都后移一位，然后在数组第一个插入一个新的空元素。这个步骤即为“滑动窗口”。")]),_._v(" "),e("li",[_._v("将计数器中所有统计信息写入到第一位的空元素中。")]),_._v(" "),e("li",[_._v("对数组中所有元素进行统计，并复位清空计数器数据供下一个统计周期使用。")])]),_._v(" "),e("p",[_._v("滑动时间窗口模式的限流完全解决了流量计数器的缺陷，可以保证任意时间片段内，只需经过简单的调用计数比较，就能控制住请求次数一定不会超过限流的阈值，在单机限流或者分布式服务单点网关中的限流中很常用。不过，这种限流也有其缺点，它通常只适用于否决式限流，超过阈值的流量就必须强制失败或降级，很难进行阻塞等待处理，也就很难在细粒度上对流量曲线进行整形，起不到削峰填谷的作用。下面笔者继续介绍两种适用于阻塞式限流的限流模式。")]),_._v(" "),e("h3",{attrs:{id:"漏桶模式"}},[_._v("漏桶模式")]),_._v(" "),e("p",[_._v("在计算机网络中，专门有一个术语"),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Traffic_shaping",target:"_blank",rel:"noopener noreferrer"}},[_._v("流量整形"),e("OutboundLink")],1),_._v("（Traffic Shaping）用来描述如何限制网络设备的流量突变，使得网络报文以比较均匀的速度向外发送。 流量整形通常都需要用到缓冲区来实现，当报文的发送速度过快时，首先在缓冲区中暂存，然后再在控制算法的调节下均匀地发送这些被缓冲的报文。常用的控制算法有"),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Leaky_bucket",target:"_blank",rel:"noopener noreferrer"}},[_._v("漏桶算法"),e("OutboundLink")],1),_._v("（Leaky Bucket Algorithm）和"),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Token_bucket",target:"_blank",rel:"noopener noreferrer"}},[_._v("令牌桶算法"),e("OutboundLink")],1),_._v("（Token Bucket Algorithm）两种，这两种算法的思路截然相反，但达到的效果又是相似的。")]),_._v(" "),e("p",[_._v("所谓漏桶，就是大家小学做应用题时一定遇到过的“一个水池，每秒以 X 升速度注水，同时又以 Y 升速度出水，问水池啥时候装满”的那个奇怪的水池。你把请求当作水，水来了都先放进池子里，水池同时又以额定的速度出水，让请求进入系统中。这样，如果一段时间内注水过快的话，水池还能充当缓冲区，让出水口的速度不至于过快。不过，由于请求总是有超时时间的，所以缓冲区大小也必须是有限度的，当注水速度持续超过出水速度一段时间以后，水池终究会被灌满，此时，从网络的流量整形的角度看是体现为部分数据包被丢弃，而在信息系统的角度看就体现为有部分请求会遭遇失败和降级。")]),_._v(" "),e("p",[_._v("漏桶在代码实现上非常简单，它其实就是一个以请求对象作为元素的先入先出队列（FIFO Queue），队列长度就相当于漏桶的大小，当队列已满时便拒绝新的请求进入。漏桶实现起来很容易，困难在于如何确定漏桶的两个参数：桶的大小和水的流出速率。如果桶设置得太大，那服务依然可能遭遇到流量过大的冲击，不能完全发挥限流的作用；如果设置得太小，那很可能就会误杀掉一部分正常的请求，这种情况与流量计数器模式中举过的例子是一样的。流出速率在漏桶算法中一般是个固定值，对本节开头场景应用题中那样固定拓扑结构的服务是很合适的，但同时你也应该明白那是经过最大限度简化的场景，现实中系统的处理速度往往受到其内部拓扑结构变化和动态伸缩的影响，所以能够支持变动请求处理速率的令牌桶算法往往可能会是更受程序员青睐的选择。")]),_._v(" "),e("h3",{attrs:{id:"令牌桶模式"}},[_._v("令牌桶模式")]),_._v(" "),e("p",[_._v("如果说漏桶是小学应用题中的奇怪水池，那令牌桶就是你去银行办事时摆在门口的那台排队机。它与漏桶一样都是基于缓冲区的限流算法，只是方向刚好相反，漏桶是从水池里往系统出水，令牌桶则是系统往排队机中放入令牌。")]),_._v(" "),e("p",[_._v("假设我们要限制系统在 X 秒内最大请求次数不超过 Y，那就每间隔 X/Y 时间就往桶中放一个令牌，当有请求进来时，首先要从桶中取得一个准入的令牌，然后才能进入系统处理。任何时候，一旦请求进入桶中却发现没有令牌可取了，就应该马上失败或进入服务降级逻辑。与漏桶类似，令牌桶同样有最大容量，这意味着当系统比较空闲时，桶中令牌累积到一定程度就不再无限增加，预存在桶中的令牌便是请求最大缓冲的余量。上面这段话，可以转化为以下步骤来指导程序编码：")]),_._v(" "),e("ol",[e("li",[_._v("让系统以一个由限流目标决定的速率向桶中注入令牌，譬如要控制系统的访问不超过 100 次，速率即设定为 1/100=10 毫秒。")]),_._v(" "),e("li",[_._v("桶中最多可以存放 N 个令牌，N 的具体数量是由超时时间和服务处理能力共同决定的。如果桶已满，第 N+1 个进入的令牌会被丢弃掉。")]),_._v(" "),e("li",[_._v("请求到时先从桶中取走 1 个令牌，如果桶已空就进入降级逻辑。")])]),_._v(" "),e("p",[_._v("令牌桶模式的实现看似比较复杂，每间隔固定时间就要放新的令牌到桶中，但其实并不需要真的用一个专用线程或者定时器来做这件事情，只要在令牌中增加一个时间戳记录，每次获取令牌前，比较一下时间戳与当前时间，就可以轻易计算出这段时间需要放多少令牌进去，然后一次性放入即可，所以真正编码并不会显得复杂。")]),_._v(" "),e("h2",{attrs:{id:"分布式限流"}},[_._v("分布式限流")]),_._v(" "),e("p",[_._v("这节我们再向实际的信息系统前进一步，讨论分布式系统中的限流问题。此前，我们讨论的限流算法和模式全部是针对整个系统的限流，总是有意无意地假设或默认系统只提供一种业务操作，或者所有业务操作的消耗都是等价的，并不涉及到不同业务请求进入系统的服务集群后，分别会调用哪些服务、每个服务节点处理能力有何差别等问题。前面讨论过的那些限流算法，直接使用在单体架构的集群上是完全可行的，但到了微服务架构下，它们就最多只能应用于集群最入口处的网关上，对整个服务集群进行流量控制，而无法细粒度地管理流量在内部微服务节点中的流转情况。所以，我们把前面介绍的限流模式都统称为单机限流，把能够精细控制分布式集群中每个服务消耗量的限流算法称为分布式限流。")]),_._v(" "),e("p",[_._v("这两种限流算法实现上的核心差别在于如何管理限流的统计指标，单机限流很好办，指标都是存储在服务的内存当中，而分布式限流的目的就是要让各个服务节点的协同限流，无论是将限流功能封装为专门的远程服务，抑或是在系统采用的分布式框架中有专门的限流支持，都需要将原本在每个服务节点自己内存当中的统计数据给开放出来，让全局的限流服务可以访问到才行。")]),_._v(" "),e("p",[_._v("一种常见的简单分布式限流方法是将所有服务的统计结果都存入集中式缓存（如 Redis）中，以实现在集群内的共享，并通过分布式锁、信号量等机制，解决这些数据的读写访问时并发控制的问题。在可以共享统计数据的前提下，原本用于单机的限流模式理论上也是可以应用于分布式环境中的，可是其代价也显而易见：每次服务调用都必须要额外增加一次网络开销，所以这种方法的效率肯定是不高的，流量压力大时，限流本身反倒会显著降低系统的处理能力。")]),_._v(" "),e("p",[_._v("只要集中式存储统计信息，就不可避免地会产生网络开销，为了缓解这里产生的性能损耗，一种可以考虑的办法是在令牌桶限流模式基础上进行“货币化改造”，即不把令牌看作是只有准入和不准入的“通行证”，而看作数值形式的“货币额度”。当请求进入集群时，首先在 API 网关处领取到一定数额的“货币”，为了体现不同等级用户重要性的差别，他们的额度可以有所差异，譬如让 VIP 用户的额度更高甚至是无限的。我们将用户 A 的额度表示为 Quanity"),e("sub",[_._v("A")]),_._v("。由于任何一个服务在响应请求时都需要消耗集群一定量的处理资源，所以访问每个服务时都要求消耗一定量的“货币”，假设服务 X 要消耗的额度表示为 Cost"),e("sub",[_._v("X")]),_._v("，那当用户 A 访问了 N 个服务以后，他剩余的额度 Limit"),e("sub",[_._v("N")]),_._v("即表示为：")]),_._v(" "),e("div",{staticClass:"custom-block center"},[e("blockquote",[e("p",[_._v("Limit"),e("sub",[_._v("N")]),_._v(" = Quanity"),e("sub",[_._v("A")]),_._v(" - ∑"),e("sup",[_._v("N")]),_._v("Cost"),e("sub",[_._v("X")])])])]),_._v(" "),e("p",[_._v("此时，我们可以把剩余额度 Limit"),e("sub",[_._v("N")]),_._v("作为内部限流的指标，规定在任何时候，只要一旦剩余额度 Limit"),e("sub",[_._v("N")]),_._v("小于等于 0 时，就不再允许访问其他服务了。此时必须先发生一次网络请求，重新向令牌桶申请一次额度，成功后才能继续访问，不成功则进入降级逻辑。除此之外的任何时刻，即 Limit"),e("sub",[_._v("N")]),_._v("不为零时，都无须额外的网络访问，因为计算 Limit"),e("sub",[_._v("N")]),_._v("是完全可以在本地完成的。")]),_._v(" "),e("p",[_._v("基于额度的限流方案对限流的精确度有一定的影响，可能存在业务操作已经进行了一部分服务调用，却无法从令牌桶中再获取到新额度，因“资金链断裂”而导致业务操作失败。这种失败的代价是比较高昂的，它白白浪费了部分已经完成了的服务资源，但总体来说，它仍是一种并发性能和限流效果上都相对折衷可行的分布式限流方案。上一节提到过，对于分布式系统容错是必须要有、无法妥协的措施。但限流与容错不一样，做分布式限流从不追求“越彻底越好”，往往需要权衡方案的代价与收益。")])])}),[],!1,null,null,null);v.default=r.exports}}]);