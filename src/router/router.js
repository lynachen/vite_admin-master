import Layout from "../layout/Index.vue";
import RouteView from "../components/RouteView.vue";

const layoutMap = [
    {
        path: "",
        name: "Index",
        meta: { title: "控制台", icon: "HomeFilled" },
        component: () => import("../views/Index.vue")
    },
    {
        path: "img",
        name: "Img",
        meta: { title: "图片预览", icon: "Film" },
        component: () => import("../views/img/img.vue")
    },
    {
        path: "demo",
        name: "Demo",
        component: RouteView,
        meta: { title: "demo", icon: "DataLine" },
        children: [
            {
                path: "",
                name: "Demo1",
                meta: { title: "demo1" },
                component: () => import("../views/demo/Demo1.vue")
            },
            {
                path: "demo2",
                name: "Demo2",
                meta: { title: "demo2", roles: ["admin"] },
                component: () => import("../views/demo/Demo2.vue")
            }
        ]
    },
    {
        path: "data",
        name: "Data",
        component: RouteView,
        meta: { title: "数据管理", icon: "DataLine" },
        children: [
            {
                path: "",
                name: "DataList",
                meta: { title: "数据列表" },
                component: () => import("../views/data/List.vue")
            },
            {
                path: "table",
                name: "DataTable",
                meta: { title: "数据表格", roles: ["admin"] },
                component: () => import("../views/data/Table.vue")
            }
        ]
    },
    {
        path: "admin",
        name: "Admin",
        meta: { title: "用户管理", icon: "User", roles: ["admin"] },
        component: RouteView,
        children: [
            {
                path: "",
                name: "AdminAuth",
                meta: { title: "用户列表" },
                component: () => import("../views/admin/AuthList.vue")
            },
            {
                path: "role",
                name: "AdminRole",
                meta: { title: "角色列表" },
                component: () => import("../views/admin/RoleList.vue")
            }
        ]
    },
    {
        path: "player",
        name: "Player",
        meta: { title: "视频播放", icon: "Film" },
        component: () => import("../views/common/XGPlayer.vue")
    },
    {
        path: "charts",
        name: "Charts",
        meta: { title: "数据图表", icon: "trend-charts" },
        component: () => import("../views/data/Charts.vue")
    },
    {
        path: "editor",
        name: "Editor",
        meta: { title: "富文本编辑器", icon: "Document" },
        component: () => import("../views/common/Editor.vue")
    },
    {
        path: "weditor",
        name: "WeEditor",
        meta: { title: "富文本编辑器2", icon: "Document" },
        component: () => import("../views/common/WeEditor.vue")
    },
    {
        path: "countdown",
        name: "CountDown",
        meta: { title: "倒计时", icon: "Document" },
        component: () => import("../views/common/CountDown.vue")
    },
    {
        path: "eltree",
        name: "elTree",
        meta: { title: "树状图", icon: "Document" },
        component: () => import("../views/common/elTree.vue")
    },
    {
        path: "user",
        name: "User",
        hidden: true /* 不在侧边导航展示 */,
        meta: { title: "个人中心" },
        component: () => import("../views/admin/User.vue")
    },
    {
        path: "/error",
        name: "NotFound",
        hidden: true,
        meta: { title: "404" },
        component: () => import("../components/NotFound.vue")
    },
    {
        path: "/:w+",
        hidden: true,
        redirect: { name: "NotFound" }
    }
];

const routes = [
    { path: "/login", name: "Login", meta: { title: "登录" }, component: () => import("../views/login/Login.vue") },
    { path: "/", name: "Layout", component: Layout, children: [...layoutMap] }
];

export { routes, layoutMap };
