const asset = n => `../assets/image-${String(n).padStart(2,'0')}.webp`;
const coverAsset = n => `../assets/cover-${String(n).padStart(2,'0')}.webp`;
const originalAsset = n => `../assets/original-${String(n).padStart(2,'0')}.webp`;

const projects = [
  {
    title:'预测市场：交易下单及账户',
    en:'Order & Account · 0→1',
    cover:4,
    summary:'为新交易品类建立清晰、可信的下单与账户体验，让用户知道自己在交易什么、订单处于什么状态、风险在哪里。',
    metrics:[['0→1','交易与账户'],['3个月','上线验证'],['破亿张','交易量'],['北美热门品类','市场定位']],
    problem:'预测市场需要与现有资产和账户体系并存。用户必须在下单前理解标的、方向、价格、账户资产、订单状态和风险信息。',
    decisions:[
      '延续正股下单的基础路径，降低新用户学习成本。',
      '通过品类标识、账户分组与订单状态，避免与正股交易混淆。',
      '高级订单逐步展开，兼顾普通用户的清晰与高频用户的效率。'
    ],
    role:'核心产品体验设计；参与需求梳理、下单路径、账户信息架构、风险提示及上线迭代。',
    gallery:[17,19,18],
    galleryLayout:'all-wide'
  },
  {
    title:'全行情图表升级及规范沉淀',
    en:'Market Data · Visualization',
    cover:3,
    summary:'统一富途与 moomoo 多市场、多品类、多端行情图表体验，提高数据阅读效率、交互一致性和用户信任。',
    metrics:[['30+','图表规范'],['HK / US','用户访谈'],['App / PC','多端适配']],
    problem:'基础图表在大屏、多语言和不同业务中缺少统一适配；tooltip、hover、图例联动、轴线标签等交互细节不一致。',
    decisions:[
      '建立柱状图、折线图、环图等基础图表的使用与交互规范。',
      '补齐不同分辨率、多语言和多市场下的适配规则。',
      '用清晰的信息层级减少遮挡与视觉误差，而不只是更新视觉样式。'
    ],
    role:'主责设计；推动规范形成、用户验证、跨业务复用和后续走查。',
    gallery:[10],
    galleryLayout:'lead-wide',
    extraGallery:[12,13,14,15],
    overviewImage:16
  },
  {
    title:'Hermes 智能搜索升级',
    en:'Search · Growth',
    cover:6,
    summary:'把偏标的查询的搜索入口扩展为连接标的、行情、资讯与热点内容的综合搜索，提高查找效率并为交易提供有效流量。',
    metrics:[['+3%','日均总点击'],['+1%','日活 UV'],['+90.51%','内容点击涨幅']],
    problem:'结果按模块固定陈列，相关内容被淹没；垂直搜索缺少有效过滤，用户容易感到“搜不准、搜不全”。',
    decisions:[
      '增加输入过程中的智能联想，缩短查找路径。',
      '优化历史记录、热点与个性化推荐，提高搜前信息价值。',
      '重排结果层级，让相关标的、行情和内容更早出现。'
    ],
    role:'主责设计；负责问题分析、体验方案、上线协作与数据复盘。',
    gallery:[20,22],
    galleryLayout:'all-wide',
    insights:true
  },
  {
    title:'剪映 / CapCut 创作者生产工具',
    en:'Complex Tool · Creator Workflow',
    cover:25,
    summary:'面向内容创作者与素材设计师，重构素材生产和编辑流程，让复杂能力更容易理解、更快完成。',
    metrics:[['235.7%','创作效率提升'],['10倍+','素材生产效率'],['亿级','产品用户规模']],
    problem:'工具线需要同时服务内部设计师与 UGC 创作者。功能多、流程长，且需要兼顾桌面端生产效率与移动端使用习惯。',
    decisions:[
      '从核心任务出发重组工具入口，减少创作者在不同模块间切换。',
      '统一文本、字幕、动画等高频编辑能力的操作逻辑与反馈。',
      '与产品、研发和运营共同验证流程，持续处理上线后的真实问题。'
    ],
    role:'主责产品体验设计；独立推进需求梳理、流程设计、交互视觉、协作交付与上线验收。',
    gallery:[26],
    galleryLayout:'all-wide'
  }
];

const capabilities = [
  ['01','交易下单与账户体验','参与预测市场下单、账户与订单页面设计，关注操作确定性、风险提示和交易效率。'],
  ['02','行情数据可视化','主导基础行情图表优化与规范沉淀，覆盖多品类、多市场和多端适配。'],
  ['03','多端金融设计系统','参与 App / PC 设计系统建设，沉淀金融组件、Design Token、页面模板和协作规则。'],
  ['04','增长与搜索转化','基于用户路径和数据结果，优化搜索入口、内容分发与交易前置流量。'],
  ['05','全球化产品设计','有多语言、RTL 和国际化适配经验，理解不同市场的展示与合规差异。'],
  ['06','复杂工具产品','在剪映 / CapCut、Bimgo 等项目中，从需求拆解到上线走查完整推进。']
];

const fit = [
  ['交易产品','有下单、账户、订单状态与新增交易品类设计经验。'],
  ['行情数据','沉淀 30+ 金融图表规范，覆盖多品类行情和多端交互。'],
  ['金融设计系统','服务 App / PC、6 条业务线与 60+ 设计师，规范 60+ 金融组件。'],
  ['IPO 理解','没有直接负责 IPO 产品设计；作为港美股 IPO 深度用户，熟悉认购、配售、暗盘和上市首日交易路径。'],
  ['全球化','参与 moomoo 多语言与 RTL 适配，可迁移到多市场产品。'],
  ['真实交易经验','有港美股、ETF、期权和预测市场的长期个人使用经验。']
];

function hermesInsights(){
  const segments = [
    ['高价值用户','资产 / 持仓 ＞ 100 万','人均点击量 +8%','搜索更频繁地用于标的研究与决策对比，进一步强化核心用户的交易准备过程。'],
    ['中低频交易用户','月交易 1–21 次','点击量 +7%','对交易意愿已形成、但决策周期较长的用户，搜索成为连接了解、判断与行动的重要工具。'],
    ['低活跃用户','月登录 ＜ 10 天','点击量最高 +18%','新版搜索对低活跃用户的吸引更明显，为用户回访和重新探索产品提供了入口。'],
    ['新入金用户','新增 PC 用户','点击量 +6%','新增用户的提升高于存量用户，说明新版搜索对尚未形成固定习惯的用户更具吸引力。']
  ];
  return `<section class="case-insights">
    <div class="insight-heading"><span>USER INSIGHTS</span><h4>哪些用户从本次优化中获益更多？</h4><p>分层数据表明，改版不仅增加了整体搜索使用，也对高价值、低活跃和新入金用户产生了更明显的正向影响。</p></div>
    <div class="segment-table">
      <div class="segment-row segment-head"><b>用户群体</b><b>数据表现</b><b>业务解读</b></div>
      ${segments.map(s=>`<div class="segment-row"><div><strong>${s[0]}</strong><small>${s[1]}</small></div><div class="segment-metric">${s[2]}</div><p>${s[3]}</p></div>`).join('')}
    </div>
    <div class="business-impact">
      <div class="impact-copy"><span>BUSINESS IMPACT</span><h4>搜索带来的交易机会。</h4><p>改版提升了搜索使用和高价值用户参与度。以下金额按统一口径保守估算，不代表实际成交。</p>
        <div class="estimate"><small>潜在日均交易金额（估算）</small><strong>约 448 万港元</strong><p>2,598,600 + 1,883,600 = 4,481,600<br>按每笔交易 1,000 港元估算</p></div>
        <ol class="impact-list">
          <li><b>优质流量增加</b><span>搜索点击 +3%，高价值用户人均点击 +8%。</span></li>
          <li><b>新增交易触发点</b><span>内容点击增长 90.51%，连接资讯阅读与标的探索。</span></li>
          <li><b>结果可以持续验证</b><span>根据点击增量、阶段转化率和单笔金额观察潜在机会。</span></li>
        </ol>
      </div>
    </div>
    <img class="funnel-document" src="${asset(24)}" loading="lazy" alt="搜索至交易的转化漏斗">
  </section>`;
}

function projectCard(p,i){
  return `<article class="project reveal">
    <div class="project-cover"><img src="${coverAsset(p.cover)}" alt="${p.title}项目封面"></div>
    <div class="project-body">
      <div class="project-top"><div><div class="project-index">CASE 0${i+1} · ${p.en}</div><h3>${p.title}</h3></div></div>
      <p class="project-summary">${p.summary}</p>
      <div class="metrics">${p.metrics.map(m=>`<div class="metric"><strong>${m[0]}</strong><span>${m[1]}</span></div>`).join('')}</div>
      <div class="project-grid">
        <div><h4>核心问题</h4><p>${p.problem}</p></div>
        <div><h4>关键决策</h4><ul>${p.decisions.map(d=>`<li>${d}</li>`).join('')}</ul></div>
        <div><h4>我的角色</h4><p>${p.role}</p></div>
      </div>
      <div class="gallery ${p.galleryLayout||''}">${p.gallery.map((n,j)=>`<img class="${p.galleryLayout==='lead-wide'&&j===0?'wide':''}" src="${asset(n)}" loading="lazy" alt="${p.title}设计页面 ${j+1}">`).join('')}</div>
      ${p.extraGallery?`<div class="gallery-section"><div class="gallery gallery-four">${p.extraGallery.map((n,j)=>`<img src="${asset(n)}" loading="lazy" alt="其他行情图表 ${j+1}">`).join('')}</div></div>`:''}
      ${p.overviewImage?`<div class="gallery-section"><img class="overview-image" src="${asset(p.overviewImage)}" loading="lazy" alt="行情图表总览"></div>`:''}
      ${p.insights?hermesInsights():''}
    </div>
  </article>`;
}

document.querySelector('#app').innerHTML = `
  <nav class="nav"><div class="nav-inner"><a class="brand" href="#top">Litia Zhang</a><div class="nav-links"><a href="#work">案例</a><a href="#capability">能力</a><a href="#fit">匹配</a><a href="mailto:zhanglitingzlt98@gmail.com">联系</a></div></div></nav>
  <header class="hero" id="top"><div class="hero-inner reveal">
    <div class="eyebrow">Product Designer · Fintech & Trading</div>
    <h1>Complex data.<br>Clear decisions.</h1>
    <p class="hero-copy">近 7 年产品体验设计经验，专注金融交易、行情数据、下单账户与多端设计系统。把复杂信息转化为清晰、可信、<span class="nowrap">可执行的体验。</span></p>
    <div class="hero-meta"><span class="pill">Trading Product Design</span><span class="pill">Market Data</span><span class="pill">Order & Account</span><span class="pill">Fintech Design System</span><span class="pill">Growth</span><span class="pill">AI Design</span></div>
    <a class="scroll-cue" href="#work">View selected work ↓</a>
  </div></header>

  <section class="section" id="work">
    <div class="section-head reveal"><div class="kicker">SELECTED WORK</div><div><h2>四个代表案例。<br>聚焦交易与复杂工具。</h2><p class="lede">从 0→1 交易品类、全行情数据规范、搜索增长，到亿级创作工具。每个案例都聚焦真实约束、关键判断和上线结果。</p></div></div>
    <div class="projects">${projects.map(projectCard).join('')}</div>
  </section>

  <section class="section" id="capability">
    <div class="section-head reveal"><div class="kicker">CAPABILITY</div><div><h2>专业深度，<br>也能完整交付。</h2></div></div>
    <div class="cap-grid" style="margin-top:48px">${capabilities.map(c=>`<div class="cap reveal"><span class="cap-num">${c[0]}</span><h3>${c[1]}</h3><p>${c[2]}</p></div>`).join('')}</div>
  </section>

  <section class="section" id="fit">
    <div class="section-head reveal"><div class="kicker">WHY ME</div><div><h2>与全球交易产品<br>直接相关的经验。</h2><p class="lede">主要体现在三类能力：交易路径设计、全行情数据可视化、多端金融设计系统。</p></div></div>
    <div class="fit">${fit.map((f,i)=>`<div class="fit-card reveal"><span>0${i+1}</span><h3>${f[0]}</h3><p>${f[1]}</p></div>`).join('')}</div>
  </section>

  <section class="section earlier-work">
    <div class="earlier-card reveal">
      <div><span>EARLIER WORK · 2022</span><h2>查看更早的<br>完整项目经历。</h2></div>
      <div class="earlier-info"><p>此链接是本人 2022 年中的作品集链接，辅助贵司了解更多的过往经历。<br>通过这份作品集已接到字节 Offer，同时在推进腾讯等头部公司的面试流程。最终选择加入字节。</p>
        <a href="https://www.figma.com/proto/KFS2VELa5GYbDnDhTWUheH/Litia-Zhang%EF%BD%9CProduct-Designer?node-id=1-2801&amp;viewport=1517%2C766%2C0.05&amp;t=JJo7I9KJXzGFtfvr-1&amp;scaling=min-zoom&amp;content-scaling=fixed&amp;page-id=0%3A1" target="_blank" rel="noreferrer">查看 2022 作品集 <b>↗</b></a>
        <small>Figma Prototype · 在新窗口打开</small>
      </div>
    </div>
  </section>

  <footer class="footer reveal"><p>Thank you for reading.</p><h2>Contact me.</h2><p><a href="mailto:zhanglitingzlt98@gmail.com">zhanglitingzlt98@gmail.com ↗</a></p><p>© 2026 Litia Zhang</p></footer>
  <div class="image-preview" role="dialog" aria-hidden="true"><img alt=""><div class="preview-hint">点击图片锁定 · 点击空白处关闭</div></div>
`;

const observer = new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}
}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const preview = document.querySelector('.image-preview');
const previewImage = preview.querySelector('img');
let previewLocked = false;

function showPreview(source, lock = false){
  previewImage.src = source.dataset.full;
  previewImage.alt = source.alt;
  previewLocked = lock;
  preview.classList.toggle('locked', lock);
  preview.classList.add('visible');
  preview.setAttribute('aria-hidden','false');
}
function hidePreview(force = false){
  if(previewLocked && !force) return;
  previewLocked = false;
  preview.classList.remove('visible','locked');
  preview.setAttribute('aria-hidden','true');
}
document.querySelectorAll('.finance-card img[data-full]').forEach(image=>{
  image.classList.add('zoomable');
  image.addEventListener('mouseenter',()=>{ if(!previewLocked) showPreview(image); });
  image.addEventListener('mouseleave',()=>hidePreview());
  image.addEventListener('click',event=>{
    event.stopPropagation();
    if(previewLocked && previewImage.src.endsWith(image.dataset.full.replace('../','/'))) hidePreview(true);
    else showPreview(image,true);
  });
});
preview.addEventListener('click',()=>hidePreview(true));
document.addEventListener('keydown',event=>{ if(event.key==='Escape') hidePreview(true); });
