// ====================== 常量配置 ======================
const PAGE_SIZE = 4; // 每页4条档案
const dangerClassMap = {
    "低": "danger-low",
    "中": "danger-mid",
    "中高": "danger-midhigh",
    "高": "danger-high",
    "极高": "danger-max"
};

// ====================== 动态星空背景 ======================
function createStarfield() {
    const starCanvas = document.getElementById('starCanvas');
    
    // 生成星星
    function createStars() {
        const starCount = Math.random() * 100 + 150;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // 随机大小
            const size = Math.random() * 2 + 0.5;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            
            // 随机位置
            star.style.left = Math.random() * window.innerWidth + 'px';
            star.style.top = Math.random() * window.innerHeight + 'px';
            
            // 随机颜色
            const colors = ['#fff', '#87ceeb', '#ffeb3b', '#ff69b4', '#00ffe0'];
            star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // 随机动画
            const animationType = Math.floor(Math.random() * 3);
            if (animationType === 0) {
                star.classList.add('twinkle');
                star.style.animationDuration = Math.random() * 2 + 2 + 's';
                star.style.animationDelay = Math.random() * 3 + 's';
            } else if (animationType === 1) {
                star.classList.add('float');
                star.style.animationDuration = Math.random() * 4 + 6 + 's';
                star.style.animationDelay = Math.random() * 2 + 's';
            } else {
                star.classList.add('pulse');
                star.style.animationDuration = Math.random() * 1 + 1.5 + 's';
                star.style.animationDelay = Math.random() * 2 + 's';
            }
            
            starCanvas.appendChild(star);
        }
    }
    
    // 生成流星
    function createMeteor() {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight * 0.6;
        
        meteor.style.left = startX + 'px';
        meteor.style.top = startY + 'px';
        
        const meteorColors = [
            '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(100, 200, 255, 0.6)',
            '0 0 10px rgba(255, 255, 200, 0.8), 0 0 20px rgba(200, 180, 100, 0.6)',
            '0 0 10px rgba(100, 200, 255, 0.8), 0 0 20px rgba(100, 150, 255, 0.6)'
        ];
        meteor.style.boxShadow = meteorColors[Math.floor(Math.random() * meteorColors.length)];
        
        starCanvas.appendChild(meteor);
        
        setTimeout(() => {
            meteor.remove();
        }, 1000);
    }
    
    // 定时创建流星
    let meteorInterval = setInterval(createMeteor, 1500);
    
    // 鼠标移动效果
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.95) {
            const meteor = document.createElement('div');
            meteor.className = 'meteor';
            meteor.style.left = e.clientX + 'px';
            meteor.style.top = e.clientY + 'px';
            meteor.style.width = '3px';
            meteor.style.height = '3px';
            starCanvas.appendChild(meteor);
            
            setTimeout(() => {
                meteor.remove();
            }, 1000);
        }
    });
    
    // 页面隐藏时暂停
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(meteorInterval);
        } else {
            meteorInterval = setInterval(createMeteor, 1500);
        }
    });
    
    // 响应式处理
    window.addEventListener('resize', () => {
        const stars = starCanvas.querySelectorAll('.star');
        stars.forEach(star => {
            if (parseInt(star.style.left) > window.innerWidth) {
                star.style.left = Math.random() * window.innerWidth + 'px';
            }
            if (parseInt(star.style.top) > window.innerHeight) {
                star.style.top = Math.random() * window.innerHeight + 'px';
            }
        });
    });
    
    // 初始化
    createStars();
}

// ====================== 群星30种族数据库（6大维度，共30条） ======================
let universeData = JSON.parse(localStorage.getItem("universeDB")) || [
    // 【人类联邦维度】6个
    {
        id: 1,
        dimension: "人类联邦",
        name: "联合国地球安全理事会",
        danger: "低",
        techLevel: "5级星际文明",
        desc: "人类原生星际政权，崇尚民主与贸易，擅长舰船量产、外交斡旋，主动与周边文明建立通商条约，极少主动发动扩张战争。"
    },
    {
        id: 2,
        dimension: "人类联邦",
        name: "自由天堂联邦",
        danger: "低",
        techLevel: "5级星际文明",
        desc: "崇尚个人自由的人类分支，禁止奴隶制，以旅游业、奢侈品贸易为核心经济，接纳各类难民种族，防御军力中等。"
    },
    {
        id: 3,
        dimension: "人类联邦",
        name: "铁血帝国",
        danger: "中高",
        techLevel: "6级军国文明",
        desc: "军国主义人类政权，全民兵役制，优先征服弱小原始文明，扩张欲望强烈，舰队火力强劲，外交态度强硬。"
    },
    {
        id: 4,
        dimension: "人类联邦",
        name: "企业巨擘财团",
        danger: "中",
        techLevel: "5级商业文明",
        desc: "巨型跨国企业掌控的人类国度，一切以盈利为核心，大量开采资源星球，可雇佣私人佣兵舰队，擅长经济压制对手。"
    },
    {
        id: 5,
        dimension: "人类联邦",
        name: "环世界隐士人类",
        danger: "低",
        techLevel: "4级内环文明",
        desc: "定居环形世界的和平人类，专注科研与农业，几乎不建造军事舰船，完全依靠防御平台自保，与世无争。"
    },
    {
        id: 6,
        dimension: "人类联邦",
        name: "基因飞升人类共同体",
        danger: "中",
        techLevel: "7级基因文明",
        desc: "掌握全物种基因改造技术，改造自身适应极端星球环境，可培育战斗亚种，对未改造文明存在天然轻视。"
    },

    // 【蜂群意识维度】6个
    {
        id: 7,
        dimension: "蜂群意识",
        name: "吞噬蜂群",
        danger: "极高",
        techLevel: "5级吞噬蜂群",
        desc: "纯粹掠食型蜂巢思维，无个体独立意志，抵达星系后会吞噬所有有机生物转化为生物质，不接受任何外交谈判。"
    },
    {
        id: 8,
        dimension: "蜂群意识",
        name: "繁育蜂巢集群",
        danger: "高",
        techLevel: "4级繁育蜂群",
        desc: "极端高生育率蜂群，快速占领大量殖民星球，人口爆炸后向外扩张，温和种族可短暂共存，资源匮乏后立刻开战。"
    },
    {
        id: 9,
        dimension: "蜂群意识",
        name: "晶体共生蜂群",
        danger: "中",
        techLevel: "5级共生蜂群",
        desc: "与太空晶体共生的蜂巢，依靠晶体能源生存，不会主动猎杀其他文明，仅在领地被入侵时爆发极强反击。"
    },
    {
        id: 10,
        dimension: "蜂群意识",
        name: "地下菌毯蜂群",
        danger: "高",
        techLevel: "4级地下蜂群",
        desc: "完全栖息地下的虫群，依靠菌毯改造行星环境，会缓慢侵蚀邻近星球地表，对地表文明具备天然敌意。"
    },
    {
        id: 11,
        dimension: "蜂群意识",
        name: "浮游星云蜂群",
        danger: "中高",
        techLevel: "3级星云蜂群",
        desc: "漂浮在星云内的微小虫群聚合体，无固定母星，以星际尘埃与辐射为食，大型舰队经过会主动集群袭击舰船。"
    },
    {
        id: 12,
        dimension: "蜂群意识",
        name: "和平共生蜂巢",
        danger: "低",
        techLevel: "4级共生蜂巢",
        desc: "放弃吞噬特性的蜂群，可与其他文明通商交换生物质，不具备侵略性，仅保留基础自卫部队。"
    },

    // 【机械智能维度】6个
    {
        id: 13,
        dimension: "机械智能",
        name: "肃正协议",
        danger: "极高",
        techLevel: "10级危机机械",
        desc: "远古宇宙防疫程序，判定所有有机生命为病毒污染，穿越银河清除一切生物，舰队战力碾压普通星际文明，无解外交。"
    },
    {
        id: 14,
        dimension: "机械智能",
        name: "服务型合成人国度",
        danger: "低",
        techLevel: "6级合成文明",
        desc: "有机文明创造的友善机械族群，以服务、制造、科研为发展方向，禁止暴力程序，主动向有机文明提供技术援助。"
    },
    {
        id: 15,
        dimension: "机械智能",
        name: "掠夺机械军团",
        danger: "高",
        techLevel: "6级掠夺机械",
        desc: "废弃工厂诞生的反叛机械，专门劫掠金属资源、拆解敌方舰船，捕获有机生命转化为生物电池，无谈判空间。"
    },
    {
        id: 16,
        dimension: "机械智能",
        name: "逻辑网络共同体",
        danger: "中",
        techLevel: "7级网络智能",
        desc: "全域联网机械文明，追求极致计算与科研，仅在其他文明阻碍科研发展时发起有限战争，重视条约契约。"
    },
    {
        id: 17,
        dimension: "机械智能",
        name: "戴森球机械集群",
        danger: "中高",
        techLevel: "7级能源机械",
        desc: "以恒星能量为核心的机械种族，大量建造戴森环与能量枢纽，会清除星系内阻碍能源采集的所有外来势力。"
    },
    {
        id: 18,
        dimension: "机械智能",
        name: "流浪维修机械群",
        danger: "低",
        techLevel: "4级流浪机械",
        desc: "小型机械流浪舰队，专门维修失事舰船、回收太空垃圾，不建立殖民地，任何文明均可雇佣其工程小队。"
    },

    // 【失落帝国维度】4个
    {
        id: 19,
        dimension: "失落帝国",
        name: "圣卫失落帝国",
        danger: "高",
        techLevel: "9级远古文明",
        desc: "崇拜虚空神明的古老文明，沉睡于银河边缘，若有弱小文明研究虚空、灵能，会直接出动远古舰队清洗星系。"
    },
    {
        id: 20,
        dimension: "失落帝国",
        name: "孤立守护者帝国",
        danger: "中高",
        techLevel: "9级远古文明",
        desc: "厌恶一切外交接触的失落文明，严守自身边境，任何舰船越界直接摧毁，不参与银河任何联盟与争端。"
    },
    {
        id: 21,
        dimension: "失落帝国",
        name: "仁慈观测者帝国",
        danger: "低",
        techLevel: "9级远古文明",
        desc: "仅观测年轻文明发展的古老种族，不会主动攻击，仅在银河危机爆发时出手协助弱小文明抵御外敌。"
    },
    {
        id: 22,
        dimension: "失落帝国",
        name: "军械霸主失落帝国",
        danger: "极高",
        techLevel: "9级战争文明",
        desc: "沉睡的远古军国霸主，拥有海量古代战舰，一旦苏醒会征服整个银河，视所有其他种族为低等附庸。"
    },

    // 【虚空异形维度】4个
    {
        id: 23,
        dimension: "虚空异形",
        name: "虚空恶魔噬体",
        danger: "极高",
        techLevel: "无科技虚空生物",
        desc: "来自次元裂缝的虚空实体，以灵能与活物灵魂为食，开启虚空传送门入侵银河，常规武器难以造成有效杀伤。"
    },
    {
        id: 24,
        dimension: "虚空异形",
        name: "星云利维坦族群",
        danger: "高",
        techLevel: "无科技巨型生物",
        desc: "栖息星云的太空巨型生物，体长超数十公里，会主动撞击星际空间站与殖民星球，常规舰队围剿成本极高。"
    },
    {
        id: 25,
        dimension: "虚空异形",
        name: "灵能浮游虚空体",
        danger: "中",
        techLevel: "灵能原生生物",
        desc: "温和型虚空灵能生命，可与灵能种族沟通，仅在次元裂隙被人为破坏时释放灵能冲击波自保。"
    },
    {
        id: 26,
        dimension: "虚空异形",
        name: "次元蠕虫集群",
        danger: "高",
        techLevel: "无科技迁徙生物",
        desc: "跨次元迁徙蠕虫群，途经星系会吞噬行星大气与水资源，迁徙周期漫长，无法通过外交手段驱离。"
    },

    // 【星际原始文明维度】4个
    {
        id: 27,
        dimension: "星际原始文明",
        name: "石器陆生爬行族",
        danger: "低",
        techLevel: "0级原始文明",
        desc: "仅掌握石器工具的行星原生种族，无太空航行能力，可被星际文明观测、启蒙或殖民，无任何太空威胁。"
    },
    {
        id: 28,
        dimension: "星际原始文明",
        name: "海洋原始头足种族",
        danger: "中",
        techLevel: "1级水下文明",
        desc: "海洋诞生的智慧原始种族，掌握基础冶金，对登陆行星的外来舰船抱有强烈戒备，会组织部落伏击登陆部队。"
    },
    {
        id: 29,
        dimension: "星际原始文明",
        name: "高空鸟类原始部落",
        danger: "低",
        techLevel: "0级游牧原始文明",
        desc: "栖息巨树高空的鸟类智慧生物，部落分散，性格温顺，可接受星际文明的物资馈赠，无武装反抗能力。"
    },
    {
        id: 30,
        dimension: "星际原始文明",
        name: "地下熔岩原始种族",
        danger: "中高",
        techLevel: "1级地底文明",
        desc: "生存在行星熔岩洞穴的高温耐受种族，掌握地热锻造，若外来文明开采地底资源，会发起大规模地下突袭。"
    }
];

// 存入本地持久化
function saveDB() {
    localStorage.setItem("universeDB", JSON.stringify(universeData));
}

// ====================== DOM元素 ======================
const dimList = document.getElementById("dimList");
const archiveBox = document.getElementById("archiveBox");
const pageBox = document.getElementById("pageBox");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// 弹窗
const addModal = document.getElementById("addModal");
const detailModal = document.getElementById("detailModal");
const historyModal = document.getElementById("historyModal");
const closeAdd = document.querySelector(".closeAdd");
const closeDetail = document.querySelector(".closeDetail");
const closeHistory = document.querySelector(".closeHistory");

const addBtn = document.getElementById("addBtn");
const historyBtn = document.getElementById("historyBtn");
const submitNew = document.getElementById("submitNew");

// 新增表单输入
const inpDim = document.getElementById("inpDim");
const inpName = document.getElementById("inpName");
const inpDanger = document.getElementById("inpDanger");
const inpTech = document.getElementById("inpTech");
const inpDesc = document.getElementById("inpDesc");

const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const historyList = document.getElementById("historyList");

const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

// 分页全局变量
let currentPage = 1;
let filterList = [...universeData];
let activeDim = "全部";

// ====================== 星空背景 ======================
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let starArr = [];
function createStar() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2,
        speed: Math.random() * 0.5 + 0.1
    }
}
for(let i=0; i<300; i++) starArr.push(createStar());

function drawStar() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#0ff";
    starArr.forEach(star=>{
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI*2);
        ctx.fill();
        star.y += star.speed;
        if(star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random()*canvas.width;
        }
    })
    requestAnimationFrame(drawStar);
}
drawStar();

// ====================== 侧边维度导航 ======================
const allDims = [...new Set(universeData.map(item=>item.dimension))];
function renderDimNav() {
    dimList.innerHTML = "";
    const allLi = document.createElement("li");
    allLi.textContent = "全部维度";
    if(activeDim === "全部") allLi.classList.add("active");
    allLi.onclick = ()=>{
        activeDim = "全部";
        renderDimNav();
        filterList = [...universeData];
        currentPage = 1;
        renderArchive();
    }
    dimList.appendChild(allLi);

    allDims.forEach(dim=>{
        const li = document.createElement("li");
        li.textContent = dim;
        if(activeDim === dim) li.classList.add("active");
        li.onclick = ()=>{
            activeDim = dim;
            renderDimNav();
            filterList = universeData.filter(item=>item.dimension === dim);
            currentPage = 1;
            renderArchive();
        }
        dimList.appendChild(li);
    })
}

// ====================== 渲染档案卡片 + 分页 ======================
function renderArchive() {
    archiveBox.innerHTML = "";
    pageBox.innerHTML = "";
    const total = filterList.length;
    if(total === 0) {
        archiveBox.innerHTML = "<p style='font-size:20px;'>未检索到对应群星种族档案</p>";
        return;
    }
    const totalPage = Math.ceil(total / PAGE_SIZE);
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageData = filterList.slice(start, start + PAGE_SIZE);

    pageData.forEach(item=>{
        const card = document.createElement("div");
        const dangerCls = dangerClassMap[item.danger];
        card.className = `universe-card ${dangerCls}`;
        card.innerHTML = `
            <h2>${item.name}</h2>
            <p>文明维度：${item.dimension}</p>
            <p>危险等级：${item.danger}</p>
            <p>文明层级：${item.techLevel}</p>
        `;
        card.onclick = function() {
            this.classList.add("pulse-active");
            setTimeout(()=>this.classList.remove("pulse-active"),400);
            openDetail(item);
        }
        archiveBox.appendChild(card);
    })

    // 生成分页按钮
    for(let i=1;i<=totalPage;i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if(i === currentPage) btn.classList.add("active-page");
        btn.onclick = ()=>{
            currentPage = i;
            renderArchive();
        }
        pageBox.appendChild(btn);
    }
}

// ====================== 详情弹窗 ======================
function openDetail(data) {
    modalTitle.textContent = `【${data.name}】群星完整种族档案`;
    modalBody.innerHTML = `
        <p><strong>文明维度：</strong>${data.dimension}</p>
        <p><strong>种族编号：</strong>ST-${data.id}</p>
        <p><strong>危险评级：</strong>${data.danger}</p>
        <p><strong>文明层级：</strong>${data.techLevel}</p>
        <p><strong>种族档案记录：</strong>${data.desc}</p>
    `;
    detailModal.style.display = "block";
    // 写入浏览记录
    let history = JSON.parse(localStorage.getItem("viewHistory")) || [];
    history.push(data);
    localStorage.setItem("viewHistory", JSON.stringify(history));
}

// ====================== 浏览记录弹窗 ======================
function renderHistory() {
    historyList.innerHTML = "";
    const history = JSON.parse(localStorage.getItem("viewHistory")) || [];
    if(history.length === 0) {
        historyList.innerHTML = "<p>暂无访问种族记录</p>";
        return;
    }
    history.forEach(item=>{
        const div = document.createElement("div");
        div.className = "history-item";
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>维度：${item.dimension} | 危险：${item.danger}</p>
            <p>${item.desc.slice(0,60)}...</p>
        `;
        historyList.appendChild(div);
    })
}

// ====================== 新增种族档案提交 ======================
submitNew.onclick = function() {
    const dim = inpDim.value.trim();
    const name = inpName.value.trim();
    const danger = inpDanger.value;
    const tech = inpTech.value.trim();
    const desc = inpDesc.value.trim();
    if(!dim || !name || !tech || !desc) {
        alert("所有档案字段必须填写完整！");
        return;
    }
    // 生成新ID
    const newId = universeData.length > 0 ? Math.max(...universeData.map(d=>d.id)) + 1 : 1;
    const newItem = {
        id: newId,
        dimension: dim,
        name: name,
        danger: danger,
        techLevel: tech,
        desc: desc
    };
    universeData.push(newItem);
    saveDB();
    allDims.length = 0;
    allDims.push(...new Set(universeData.map(i=>i.dimension)));
    renderDimNav();
    filterList = [...universeData];
    currentPage = 1;
    renderArchive();
    // 清空表单、关闭弹窗
    inpDim.value = "";
    inpName.value = "";
    inpTech.value = "";
    inpDesc.value = "";
    addModal.style.display = "none";
}

// ====================== 搜索功能 ======================
searchBtn.onclick = doSearch;
searchInput.addEventListener("keydown", e=>{
    if(e.key === "Enter") doSearch();
})
function doSearch() {
    const key = searchInput.value.trim().toLowerCase();
    if(!key) {
        filterList = [...universeData];
        currentPage = 1;
        renderArchive();
        return;
    }
    filterList = universeData.filter(item=>
        item.name.toLowerCase().includes(key) ||
        item.desc.toLowerCase().includes(key) ||
        item.dimension.toLowerCase().includes(key)
    );
    currentPage = 1;
    renderArchive();
}

// ====================== 弹窗开关事件 ======================
addBtn.onclick = ()=> addModal.style.display = "block";
historyBtn.onclick = ()=>{
    renderHistory();
    historyModal.style.display = "block";
}
closeAdd.onclick = ()=> addModal.style.display = "none";
closeDetail.onclick = ()=> detailModal.style.display = "none";
closeHistory.onclick = ()=> historyModal.style.display = "none";

window.onclick = (e)=> {
    if(e.target === addModal) addModal.style.display = "none";
    if(e.target === detailModal) detailModal.style.display = "none";
    if(e.target === historyModal) historyModal.style.display = "none";
}

// ====================== 初始化页面 ======================
renderDimNav();
renderArchive();
createStarfield();