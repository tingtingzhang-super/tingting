import { useState } from "react";
import { PageHead, Section, Demo, SpecTable, Guidelines } from "../components/Doc";
import { Phone } from "../components/Phone";
import * as M from "../mooui";

export function ButtonPage() {
  return (
    <div className="page">
      <PageHead
        kicker="Components · 组件"
        title="按钮 Button"
        desc="按钮用于触发操作。MOOUI 提供主要、次要、幽灵、危险与文字 5 种类型，以及大、中、小三种尺寸。"
      />
      <Section title="类型 Type" hint="同一界面中主按钮（Primary）至多出现一个。">
        <Demo>
          <M.Button type="primary">主要按钮</M.Button>
          <M.Button type="secondary">次要按钮</M.Button>
          <M.Button type="ghost">幽灵按钮</M.Button>
          <M.Button type="danger">危险按钮</M.Button>
          <M.Button type="text">文字按钮</M.Button>
        </Demo>
      </Section>
      <Section title="尺寸 Size">
        <Demo>
          <M.Button size="lg">大 48</M.Button>
          <M.Button size="md">中 40</M.Button>
          <M.Button size="sm">小 30</M.Button>
        </Demo>
      </Section>
      <Section title="状态 State">
        <Demo>
          <M.Button type="primary">默认</M.Button>
          <M.Button type="primary" disabled>
            禁用
          </M.Button>
          <M.Button type="ghost" disabled>
            禁用
          </M.Button>
        </Demo>
      </Section>
      <Section title="块级 Block" hint="表单提交、底部主操作常用通栏按钮。">
        <Demo column>
          <M.Button type="primary" size="lg" block>
            提交订单
          </M.Button>
        </Demo>
      </Section>
      <Section title="规格 Spec">
        <SpecTable
          rows={[
            { prop: "size", type: "enum", value: "lg=48 / md=40 / sm=30", desc: "按钮高度（px）" },
            { prop: "padding-x", type: "px", value: "24 / 18 / 12", desc: "左右内边距" },
            { prop: "radius", type: "token", value: "8 (sm 4)", desc: "圆角" },
            { prop: "font", type: "px", value: "16 / 14 / 13", desc: "字号，weight 600" },
            { prop: "primary", type: "color", value: "#2F6BFF", desc: "默认主色 / 按压 #1F4FD6" },
            { prop: "disabled", type: "color", value: "#A8C2FF", desc: "禁用态主色" },
          ]}
        />
      </Section>
      <Section title="使用指南 Guidelines">
        <Guidelines
          dos={[
            "一个操作区内仅保留一个主按钮，引导核心动作",
            "按钮文案使用动词，控制在 4 个字以内",
            "危险操作（删除、注销）使用 danger 类型并二次确认",
          ]}
          donts={[
            "不要在同屏并排放置多个主按钮",
            "不要使用超过 6 个字的长文案",
            "禁用态不要再绑定点击事件",
          ]}
        />
      </Section>
    </div>
  );
}

export function CellPage() {
  return (
    <div className="page">
      <PageHead
        kicker="Components · 组件"
        title="单元格 Cell"
        desc="单元格是移动端列表的基础容器，可承载图标、标题、描述、右值与箭头，常用于设置页与信息列表。"
      />
      <Section title="基础用法 Basic">
        <Demo>
          <Phone>
            <div style={{ padding: 16 }}>
              <M.CellGroup>
                <M.Cell icon="👤" title="账号与安全" arrow />
                <M.Cell icon="🔔" title="新消息通知" value={<M.Switch defaultOn />} />
                <M.Cell icon="🌙" title="深色模式" value="跟随系统" arrow />
                <M.Cell icon="🌐" title="语言" value="简体中文" arrow />
              </M.CellGroup>
              <div style={{ height: 16 }} />
              <M.CellGroup>
                <M.Cell title="标题" label="这是一段辅助描述文本" arrow />
                <M.Cell title="清除缓存" value="128 MB" arrow />
              </M.CellGroup>
            </div>
          </Phone>
          <div style={{ flex: 1, minWidth: 240 }}>
            <SpecTable
              rows={[
                { prop: "height", type: "px", value: "≥ 52", desc: "单行最小高度" },
                { prop: "padding", type: "px", value: "14 × 16", desc: "上下 × 左右内边距" },
                { prop: "icon", type: "px", value: "28×28", desc: "前置图标容器" },
                { prop: "title", type: "px", value: "15 / text-1", desc: "主标题" },
                { prop: "label", type: "px", value: "12 / text-3", desc: "辅助描述" },
                { prop: "divider", type: "color", value: "#E6E8EE", desc: "项间分割线，首尾不显示" },
              ]}
            />
          </div>
        </Demo>
      </Section>
      <Section title="使用指南 Guidelines">
        <Guidelines
          dos={[
            "同组单元格使用统一的左对齐与图标尺寸",
            "右侧值文本不超过单元格宽度的 40%，过长则省略",
            "可点击的单元格右侧展示箭头（›）",
          ]}
          donts={["不要在一个单元格内堆叠超过两行文字", "不要混用有图标与无图标且无分组的单元格"]}
        />
      </Section>
    </div>
  );
}

export function FormPage() {
  const [radio, setRadio] = useState(0);
  return (
    <div className="page">
      <PageHead
        kicker="Components · 组件"
        title="表单 Form"
        desc="表单类组件包括输入框、开关、复选框与单选框，用于数据采集。统一高度与点击热区，保证移动端易用性。"
      />
      <Section title="输入框 Input">
        <Demo column>
          <M.Field placeholder="请输入用户名" />
          <M.Field prefix="🔍" placeholder="搜索商品 / 店铺" />
          <M.Field error defaultValue="错误状态：手机号格式不正确" />
        </Demo>
        <SpecTable
          rows={[
            { prop: "height", type: "px", value: "44", desc: "默认高度，热区 ≥ 44" },
            { prop: "radius", type: "token", value: "8", desc: "圆角" },
            { prop: "focus", type: "style", value: "border #2F6BFF + 3px ring", desc: "聚焦态" },
            { prop: "error", type: "color", value: "#F5503A", desc: "错误态边框" },
          ]}
        />
      </Section>
      <Section title="开关 Switch">
        <Demo>
          <M.Switch defaultOn />
          <M.Switch />
        </Demo>
      </Section>
      <Section title="复选框 / 单选框 Checkbox & Radio">
        <Demo column>
          <div className="moo">
            <M.Checkbox defaultChecked>已阅读并同意《用户协议》</M.Checkbox>
          </div>
          <div className="moo" style={{ display: "flex", gap: 20 }}>
            {["微信支付", "支付宝", "银行卡"].map((m, i) => (
              <M.Radio key={m} checked={radio === i} onSelect={() => setRadio(i)}>
                {m}
              </M.Radio>
            ))}
          </div>
        </Demo>
        <SpecTable
          rows={[
            { prop: "box", type: "px", value: "20×20", desc: "勾选框尺寸" },
            { prop: "checked", type: "color", value: "#2F6BFF", desc: "选中态填充" },
            { prop: "hit-area", type: "px", value: "≥ 44", desc: "点击热区（含文字）" },
          ]}
        />
      </Section>
    </div>
  );
}

export function TagBadgePage() {
  return (
    <div className="page">
      <PageHead
        kicker="Components · 组件"
        title="标签与徽标 Tag & Badge"
        desc="标签用于标注分类或状态；徽标用于提示未读数量或新内容，常依附于图标或头像。"
      />
      <Section title="标签 Tag">
        <Demo>
          <M.Tag color="primary">默认</M.Tag>
          <M.Tag color="success">已完成</M.Tag>
          <M.Tag color="warning">待处理</M.Tag>
          <M.Tag color="danger">已超时</M.Tag>
          <M.Tag color="primary" round>
            胶囊标签
          </M.Tag>
        </Demo>
      </Section>
      <Section title="徽标 Badge">
        <Demo>
          <div style={{ position: "relative", fontSize: 28 }}>
            🔔
            <span style={{ position: "absolute", top: -4, right: -8 }}>
              <M.Badge count={8} />
            </span>
          </div>
          <div style={{ position: "relative", fontSize: 28 }}>
            💬
            <span style={{ position: "absolute", top: -4, right: -10 }}>
              <M.Badge count={99} />
            </span>
          </div>
          <div style={{ position: "relative", fontSize: 28 }}>
            👤
            <span style={{ position: "absolute", top: 0, right: -2 }}>
              <M.Badge dot />
            </span>
          </div>
        </Demo>
        <SpecTable
          rows={[
            { prop: "tag height", type: "px", value: "22", desc: "标签高度 / 字号 12" },
            { prop: "tag radius", type: "token", value: "4 (round=full)", desc: "圆角" },
            { prop: "badge", type: "px", value: "18 高 / dot 8", desc: "数字徽标 / 圆点" },
            { prop: "overflow", type: "rule", value: "99+", desc: "数字超过 99 显示 99+" },
          ]}
        />
      </Section>
    </div>
  );
}

export function NavigationPage() {
  return (
    <div className="page">
      <PageHead
        kicker="Components · 组件"
        title="导航 Navigation"
        desc="导航类组件包括顶部导航栏、底部标签栏与分段标签页，构成移动端的全局与局部导航骨架。"
      />
      <Section title="顶部导航栏 NavBar / 底部标签栏 TabBar">
        <Demo>
          <Phone>
            <M.NavBar title="MOOUI" right="⋯" />
            <M.Tabs items={["推荐", "关注", "附近"]} />
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <M.Card title="设计规范展示" text="基于组件库构建的移动端示例页面。" />
              <M.Card title="第二张卡片" text="顶部导航 + 分段 Tabs + 底部 TabBar 组合。" cover={false} />
            </div>
            <div style={{ position: "sticky", bottom: 0 }}>
              <M.TabBar active={0} />
            </div>
          </Phone>
          <div style={{ flex: 1, minWidth: 240 }}>
            <SpecTable
              rows={[
                { prop: "navbar h", type: "px", value: "44", desc: "导航栏高度（不含状态栏）" },
                { prop: "title", type: "px", value: "17 / w600", desc: "居中标题" },
                { prop: "tabbar h", type: "px", value: "49", desc: "标签栏高度（不含安全区）" },
                { prop: "tab icon", type: "px", value: "24", desc: "底部图标尺寸" },
                { prop: "tabs indicator", type: "px", value: "24×3", desc: "选中下划线" },
              ]}
            />
          </div>
        </Demo>
      </Section>
      <Section title="使用指南 Guidelines">
        <Guidelines
          dos={["底部标签栏控制在 3–5 项", "当前页标签使用主色高亮", "导航栏标题简洁、单行省略"]}
          donts={["不要在标签栏放置超过 5 个入口", "返回按钮不要替换为其它语义图标"]}
        />
      </Section>
    </div>
  );
}

export function FeedbackPage() {
  return (
    <div className="page">
      <PageHead
        kicker="Components · 组件"
        title="反馈 Feedback"
        desc="反馈组件用于即时回应用户操作，包括轻提示 Toast、对话框 Dialog、进度 Progress 与加载 Loading。"
      />
      <Section title="轻提示 Toast">
        <Demo>
          <M.Toast>操作成功</M.Toast>
          <M.Toast>
            <M.Spinner /> 加载中…
          </M.Toast>
          <M.Toast>⚠️ 网络异常，请重试</M.Toast>
        </Demo>
      </Section>
      <Section title="对话框 Dialog">
        <Demo>
          <M.Dialog title="确认删除" text="删除后将无法恢复，是否继续？" />
        </Demo>
      </Section>
      <Section title="进度与加载 Progress & Loading">
        <Demo column>
          <M.Progress value={35} />
          <M.Progress value={70} />
          <div className="moo-row">
            <M.Spinner />
            <span style={{ fontSize: 14, color: "var(--moo-text-2)" }}>正在加载…</span>
          </div>
        </Demo>
        <SpecTable
          rows={[
            { prop: "toast", type: "rule", value: "1.5–3s 自动消失", desc: "非阻断式，居中或居底" },
            { prop: "dialog w", type: "px", value: "280", desc: "对话框宽度" },
            { prop: "progress h", type: "px", value: "8", desc: "进度条高度 / 圆角 full" },
            { prop: "spinner", type: "px", value: "28", desc: "默认加载指示器" },
          ]}
        />
      </Section>
    </div>
  );
}

export function DisplayPage() {
  return (
    <div className="page">
      <PageHead
        kicker="Components · 组件"
        title="展示 Display"
        desc="展示类组件用于内容呈现，包括卡片 Card、头像 Avatar 与步进器 Stepper。"
      />
      <Section title="卡片 Card">
        <Demo>
          <div style={{ width: 260 }}>
            <M.Card title="MOOUI 卡片" text="卡片用于聚合一组相关内容，支持封面、标题与描述。" />
          </div>
        </Demo>
      </Section>
      <Section title="头像 Avatar">
        <Demo>
          <M.Avatar size="lg">M</M.Avatar>
          <M.Avatar>U</M.Avatar>
          <M.Avatar size="sm">A</M.Avatar>
          <M.Avatar square>📷</M.Avatar>
        </Demo>
      </Section>
      <Section title="步进器 Stepper">
        <Demo>
          <M.Stepper defaultValue={1} />
          <M.Stepper defaultValue={10} />
        </Demo>
        <SpecTable
          rows={[
            { prop: "card radius", type: "token", value: "12", desc: "卡片圆角 / shadow-1" },
            { prop: "avatar", type: "px", value: "32 / 44 / 56", desc: "sm / md / lg 尺寸" },
            { prop: "stepper btn", type: "px", value: "32×32", desc: "加减按钮热区" },
          ]}
        />
      </Section>
    </div>
  );
}
