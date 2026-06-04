/* =============================================================================
 *  作品集内容 · Portfolio Content
 *  ---------------------------------------------------------------------------
 *  这是整站唯一需要你经常修改的文件。改完保存、刷新页面即可。
 *  This is the only file you normally need to edit. Save & refresh to see changes.
 *
 *  规则 / Rules:
 *  - 每段内容都有 zh（中文）和 en（英文）两个版本，按需修改。
 *  - 不想做英文版？把 site.languages 改成 ["zh"] 即可隐藏切换按钮。
 *  - 图片放进 assets/img/，然后在 cover 里填 "assets/img/你的图.jpg"。
 *  - 不写 cover 也没关系，会自动显示一个优雅的占位色块。
 * ========================================================================== */

window.PORTFOLIO = {
  /* ---- 站点基础设置 ---------------------------------------------------- */
  site: {
    languages: ["zh", "en"],      // 想只要中文就改成 ["zh"]
    defaultLang: "zh",
    // 浏览器标签页标题
    title: { zh: "亭亭 · 作品集", en: "Tingting · Portfolio" },
  },

  /* ---- 顶部导航品牌名 -------------------------------------------------- */
  brand: { zh: "亭亭", en: "Tingting" },

  /* ---- 首屏 Hero ------------------------------------------------------- */
  hero: {
    // 一句话定位：你是谁、你擅长什么。越精准越好。
    eyebrow: { zh: "产品 / 体验设计师", en: "Product & Experience Designer" },
    headline: {
      zh: "用克制的设计，\n解决复杂的问题。",
      en: "Restrained design,\nfor complex problems.",
    },
    summary: {
      zh: "七年设计经验，横跨地产、内容与金融。从万科到字节跳动，现在在富途。我相信好的设计不是被看见，而是被信任。",
      en: "Seven years across real estate, content and fintech — Vanke, ByteDance, now Futu. I believe good design isn't noticed; it's trusted.",
    },
  },

  /* ---- 关于 About ------------------------------------------------------ */
  about: {
    label: { zh: "关于", en: "About" },
    paragraphs: {
      zh: [
        "我是一名工作了七年的设计师，从 UI 起步，做过产品体验设计，如今依旧专注于界面与体验本身。",
        "职业路径从小公司到万科，再到字节跳动，现在在富途。这条线让我既懂 C 端的活力，也懂金融严肃场景里的克制与信任。",
        "在 AI 时代，我把工具当作放大器：用它做竞品分析、生成方案变体、批量出图与维护设计规范，把省下的时间留给真正重要的判断。",
      ],
      en: [
        "A designer with seven years of experience — I started in UI, moved through product & experience design, and remain focused on interface and experience itself.",
        "From a small studio to Vanke, then ByteDance, and now Futu. This path taught me both the energy of consumer products and the restraint and trust that serious financial scenarios demand.",
        "In the AI era I treat tools as amplifiers — for competitive research, variant generation, batch production and design-system upkeep — saving time for the judgment that actually matters.",
      ],
    },
    // 左侧小标签信息
    facts: [
      { k: { zh: "经验", en: "Experience" }, v: { zh: "7 年", en: "7 yrs" } },
      { k: { zh: "现就职", en: "Now at" }, v: { zh: "富途", en: "Futu" } },
      { k: { zh: "曾就职", en: "Previously" }, v: { zh: "字节跳动 · 万科", en: "ByteDance · Vanke" } },
      { k: { zh: "专长", en: "Focus" }, v: { zh: "UI · 体验 · 设计系统", en: "UI · UX · Design Systems" } },
    ],
  },

  /* ---- 精选作品 Selected Work ----------------------------------------- */
  // 建议放 3–5 个就好。每个用「问题 → 决策 → 结果」讲故事，而不是「需求 → 稿子」。
  workLabel: { zh: "精选作品", en: "Selected Work" },
  projects: [
    {
      cover: "",                          // 例: "assets/img/project-1.jpg"
      year: "2024",
      tag: { zh: "金融 · 富途", en: "Fintech · Futu" },
      title: { zh: "交易体验重构", en: "Trading Experience Redesign" },
      role: { zh: "主设计师", en: "Lead Designer" },
      problem: {
        zh: "在这里写：当时面对的核心问题是什么？业务/用户的痛点在哪？",
        en: "Describe the core problem — the business or user pain you faced.",
      },
      decision: {
        zh: "在这里写：你做了哪些关键决策？为什么是这样而不是那样？",
        en: "Describe the key decisions you made, and why this path over others.",
      },
      result: {
        zh: "在这里写：结果如何？尽量有数据（转化、效率、满意度等）。",
        en: "Describe the outcome — ideally with numbers (conversion, efficiency, NPS).",
      },
    },
    {
      cover: "",
      year: "2022",
      tag: { zh: "内容 · 字节跳动", en: "Content · ByteDance" },
      title: { zh: "项目名称", en: "Project Title" },
      role: { zh: "体验设计师", en: "Experience Designer" },
      problem: { zh: "问题描述……", en: "Problem…" },
      decision: { zh: "关键决策……", en: "Key decisions…" },
      result: { zh: "成果与数据……", en: "Outcome & metrics…" },
    },
    {
      cover: "",
      year: "2020",
      tag: { zh: "地产 · 万科", en: "Real Estate · Vanke" },
      title: { zh: "项目名称", en: "Project Title" },
      role: { zh: "UI 设计师", en: "UI Designer" },
      problem: { zh: "问题描述……", en: "Problem…" },
      decision: { zh: "关键决策……", en: "Key decisions…" },
      result: { zh: "成果与数据……", en: "Outcome & metrics…" },
    },
  ],

  /* ---- 工作方式 / 与 AI 协作（差异化亮点）----------------------------- */
  approach: {
    label: { zh: "我如何工作", en: "How I Work" },
    intro: {
      zh: "AI 让「好看」变得廉价，「想得对」才珍贵。我的价值在工具替代不了的地方。",
      en: "AI made 'pretty' cheap; 'right' stays rare. My value lives where tools can't reach.",
    },
    items: [
      {
        title: { zh: "业务先于像素", en: "Business before pixels" },
        desc: { zh: "先理解商业目标与约束，再谈界面。设计是手段，不是目的。", en: "Understand goals and constraints first; the interface comes after. Design is a means, not an end." },
      },
      {
        title: { zh: "用 AI 放大产能", en: "AI as an amplifier" },
        desc: { zh: "竞品分析、方案变体、批量出图、规范维护交给 AI，把判断留给自己。", en: "Research, variants, batch production and system upkeep go to AI; judgment stays with me." },
      },
      {
        title: { zh: "为信任而设计", en: "Designing for trust" },
        desc: { zh: "金融场景里，克制、清晰与确定感比炫技更重要。", en: "In finance, restraint, clarity and certainty matter more than flair." },
      },
      {
        title: { zh: "体系化思维", en: "Systems thinking" },
        desc: { zh: "搭建并治理设计系统，让团队的一致性可持续。", en: "Building and governing design systems so consistency scales." },
      },
    ],
  },

  /* ---- 联系方式 Contact ----------------------------------------------- */
  contact: {
    label: { zh: "联系", en: "Contact" },
    tagline: {
      zh: "如果我们气味相投，欢迎聊聊。",
      en: "If we click, let's talk.",
    },
    email: "hello@example.com",           // ← 改成你的邮箱
    links: [
      { label: "Behance", url: "#" },     // ← 填上真实链接，不需要的整行删掉
      { label: "站酷", url: "#" },
      { label: "Dribbble", url: "#" },
    ],
  },

  /* ---- 页脚 ------------------------------------------------------------ */
  footer: {
    zh: "© " + new Date().getFullYear() + " 亭亭 · 用心设计",
    en: "© " + new Date().getFullYear() + " Tingting · Designed with care",
  },
};
