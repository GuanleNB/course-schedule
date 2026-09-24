const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const storageKey = "editable-course-schedule-v2";
const systemKey = "course-schedule-system-settings";
const timeLabelsKey = "course-schedule-time-labels";
const sectionTimeVersionKey = "course-schedule-section-time-version";
const termStartDateKey = "course-schedule-term-start-date";
const termsStorageKey = "course-schedule-terms-v1";
const mobileStartDateMigrationKey = "course-schedule-mobile-start-date-2026-09-07-v1";
const screenshotSeedKey = "hbue-screenshot-courses-v1";
const verifiedScheduleKey = "verified-complete-schedule-2026-v1";
const startHour = 1;
const endHour = 21;
const rowHeight = 72;
const defaultSectionTimes = [
  ["08:00", "08:45"], ["08:50", "09:35"], ["09:50", "10:35"], ["10:40", "11:25"], ["11:30", "12:15"],
  ["14:00", "14:45"], ["14:50", "15:35"], ["15:50", "16:35"], ["16:40", "17:25"], ["18:30", "19:15"],
  ["19:20", "20:05"], ["20:10", "20:55"], ["21:35", "22:20"], ["21:45", "22:30"], ["21:55", "22:40"],
  ["22:05", "22:50"], ["22:15", "23:00"], ["22:25", "23:10"], ["22:35", "23:20"], ["22:45", "23:30"],
]; 
const legacySectionTimes = [
  ["08:00", "08:45"], ["08:55", "09:40"], ["10:10", "10:55"], ["11:05", "11:50"], ["12:00", "12:45"],
  ["14:00", "14:45"], ["14:55", "15:40"], ["16:00", "16:45"], ["16:55", "17:40"], ["19:00", "19:45"],
  ["19:55", "20:40"], ["20:50", "21:35"],
];

const defaultCourses = [
  {
    id: crypto.randomUUID(),
    name: "高等数学",
    teacher: "张老师",
    location: "一教 302",
    day: 1,
    startTime: "08:00",
    endTime: "09:40",
    weeks: "1-16",
    content: "函数与极限",
    color: "#3a7bd5",
  },
  {
    id: crypto.randomUUID(),
    name: "大学英语",
    teacher: "李老师",
    location: "三教 204",
    day: 3,
    startTime: "10:10",
    endTime: "11:50",
    weeks: "1-8,10-16",
    content: "精读与口语练习",
    color: "#2fbf9b",
  },
  {
    id: crypto.randomUUID(),
    name: "程序设计实验",
    teacher: "王老师",
    location: "机房 B506",
    day: 5,
    startTime: "14:00",
    endTime: "16:30",
    weeks: "2-15",
    content: "每周实验主题可在详情里修改",
    color: "#f16f5c",
  },
];

let termStore = loadTermStore();
removeLegacyDemoCourses();
applyVerifiedSchedule();
let courses = getActiveTerm().courses;

function applyVerifiedSchedule() {
  if (localStorage.getItem(verifiedScheduleKey) === "done") return;
  const rows = [
    ["\u5d4c\u5165\u5f0f\u7cfb\u7edf\u8bbe\u8ba1", 1, 3, 5, "1-16", "S2-404\u7269\u8054\u7f51\u5de5\u7a0b\u5ba4", "\u738b\u91d1\u5ead"],
    ["\u3010\u8c03\u3011\u9a6c\u514b\u601d\u4e3b\u4e49\u57fa\u672c\u539f\u7406", 1, 6, 7, "1-16", "J2-111", "\u9ad8\u5b66\u7434"],
    ["\u9ad8\u9636\u7efc\u5408\u5927\u5b66\u82f1\u8bed", 1, 8, 9, "9-16", "T2-113", "\u9ec4\u5b87\u5c97"],
    ["\u6570\u636e\u5e93\u4e0e\u4fe1\u606f\u7cfb\u7edf", 2, 1, 2, "1-2,4,6,8,10,12,14,16", "J1-204", "\u674e\u82d7"],
    ["\u6570\u636e\u5e93\u4e0e\u4fe1\u606f\u7cfb\u7edf", 2, 1, 2, "3,5,7,9,11,13,15", "S2-410\u8f6f\u4ef6\u5de5\u7a0b\u5b9e\u9a8c\u5ba42", "\u674e\u82d7"],
    ["\u590d\u53d8\u51fd\u6570", 2, 3, 4, "1-16", "J1-302", "\u674e\u4fca"],
    ["\u521b\u65b0\u521b\u4e1a\u57fa\u7840", 2, 6, 7, "1-2,4-5,7-8,10-11,13-14,16", "J1-109", "\u5f20\u52c7"],
    ["\u521b\u65b0\u521b\u4e1a\u57fa\u7840", 2, 6, 7, "3,6,9,12,15", "S1-412\u7ecf\u8425\u7ba1\u7406\u7efc\u5408\u4eff\u771f\u5b9e\u9a8c\u5ba4", "\u5f20\u52c7"],
    ["\u4fe1\u606f\u68c0\u7d22", 2, 8, 9, "1-8", "J1-318", "\u90ed\u5f69\u5a1f"],
    ["\u6570\u5b57\u7d20\u517b\u4e0e\u5b9e\u8df5", 2, 8, 9, "9", "J1-318", "\u9648\u73b2"],
    ["\u6570\u5b57\u7d20\u517b\u4e0e\u5b9e\u8df5", 2, 8, 9, "10-12,16", "J1-318", "\u90ed\u5f69\u5a1f"],
    ["\u6570\u5b57\u7d20\u517b\u4e0e\u5b9e\u8df5", 2, 8, 9, "13", "J1-318", "\u738b\u5955\u6708"],
    ["\u6570\u5b57\u7d20\u517b\u4e0e\u5b9e\u8df5", 2, 8, 9, "14-15", "J1-318", "\u8d3e\u8559"],
    ["\u6cd5\u5f8b\u4e0e\u793e\u4f1a", 2, 10, 11, "1-4", "J1-110", "\u8d75\u6e05"],
    ["\u6cd5\u5f8b\u4e0e\u793e\u4f1a", 2, 10, 11, "5-8", "J1-110", "\u4f55\u65b0\u65b0"],
    ["\u666e\u901a\u7269\u7406", 3, 3, 5, "1-16", "J1-210", "\u5e05\u6676"],
    ["\u5355\u7247\u673a\u539f\u7406\u4e0e\u5e94\u7528", 3, 10, 12, "1-5,7,9,11,13,15-16", "J1-106", "\u8d75\u5a49\u51dd"],
    ["\u5355\u7247\u673a\u539f\u7406\u4e0e\u5e94\u7528", 3, 10, 12, "6,8,10,12,14", "S2-403\u786c\u4ef6\u6280\u672f\u5b9e\u9a8c\u5ba4", "\u8d75\u5a49\u51dd"],
    ["\u5de5\u7a0b\u5236\u56fe", 4, 1, 2, "1-16", "S2-311\u6570\u5b57\u91d1\u878d\u667a\u80fd\u5b9e\u9a8c\u5ba4", "\u9648\u83b9"],
    ["\u5927\u5b66\u4f53\u80b2(3)", 4, 3, 4, "1-16", "\u4e1c\u7bee01", "\u5f20\u658c"],
    ["\u7ebf\u6027\u4ee3\u6570", 4, 10, 12, "1-16", "J1-305", "\u7530\u5c18"],
    ["\u3010\u8c03\u3011\u9a6c\u514b\u601d\u4e3b\u4e49\u57fa\u672c\u539f\u7406", 5, 1, 2, "2,4,6,8,10,12,14,16", "J1-107", "\u9ad8\u5b66\u7434"],
    ["\u6bdb\u6cfd\u4e1c\u601d\u60f3\u548c\u4e2d\u56fd\u7279\u8272\u793e\u4f1a\u4e3b\u4e49\u7406\u8bba\u4f53\u7cfb\u6982\u8bba", 5, 8, 9, "1-16", "J2-111", "\u9648\u6653\u7433"],
    ["\u6a21\u62df\u7535\u5b50\u6280\u672f\u8bfe\u7a0b\u8bbe\u8ba1", 6, 6, 9, "1-8", "S2-402\u7535\u5b50\u6280\u672f\u5b9e\u9a8c\u5ba4", "\u6c88\u7530"],
  ];
  getActiveTerm().courses = rows.map(([name, day, startSection, endSection, weeks, location, teacher]) => ({
    id: crypto.randomUUID(),
    name, teacher, location, day, startSection, endSection, weeks, content: "",
    startTime: defaultSectionTimes[startSection - 1][0],
    endTime: defaultSectionTimes[endSection - 1][1],
    color: pickCourseColor(name),
  }));
  localStorage.setItem(termsStorageKey, JSON.stringify(termStore));
  localStorage.setItem(verifiedScheduleKey, "done");
  localStorage.setItem(screenshotSeedKey, "verified");
}

function removeLegacyDemoCourses() {
  let changed = false;
  termStore.terms.forEach((term) => {
    const before = term.courses.length;
    term.courses = term.courses.filter((course) => {
      const name = String(course.name || "").replace(/\s+/g, "");
      const teacher = String(course.teacher || "").replace(/\s+/g, "");
      const location = String(course.location || "").replace(/\s+/g, "");
      const content = String(course.content || "").replace(/\s+/g, "");
      return !(
        Number(course.day) === 3 &&
        name === "\u5927\u5b66\u82f1\u8bed" &&
        teacher === "\u674e\u8001\u5e08" &&
        location === "\u4e09\u6559204" &&
        content === "\u7cbe\u8bfb\u4e0e\u53e3\u8bed\u7ec3\u4e60"
      );
    });
    if (term.courses.length !== before) changed = true;
  });
  if (changed) localStorage.setItem(termsStorageKey, JSON.stringify(termStore));
}

const grid = document.querySelector("#scheduleGrid");
const termMenu = document.querySelector("#termMenu");
const termMenuTrigger = document.querySelector("#termMenuTrigger");
const termMenuList = document.querySelector("#termMenuList");
const activeTermName = document.querySelector("#activeTermName");
const timeRail = document.querySelector("#timeRail");
const weekInput = document.querySelector("#weekInput");
const termStartDateInput = document.querySelector("#termStartDate");
const jumpDateInput = document.querySelector("#jumpDate");
const weekParity = document.querySelector("#weekParity");
const previousWeekButton = document.querySelector("#previousWeekButton");
const nextWeekButton = document.querySelector("#nextWeekButton");
const searchInput = document.querySelector("#searchInput");
const stats = document.querySelector("#stats");
const scheduleTitle = document.querySelector("h1");
const courseDialog = document.querySelector("#courseDialog");
const importDialog = document.querySelector("#importDialog");
const courseForm = document.querySelector("#courseForm");
const importForm = document.querySelector("#importForm");
const openSystemButton = document.querySelector("#openSystemButton");
const importConfirmStep = document.querySelector("#importConfirmStep");
const confirmImportButton = document.querySelector("#confirmImportButton");
const importStatus = document.querySelector("#importStatus");
const deleteButton = document.querySelector("#deleteCourseButton");
const sectionSettingsDialog = document.createElement("dialog");
sectionSettingsDialog.className = "course-dialog";
sectionSettingsDialog.innerHTML = `<form method="dialog" class="dialog-card" id="sectionSettingsForm"><header><h2>节次设置</h2><button class="icon-button" type="button" id="closeSectionSettingsButton">×</button></header><div class="form-grid"><label><span>每节课时长（分钟）</span><input id="sectionDuration" type="number" min="1" max="180" value="45" required></label><label><span>基准节次</span><select id="baseSection"></select></label><label><span>基准开始时间</span><input id="baseStartTime" type="time" value="18:30" required></label></div><footer><button class="ghost-button" type="button" id="cancelSectionSettingsButton">取消</button><button class="primary-button" type="submit">保存设置</button></footer></form>`;
document.body.append(sectionSettingsDialog);

// Keep the primary add action available even if another optional control fails during startup.
document.querySelector("#addCourseButton")?.addEventListener("click", (event) => {
  event.stopImmediatePropagation();
  try {
    openCourseDialog();
  } catch (error) {
    console.error("Unable to open course dialog", error);
    courseDialog.setAttribute("open", "");
  }
}, true);

init();

function init() {
  weekInput.type = "text";
  weekInput.inputMode = "numeric";
  applySectionSettings();
  migrateCourseSections();
  setupSectionInputs();
  // Remove the old placeholder that was mistakenly shown as a Monday course.
  const invalidPlaceholderCount = courses.length;
  courses = courses.filter((course) => {
    if (course.name === "J1-305") return false;
    return !(Number(course.day) === 1 && toMinutes(course.startTime) < toMinutes("09:50"));
  });
  if (courses.length !== invalidPlaceholderCount) {
    getActiveTerm().courses = courses;
    persistTermStore();
  }
  if (localStorage.getItem(sectionTimeVersionKey) !== "v3") {
    localStorage.removeItem(timeLabelsKey);
    localStorage.setItem(sectionTimeVersionKey, "v3");
  }
  scheduleTitle.contentEditable = "true";
  scheduleTitle.role = "textbox";
  scheduleTitle.setAttribute("aria-label", "课程表名称");
  scheduleTitle.spellcheck = false;
  scheduleTitle.textContent = localStorage.getItem("course-schedule-title") || scheduleTitle.textContent;
  renderTermOptions();
  restoreTermStartDate();
  buildTimeRail();
  renderSchedule();
  bindEvents();
  restoreSystemSettings();
}

const screenshotCourses = [
  { name: "嵌入式系统设计", day: 1, sections: "3-5", weeks: "1-16", location: "S2-404物联网工程室", teacher: "王金庭" },
  { name: "马克思主义基本原理", day: 1, sections: "6-7", weeks: "1-16", location: "J2-111", teacher: "高学琴" },
  { name: "高阶综合大学英语", day: 1, sections: "8-9", weeks: "9-16", location: "J2-113", teacher: "黄宇钢" },
  { name: "数据库与信息系统", day: 2, sections: "1-2", weeks: "3-15单", location: "S2-410软件工程实验室2", teacher: "李苗" },
  { name: "复变函数", day: 2, sections: "3-4", weeks: "1-16", location: "J1-302", teacher: "李俊" },
  { name: "创新创业基础", day: 2, sections: "6-7", weeks: "1-2,4-5,7-8,10-11,13-14,16", location: "J1-109", teacher: "张勇" },
  { name: "创新创业基础", day: 2, sections: "6-7", weeks: "3,6,9,12,15", location: "S1-412经营管理综合仿真实验室", teacher: "张勇" },
  { name: "数字素养与实践", day: 2, sections: "8-9", weeks: "9", location: "T1-318", teacher: "陈玲" },
  { name: "数字素养与实践", day: 2, sections: "8-9", weeks: "10-12,16", location: "T1-318", teacher: "郭彩娟" },
  { name: "数字素养与实践", day: 2, sections: "8-9", weeks: "13", location: "T1-318", teacher: "王奕月" },
  { name: "数字素养与实践", day: 2, sections: "8-9", weeks: "14-15", location: "T1-318", teacher: "罗赛" },
  { name: "法律与社会", day: 2, sections: "10-11", weeks: "1-4", location: "J1-110", teacher: "赵清" },
  { name: "普通物理", day: 3, sections: "3-5", weeks: "1-16", location: "J1-210", teacher: "卯晶晶" },
  { name: "单片机原理与应用", day: 3, sections: "10-12", weeks: "1-5,7-15单,16", location: "J1-106", teacher: "赵婷婷" },
  { name: "单片机原理与应用", day: 3, sections: "10-12", weeks: "6-14双", location: "S2-403硬件技术实验室", teacher: "赵婷婷" },
  { name: "工程制图", day: 4, sections: "1-2", weeks: "1-16", location: "S2-311数字孪生智能实验室", teacher: "陈莹" },
  { name: "大学体育（3）", day: 4, sections: "3-4", weeks: "1-16", location: "东篮01", teacher: "张澍" },
  { name: "线性代数", day: 4, sections: "10-12", weeks: "1-16", location: "J1-305", teacher: "田生" },
  { name: "马克思主义基本原理", day: 5, sections: "1-2", weeks: "2-16双", location: "J1-107", teacher: "高学琴" },
  { name: "毛泽东思想和中国特色社会主义理论体系概论", day: 5, sections: "8-9", weeks: "1-16", location: "J2-111", teacher: "陈晓琳" },
];
// The verified complete schedule above replaces all legacy screenshot seeds.

function seedScreenshotCourses() {
  if (localStorage.getItem(screenshotSeedKey) === "v3") return;
  const existingKeys = new Set(courses.map(getCourseDedupeKey));
  const seeded = screenshotCourses.map((item) => {
    const time = detectSectionTime(`${item.sections}节`);
    if (!time?.startTime || !time?.endTime) return null;
    return {
      id: crypto.randomUUID(),
      name: item.name,
      teacher: item.teacher,
      location: item.location,
      day: item.day,
      startTime: time.startTime,
      endTime: time.endTime,
      weeks: normalizeWeeks(item.weeks),
      content: "",
      color: pickCourseColor(item.name),
    };
  }).filter((course) => course && !existingKeys.has(getCourseDedupeKey(course)));
  courses = [...courses, ...seeded];
  getActiveTerm().courses = courses;
  persistTermStore();
  localStorage.setItem(screenshotSeedKey, "v3");
}

function repairScheduleData() {
  const before = courses.length;
  courses = courses.filter((course) => {
    const name = String(course.name || "").replace(/[\s\u200b]+/g, "").trim();
    const isWeekOnlyPlaceholder = /^[（(]?\d+[）)]?周$/.test(name) || /^\d+周次?$/.test(name);
    const hasNoDetails = !String(course.teacher || "").trim() && !String(course.location || "").trim();
    return !(isWeekOnlyPlaceholder || (name.includes("周") && hasNoDetails));
  });
  const hasInformationRetrieval = courses.some((course) =>
    Number(course.day) === 2 && String(course.name).includes("信息检索") && String(course.weeks) === "1-8"
  );
  if (!hasInformationRetrieval) {
    courses.push({
      id: crypto.randomUUID(),
      name: "\u4fe1\u606f\u68c0\u7d22",
      teacher: "\u90ed\u5f69\u5a1f",
      location: "J1-318",
      day: 2,
      startTime: defaultSectionTimes[7][0],
      endTime: defaultSectionTimes[8][1],
      weeks: "1-8",
      content: "",
      color: pickCourseColor("\u4fe1\u606f\u68c0\u7d22"),
    });
  }
  if (courses.length !== before || !hasInformationRetrieval) {
    getActiveTerm().courses = courses;
    persistTermStore();
  }
  normalizeKnownCourseSections();
}

function normalizeKnownCourseSections() {
  const knownSections = new Map([
    ["\u4fe1\u606f\u68c0\u7d22|2", [8, 9]],
    ["\u6570\u5b57\u7d20\u517b\u4e0e\u5b9e\u8df5|2", [8, 9]],
    ["\u6cd5\u5f8b\u4e0e\u793e\u4f1a|2", [10, 11]],
    ["\u5355\u7247\u673a\u539f\u7406\u4e0e\u5e94\u7528|3", [10, 12]],
    ["\u7ebf\u6027\u4ee3\u6570|4", [10, 12]],
    ["\u5d4c\u5165\u5f0f\u7cfb\u7edf\u8bbe\u8ba1|1", [3, 5]],
    ["\u9a6c\u514b\u601d\u4e3b\u4e49\u57fa\u672c\u539f\u7406|1", [6, 7]],
    ["\u9ad8\u9636\u7efc\u5408\u5927\u5b66\u82f1\u8bed|1", [8, 9]],
    ["\u6570\u636e\u5e93\u4e0e\u4fe1\u606f\u7cfb\u7edf|2", [1, 2]],
    ["\u590d\u53d8\u51fd\u6570|2", [3, 4]],
    ["\u521b\u65b0\u521b\u4e1a\u57fa\u7840|2", [6, 7]],
    ["\u666e\u901a\u7269\u7406|3", [3, 5]],
    ["\u5de5\u7a0b\u5236\u56fe|4", [1, 2]],
    ["\u5927\u5b66\u4f53\u80b2\uff083\uff09|4", [3, 4]],
  ]);
  let changed = false;
  courses = courses.map((course) => {
    const sections = knownSections.get(`${String(course.name).trim()}|${Number(course.day)}`);
    if (!sections) return course;
    const [startSection, endSection] = sections;
    if (course.startSection === startSection && course.endSection === endSection) return course;
    changed = true;
    return { ...course, startSection, endSection, startTime: defaultSectionTimes[startSection - 1][0], endTime: defaultSectionTimes[endSection - 1][1] };
  });
  const seen = new Set();
  courses = courses.filter((course) => {
    const key = [course.name, course.day, course.startSection, course.endSection, course.weeks, course.location, course.teacher].join("|");
    if (seen.has(key)) { changed = true; return false; }
    seen.add(key);
    return true;
  });
  if (changed) {
    getActiveTerm().courses = courses;
    persistTermStore();
  }
}

function bindEvents() {
  const settingsButton = document.createElement("button");
  settingsButton.className = "ghost-button";
  settingsButton.type = "button";
  settingsButton.textContent = "节次设置";
  settingsButton.addEventListener("click", openSectionSettings);
  document.querySelector("#addCourseButton")?.before(settingsButton);
  sectionSettingsDialog.querySelector("#closeSectionSettingsButton").addEventListener("click", () => sectionSettingsDialog.close());
  sectionSettingsDialog.querySelector("#cancelSectionSettingsButton").addEventListener("click", () => sectionSettingsDialog.close());
  sectionSettingsDialog.querySelector("#sectionSettingsForm").addEventListener("submit", saveSectionSettings);
  scheduleTitle.addEventListener("blur", saveScheduleTitle);
  scheduleTitle.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      scheduleTitle.blur();
    }
  });
  termMenuTrigger.addEventListener("click", toggleTermMenu);
  document.addEventListener("click", (event) => {
    if (!termMenu.contains(event.target)) closeTermMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeTermMenu();
  });
  document.querySelector("#addTermButton").addEventListener("click", createTerm);
  document.querySelector("#addCourseButton").addEventListener("click", () => openCourseDialog());
  document.querySelector("#importButton").addEventListener("click", () => {
    importDialog.showModal();
    document.querySelector("#systemUrl").focus();
  });
  document.querySelector("#closeDialogButton").addEventListener("click", closeCourseDialog);
  document.querySelector("#cancelDialogButton").addEventListener("click", closeCourseDialog);
  document.querySelector("#closeImportButton").addEventListener("click", () => importDialog.close());
  const commitWeekInput = () => {
    const week = Math.min(30, Math.max(1, Number(weekInput.value) || 1));
    weekInput.value = String(week).padStart(2, "0");
    renderSchedule();
  };
  weekInput.addEventListener("blur", commitWeekInput);
  weekInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      commitWeekInput();
      weekInput.blur();
    }
  });
  termStartDateInput.addEventListener("change", () => {
    if (termStartDateInput.value) {
      getActiveTerm().startDate = termStartDateInput.value;
      persistTermStore();
    }
    jumpDateInput.value = termStartDateInput.value;
    weekInput.value = 1;
    renderSchedule();
  });
  jumpDateInput.addEventListener("change", jumpToDate);
  previousWeekButton.addEventListener("click", () => changeWeek(-1));
  nextWeekButton.addEventListener("click", () => changeWeek(1));
  searchInput.addEventListener("input", renderSchedule);
  courseForm.addEventListener("submit", saveCourse);
  importForm.addEventListener("submit", openAcademicSystem);
  confirmImportButton.addEventListener("click", confirmAcademicImport);
  deleteButton.addEventListener("click", deleteCourse);
}

function applySectionSettings() {
  const saved = JSON.parse(localStorage.getItem("course-schedule-section-settings") || "null");
  if (!saved) return;
  const duration = Number(saved.duration) || 45;
  const base = Math.min(20, Math.max(1, Number(saved.base) || 10)) - 1;
  const start = toMinutes(saved.start || "18:30");
  for (let index = base; index < defaultSectionTimes.length; index += 1) {
    const begin = start + (index - base) * duration;
    defaultSectionTimes[index] = [minutesToTime(begin), minutesToTime(begin + duration)];
  }
}

function migrateCourseSections() {
  let changed = false;
  courses = courses.map((course) => {
    if (Number.isInteger(course.startSection) && Number.isInteger(course.endSection)) return course;
    const startSection = nearestSectionBoundary(toMinutes(course.startTime), "start") + 1;
    const endSection = Math.max(startSection, nearestSectionBoundary(toMinutes(course.endTime), "end") + 1);
    changed = true;
    return { ...course, startSection, endSection };
  });
  if (changed) {
    getActiveTerm().courses = courses;
    persistTermStore();
  }
}

function openSectionSettings() {
  const select = sectionSettingsDialog.querySelector("#baseSection");
  if (!select.options.length) for (let section = 1; section <= 20; section += 1) select.add(new Option(`第 ${section} 节`, section));
  const saved = JSON.parse(localStorage.getItem("course-schedule-section-settings") || "null");
  sectionSettingsDialog.querySelector("#sectionDuration").value = saved?.duration || 45;
  select.value = saved?.base || 10;
  sectionSettingsDialog.querySelector("#baseStartTime").value = saved?.start || "18:30";
  sectionSettingsDialog.showModal();
}

function saveSectionSettings(event) {
  event.preventDefault();
  const settings = { duration: Number(sectionSettingsDialog.querySelector("#sectionDuration").value), base: Number(sectionSettingsDialog.querySelector("#baseSection").value), start: sectionSettingsDialog.querySelector("#baseStartTime").value };
  localStorage.setItem("course-schedule-section-settings", JSON.stringify(settings));
  applySectionSettings();
  buildTimeRail();
  sectionSettingsDialog.close();
  renderSchedule();
}

function saveScheduleTitle() {
  const title = scheduleTitle.textContent.replace(/[\r\n]+/g, " ").trim() || "可编辑每周课程表";
  scheduleTitle.textContent = title;
  localStorage.setItem("course-schedule-title", title);
}

function buildTimeRail() {
  timeRail.innerHTML = "<div></div>";
  const savedLabels = loadValidTimeLabels();
  for (let hour = startHour; hour < endHour; hour += 1) {
    const marker = document.createElement("div");
    const defaultRange = defaultSectionTimes[hour - 1] || ["00:00", "00:45"];
    const defaultLabel = defaultRange[0];
    const startLabel = savedLabels[hour] || defaultLabel;
    marker.dataset.startTime = startLabel;
    marker.dataset.endTime = defaultRange[1];
    renderTimeMarker(marker, hour, startLabel, defaultRange[1]);
    marker.className = "time-marker";
    marker.tabIndex = 0;
    marker.title = "单击修改时间";
    marker.setAttribute("role", "button");
    marker.setAttribute("aria-label", marker.textContent + "，单击修改时间");
    marker.addEventListener("click", () => editTimeMarker(marker, hour, defaultLabel));
    marker.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        editTimeMarker(marker, hour, defaultLabel);
      }
    });
    timeRail.append(marker);
  }
}

function loadValidTimeLabels() {
  let savedLabels = {};
  try {
    savedLabels = JSON.parse(localStorage.getItem(timeLabelsKey) || "{}");
  } catch {
    localStorage.removeItem(timeLabelsKey);
    return {};
  }

  const values = [];
  for (let hour = startHour; hour < endHour; hour += 1) {
    const defaultLabel = String(hour).padStart(2, "0") + ":00";
    const value = savedLabels[hour] || defaultLabel;
    if (!/^\d{2}:\d{2}$/.test(value)) {
      localStorage.removeItem(timeLabelsKey);
      return {};
    }
    values.push(value);
  }

  const isOrdered = values.every((value, index) => {
    if (index === 0) return true;
    return toMinutes(value) > toMinutes(values[index - 1]);
  });
  if (!isOrdered) {
    localStorage.removeItem(timeLabelsKey);
    return {};
  }
  return savedLabels;
}

function editTimeMarker(marker, hour, defaultLabel) {
  if (marker.querySelector("input")) return;
  const previousValue = marker.dataset.startTime || defaultLabel;
  const [previousHour, previousMinute] = (/^\d{2}:\d{2}$/.test(previousValue) ? previousValue : defaultLabel).split(":");
  const editor = document.createElement("span");
  editor.className = "time-marker-editor";
  const hourInput = createTimePartInput(previousHour, "小时", 0, 23);
  const separator = document.createElement("span");
  separator.className = "time-marker-separator";
  separator.textContent = ":";
  const minuteInput = createTimePartInput(previousMinute, "分钟", 0, 59);
  const pickerInput = document.createElement("input");
  pickerInput.type = "time";
  pickerInput.className = "time-picker-input";
  pickerInput.value = previousHour + ":" + previousMinute;
  const bounds = getTimeMarkerBounds(marker);
  if (bounds.minimum) pickerInput.min = bounds.minimum;
  if (bounds.maximum) pickerInput.max = bounds.maximum;
  pickerInput.tabIndex = -1;
  pickerInput.setAttribute("aria-hidden", "true");
  const pickerButton = document.createElement("button");
  pickerButton.type = "button";
  pickerButton.className = "time-picker-button";
  pickerButton.textContent = "◷";
  pickerButton.title = "选择时间";
  pickerButton.setAttribute("aria-label", "打开时间选择器");
  pickerButton.addEventListener("click", (event) => {
    event.stopPropagation();
    pickerInput.value = clampTimePart(hourInput.value, 0, 23) + ":" + clampTimePart(minuteInput.value, 0, 59);
    pickerInput.showPicker?.();
    if (!pickerInput.showPicker) pickerInput.click();
  });
  pickerInput.addEventListener("input", () => {
    if (!pickerInput.value) return;
    const [selectedHour, selectedMinute] = pickerInput.value.split(":");
    hourInput.value = selectedHour;
    minuteInput.value = selectedMinute;
  });
  editor.append(hourInput, separator, minuteInput, pickerButton, pickerInput);
  marker.textContent = "";
  marker.append(editor);
  hourInput.focus();
  hourInput.select();

  let finished = false;
  const finishEditing = (save = true) => {
    if (finished) return;
    const validHour = clampTimePart(hourInput.value, 0, 23);
    const validMinute = clampTimePart(minuteInput.value, 0, 59);
    const nextValue = save ? validHour + ":" + validMinute : previousValue;
    if (save) {
      const validationMessage = validateTimeMarkerOrder(marker, nextValue);
      if (validationMessage) {
        editor.classList.add("has-error");
        editor.setAttribute("data-error", validationMessage);
        const [restoredHour, restoredMinute] = previousValue.split(":");
        hourInput.value = restoredHour;
        minuteInput.value = restoredMinute;
        pickerInput.value = previousValue;
        hourInput.focus();
        hourInput.select();
        return;
      }
    }
    finished = true;
    marker.dataset.startTime = nextValue;
    renderTimeMarker(marker, hour, nextValue, marker.dataset.endTime || defaultSectionTimes[hour - 1][1]);
    marker.setAttribute("aria-label", `${hour}，${nextValue}-${marker.dataset.endTime}，单击修改时间`);
    if (!save) return;
    const savedLabels = JSON.parse(localStorage.getItem(timeLabelsKey) || "{}");
    savedLabels[hour] = nextValue;
    localStorage.setItem(timeLabelsKey, JSON.stringify(savedLabels));
  };

  editor.addEventListener("focusout", () => {
    setTimeout(() => {
      if (!editor.contains(document.activeElement)) finishEditing(true);
    }, 0);
  });
  editor.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      finishEditing(true);
    }
    if (event.key === "Escape") {
      event.preventDefault();
      finishEditing(false);
    }
    if (event.key === ":" && event.target === hourInput) {
      event.preventDefault();
      minuteInput.focus();
      minuteInput.select();
    }
  });
}

function renderTimeMarker(marker, section, startTime, endTime) {
  marker.textContent = `${section}\n${startTime}-${endTime}`;
}

function getTimeMarkerBounds(marker) {
  const markers = [...timeRail.querySelectorAll(".time-marker")];
  const index = markers.indexOf(marker);
  const previousValue = markers[index - 1]?.dataset.startTime;
  const nextValue = markers[index + 1]?.dataset.startTime;
  return {
    minimum: previousValue ? minutesToTime(toMinutes(previousValue) + 1) : "00:00",
    maximum: nextValue ? minutesToTime(toMinutes(nextValue) - 1) : "23:59",
  };
}

function minutesToTime(totalMinutes) {
  const safeMinutes = Math.min(23 * 60 + 59, Math.max(0, totalMinutes));
  const hours = Math.floor(safeMinutes / 60);
  const minutes = safeMinutes % 60;
  return String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0");
}

function validateTimeMarkerOrder(marker, nextValue) {
  const markers = [...timeRail.querySelectorAll(".time-marker")];
  const index = markers.indexOf(marker);
  const previousMarker = markers[index - 1];
  const nextMarker = markers[index + 1];
  const nextMinutes = toMinutes(nextValue);
  const previousMinutes = previousMarker ? toMinutes(previousMarker.dataset.startTime) : -1;
  const followingMinutes = nextMarker ? toMinutes(nextMarker.dataset.startTime) : 24 * 60;
  if (nextMinutes <= previousMinutes) return `必须晚于 ${previousMarker.dataset.startTime}`;
  if (nextMinutes >= followingMinutes) return `必须早于 ${nextMarker.dataset.startTime}`;
  return "";
}

function createTimePartInput(value, label, min, max) {
  const input = document.createElement("input");
  input.type = "text";
  input.inputMode = "numeric";
  input.className = "time-part-input";
  input.value = value;
  input.maxLength = 2;
  input.setAttribute("aria-label", label);
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 2);
    if (input.value.length === 2 && Number(input.value) >= min && Number(input.value) <= max) {
      const nextInput = input.parentElement.querySelector(`input[aria-label="${label === "小时" ? "分钟" : ""}"]`);
      nextInput?.focus();
      nextInput?.select();
    }
  });
  return input;
}

function clampTimePart(value, min, max) {
  const number = Math.min(max, Math.max(min, Number(value) || 0));
  return String(number).padStart(2, "0");
}

function renderSchedule() {
  const week = Math.min(30, Math.max(1, Number(weekInput.value || 1)));
  weekInput.value = String(week).padStart(2, "0");
  getActiveTerm().currentWeek = week;
  persistTermStore();
  syncJumpDateToWeek(week);
  weekParity.textContent = week % 2 === 1 ? "单周" : "双周";
  weekParity.classList.toggle("is-even", week % 2 === 0);
  previousWeekButton.disabled = week <= 1;
  nextWeekButton.disabled = week >= 30;
  const query = searchInput.value.trim().toLowerCase();
  const visibleCourses = courses.filter((course) => {
    const searchable = `${course.name} ${course.teacher} ${course.location} ${course.content}`.toLowerCase();
    return isCourseInWeek(course.weeks, week) && (!query || searchable.includes(query));
  });

  grid.innerHTML = "";
  const weekDates = getWeekDates(week);
  days.forEach((day, index) => {
    const header = document.createElement("div");
    header.className = "day-header";
    const dayName = document.createElement("strong");
    dayName.textContent = day;
    const dateLabel = document.createElement("span");
    dateLabel.textContent = formatCalendarDate(weekDates[index]);
    header.append(dayName, dateLabel);
    grid.append(header);
  });

  for (let row = 0; row < endHour - startHour; row += 1) {
    for (let day = 1; day <= 7; day += 1) {
      const cell = document.createElement("div");
      cell.className = "grid-cell";
      cell.style.gridColumn = day;
      cell.style.gridRow = row + 2;
      cell.tabIndex = 0;
      cell.setAttribute("role", "button");
      cell.setAttribute("aria-label", `${days[day - 1]} ${getGridSlotTime(row).startTime} 添加课程`);
      const addFromCell = () => openCourseDialog(null, {
        day,
        startTime: getGridSlotTime(row).startTime,
        endTime: getGridSlotTime(row).endTime,
      });
      cell.addEventListener("click", addFromCell);
      cell.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          addFromCell();
        }
      });
      grid.append(cell);
    }
  }

  const sortedCourses = visibleCourses
    .slice()
    .sort((a, b) => a.day - b.day || getCourseSectionRange(a).start - getCourseSectionRange(b).start);
  const courseLayouts = buildCourseLayouts(sortedCourses);
  sortedCourses.forEach((course) => grid.append(createCourseCard(course, courseLayouts.get(course))));

  if (visibleCourses.length === 0) {
    const empty = document.querySelector("#emptyTemplate").content.cloneNode(true);
    empty.querySelector("[data-empty-add]").addEventListener("click", () => openCourseDialog());
    grid.append(empty);
  }

  const locationCount = new Set(visibleCourses.map((course) => course.location).filter(Boolean)).size;
  const rangeLabel = `${formatCalendarDate(weekDates[0])} - ${formatCalendarDate(weekDates[6])}`;
  stats.textContent = `第 ${week} 周 · ${rangeLabel}：${visibleCourses.length} 门课，${locationCount} 个地点`;
}

function restoreTermStartDate() {
  const activeTerm = getActiveTerm();
  if (
    window.matchMedia("(max-width: 840px)").matches &&
    localStorage.getItem(mobileStartDateMigrationKey) !== "done"
  ) {
    activeTerm.startDate = "2026-09-07";
    localStorage.setItem(mobileStartDateMigrationKey, "done");
    persistTermStore();
    termStartDateInput.value = activeTerm.startDate;
    jumpDateInput.value = activeTerm.startDate;
    return;
  }
  const savedDate = activeTerm.startDate;
  if (savedDate) {
    termStartDateInput.value = savedDate;
    jumpDateInput.value = savedDate;
    return;
  }
  const today = new Date();
  const day = today.getDay() || 7;
  today.setDate(today.getDate() - day + 1);
  termStartDateInput.value = toDateInputValue(today);
  jumpDateInput.value = termStartDateInput.value;
  activeTerm.startDate = termStartDateInput.value;
  persistTermStore();
}

function jumpToDate() {
  if (!jumpDateInput.value || !termStartDateInput.value) return;
  const termStart = new Date(`${termStartDateInput.value}T00:00:00`);
  const selectedDate = new Date(`${jumpDateInput.value}T00:00:00`);
  const dayDifference = Math.floor((selectedDate - termStart) / 86400000);
  const targetWeek = Math.floor(dayDifference / 7) + 1;
  if (targetWeek < 1 || targetWeek > 30) {
    jumpDateInput.setCustomValidity("该日期不在第 1 至第 30 周范围内");
    jumpDateInput.reportValidity();
    jumpDateInput.setCustomValidity("");
    syncJumpDateToWeek(Number(weekInput.value || 1));
    return;
  }
  weekInput.value = targetWeek;
  renderSchedule();
}

function syncJumpDateToWeek(week) {
  if (!termStartDateInput.value || document.activeElement === jumpDateInput) return;
  const weekStart = new Date(`${termStartDateInput.value}T00:00:00`);
  weekStart.setDate(weekStart.getDate() + (week - 1) * 7);
  jumpDateInput.value = toDateInputValue(weekStart);
}

function getWeekDates(week) {
  const start = new Date(`${termStartDateInput.value}T00:00:00`);
  start.setDate(start.getDate() + (week - 1) * 7);
  return days.map((_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

function formatCalendarDate(date) {
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getGridSlotTime(row) {
  const markers = [...timeRail.querySelectorAll(".time-marker")];
  const fallbackStart = defaultSectionTimes[row]?.[0] || "00:00";
  const startTime = markers[row]?.textContent.match(/\d{2}:\d{2}/)?.[0] || fallbackStart;
  const fallbackEnd = defaultSectionTimes[row]?.[1] || "23:59";
  const endTime = markers[row]?.dataset.endTime || fallbackEnd;
  return { startTime, endTime };
}

function changeWeek(delta) {
  const currentWeek = Number(weekInput.value || 1);
  weekInput.value = Math.min(30, Math.max(1, currentWeek + delta));
  const weekValue = weekInput.closest(".week-value");
  weekValue.classList.remove("is-changing");
  void weekValue.offsetWidth;
  weekValue.classList.add("is-changing");
  renderSchedule();
}

function getCourseSectionRange(course) {
  const start = Math.max(toMinutes(course.startTime), startHour * 60);
  const end = Math.min(toMinutes(course.endTime), endHour * 60);
  const startSection = Number.isInteger(course.startSection)
    ? course.startSection - 1
    : nearestSectionBoundary(start, "start");
  const endSection = Number.isInteger(course.endSection)
    ? course.endSection - 1
    : nearestSectionBoundary(end, "end");
  return { start: startSection, end: Math.max(startSection, endSection) };
}

function buildCourseLayouts(sortedCourses) {
  const layouts = new Map();
  for (let day = 1; day <= 7; day += 1) {
    const dayCourses = sortedCourses.filter((course) => Number(course.day) === day);
    const groups = [];
    dayCourses.forEach((course) => {
      const range = getCourseSectionRange(course);
      const group = groups.find((item) => range.start <= item.end);
      if (group) {
        group.courses.push(course);
        group.end = Math.max(group.end, range.end);
      } else {
        groups.push({ courses: [course], end: range.end });
      }
    });

    groups.forEach((group) => {
      const laneEnds = [];
      group.courses.forEach((course) => {
        const range = getCourseSectionRange(course);
        let lane = laneEnds.findIndex((end) => end < range.start);
        if (lane === -1) lane = laneEnds.length;
        laneEnds[lane] = range.end;
        layouts.set(course, { lane, laneCount: 1 });
      });
      const laneCount = Math.max(1, laneEnds.length);
      group.courses.forEach((course) => {
        layouts.get(course).laneCount = laneCount;
      });
    });
  }
  return layouts;
}

function createCourseCard(course, layout = { lane: 0, laneCount: 1 }) {
  const start = Math.max(toMinutes(course.startTime), startHour * 60);
  const end = Math.min(toMinutes(course.endTime), endHour * 60);
  const { start: startSection, end: endSection } = getCourseSectionRange(course);
  const displayStartTime = defaultSectionTimes[startSection]?.[0] || course.startTime;
  const displayEndTime = defaultSectionTimes[endSection]?.[1] || course.endTime;
  const rowStart = startSection + 2;
  const rowSpan = Math.max(endSection - startSection + 1, 1);

  const button = document.createElement("button");
  button.className = "course-card";
  button.type = "button";
  button.style.setProperty("--card-color", course.color || "#3a7bd5");
  button.style.gridColumn = course.day;
  button.style.gridRow = `${rowStart} / span ${rowSpan}`;
  button.style.setProperty("--course-lane", layout.lane);
  button.style.setProperty("--course-lane-count", layout.laneCount);
  button.innerHTML = `
    <strong>${escapeHtml(course.name)}</strong>
    <span class="course-time">第 ${startSection + 1}-${endSection + 1} 节</span>
    <span class="week-badge">${formatWeeks(course.weeks)}</span>
    <span>${escapeHtml(course.teacher || "未填写老师")}</span>
    <span>${escapeHtml(course.location || "未填写地点")}</span>
    ${course.content ? `<span class="content">${escapeHtml(course.content)}</span>` : ""}
  `;
  button.addEventListener("click", () => openCourseDialog(course));
  return button;
}

function nearestSectionBoundary(minutes, boundary) {
  let best = 0;
  let distance = Infinity;
  defaultSectionTimes.map((range, index) => ({ range, index })).forEach(({ range, index }) => {
    const current = Math.abs(toMinutes(range[boundary === "start" ? 0 : 1]) - minutes);
    if (current < distance) {
      distance = current;
      best = index;
    }
  });
  return best;
}

function openCourseDialog(course = null, defaults = {}) {
  if (!document.querySelector("#startSection")) setupSectionInputs();
  courseForm.reset();
  document.querySelector("#dialogTitle").textContent = course ? "编辑课程" : "添加课程";
  deleteButton.hidden = !course;

  const values = course || {
    id: "",
    name: "",
    teacher: "",
    location: "",
    day: defaults.day || 1,
    startTime: defaults.startTime || "08:00",
    endTime: defaults.endTime || "09:40",
    weeks: String(weekInput.value || 1),
    content: "",
    color: "#3a7bd5",
  };

  setValue("courseId", values.id);
  setValue("courseName", values.name);
  setValue("teacher", values.teacher);
  setValue("location", values.location);
  setValue("day", String(values.day));
  setValue("startSection", String(nearestSectionBoundary(toMinutes(values.startTime), "start") + 1));
  setValue("endSection", String(nearestSectionBoundary(toMinutes(values.endTime), "end") + 1));
  setValue("weeks", values.weeks);
  setValue("content", values.content);
  setValue("color", values.color || "#3a7bd5");
  try {
    if (courseDialog.open) courseDialog.close();
    if (typeof courseDialog.showModal === "function") courseDialog.showModal();
    else courseDialog.setAttribute("open", "");
  } catch (error) {
    console.error("Unable to show course dialog", error);
    courseDialog.setAttribute("open", "");
  }
}

function closeCourseDialog() {
  courseDialog.close();
}

function setupSectionInputs() {
  const startField = document.querySelector("#startTime")?.closest("label");
  const endField = document.querySelector("#endTime")?.closest("label");
  if (!startField || !endField) return;
  startField.hidden = true;
  endField.hidden = true;
  document.querySelector(".notes-field")?.remove();
  if (document.querySelector("#startSection")) return;
  const weeksField = document.querySelector("#weeks")?.closest("label");
  if (!weeksField) return;
  const makeField = (id, text) => {
    const label = document.createElement("label");
    const title = document.createElement("span");
    title.textContent = text;
    const select = document.createElement("select");
    select.id = id;
    select.required = true;
    for (let section = 1; section <= 20; section += 1) {
      const option = document.createElement("option");
      option.value = String(section);
      option.textContent = `第 ${section} 节`;
      select.append(option);
    }
    label.append(title, select);
    return label;
  };
  weeksField.before(makeField("startSection", "开始节次"), makeField("endSection", "结束节次"));
}

// The section selectors are part of the static form; only populate them once.
function setupSectionInputs() {
  ["startSection", "endSection"].forEach((id) => {
    const select = document.querySelector(`#${id}`);
    if (!select || select.options.length) return;
    for (let section = 1; section <= 20; section += 1) {
      const option = document.createElement("option");
      option.value = String(section);
      option.textContent = `第 ${section} 节`;
      select.append(option);
    }
  });
}

function saveCourse(event) {
  event.preventDefault();
  const startSection = Number(getValue("startSection"));
  const endSection = Number(getValue("endSection"));
  if (endSection < startSection) {
    alert("结束节次不能早于开始节次");
    return;
  }
  const startTime = defaultSectionTimes[startSection - 1][0];
  const endTime = defaultSectionTimes[endSection - 1][1];

  if (toMinutes(endTime) <= toMinutes(startTime)) {
    alert("结束时间必须晚于开始时间。");
    return;
  }

  const course = {
    id: getValue("courseId") || crypto.randomUUID(),
    name: getValue("courseName"),
    teacher: getValue("teacher"),
    location: getValue("location"),
    day: Number(getValue("day")),
    startSection,
    endSection,
    startTime,
    endTime,
    weeks: normalizeWeeks(getValue("weeks")),
    content: getValue("content"),
    color: getValue("color"),
  };

  const index = courses.findIndex((item) => item.id === course.id);
  if (index >= 0) {
    courses[index] = course;
  } else {
    courses.push(course);
  }

  persistCourses();
  closeCourseDialog();
  renderSchedule();
}

function deleteCourse() {
  const id = getValue("courseId");
  if (!id) return;
  courses = courses.filter((course) => course.id !== id);
  persistCourses();
  closeCourseDialog();
  renderSchedule();
}

function openAcademicSystem(event) {
  event.preventDefault();
  const input = document.querySelector("#systemUrl");
  let url = input.value.trim();
  if (!url) return;
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;
  try {
    const parsedUrl = new URL(url);
    input.value = parsedUrl.href;
    localStorage.setItem(systemKey, JSON.stringify({ url: parsedUrl.href }));
    window.open(parsedUrl.href, "_blank", "noopener,noreferrer");
    openSystemButton.textContent = "重新打开教务系统";
    importConfirmStep.hidden = false;
    confirmImportButton.focus();
  } catch {
    input.setCustomValidity("请输入正确的教务系统网址");
    input.reportValidity();
    input.setCustomValidity("");
  }
}

async function confirmAcademicImport() {
  confirmImportButton.disabled = true;
  confirmImportButton.textContent = "正在读取...";
  importStatus.textContent = "正在读取剪贴板中的课表...";
  try {
    const startedAt = performance.now();
    const clipboard = await readScheduleFromClipboard();
    if (!clipboard.html.trim() && !clipboard.text.trim()) throw new Error("empty");
    confirmImportButton.textContent = "正在识别...";
    importStatus.textContent = "正在识别星期、节次、周次、地点和教师...";
    await new Promise((resolve) => requestAnimationFrame(resolve));
    let imported = clipboard.html.trim() ? recognizeSchedule(clipboard.html) : [];
    if (imported.length === 0 && clipboard.text.trim()) imported = recognizeSchedule(clipboard.text);
    if (imported.length === 0) {
      importStatus.textContent = "已读取课表，但没有找到符合格式的课程。";
      alert("没有识别到课程，请在教务系统课表页面全选并复制后重试。");
      return;
    }
    imported = dedupeCourses(imported).map((course) => ({ ...course, source: "academic-system" }));
    const existingKeys = new Set(courses.map(getCourseDedupeKey));
    const newCourses = imported.filter((course) => !existingKeys.has(getCourseDedupeKey(course)));
    courses = [...courses, ...newCourses];
    persistCourses();
    renderSchedule();
    const elapsed = Math.max(1, Math.round(performance.now() - startedAt));
    importStatus.textContent = `识别完成：${imported.length} 条课程规则，新增 ${newCourses.length} 条，用时 ${elapsed}ms。`;
    importDialog.close();
    alert(`已识别 ${imported.length} 条课程规则，新增 ${newCourses.length} 条。`);
  } catch (error) {
    importStatus.textContent = error?.message === "empty" ? "剪贴板中没有课表内容。" : "读取剪贴板失败。";
    alert("无法读取课表。请在教务系统课表页面按 Ctrl+A、Ctrl+C，再回到这里点击确认导入。");
  } finally {
    confirmImportButton.disabled = false;
    confirmImportButton.textContent = "确认导入课程表";
  }
}

async function readScheduleFromClipboard() {
  const clipboard = { html: "", text: "" };
  if (navigator.clipboard.read) {
    const items = await navigator.clipboard.read();
    const item = items.find((entry) => entry.types.includes("text/html") || entry.types.includes("text/plain"));
    if (!item) return clipboard;
    const [htmlBlob, textBlob] = await Promise.all([
      item.types.includes("text/html") ? item.getType("text/html") : null,
      item.types.includes("text/plain") ? item.getType("text/plain") : null,
    ]);
    const [html, text] = await Promise.all([htmlBlob?.text() || "", textBlob?.text() || ""]);
    clipboard.html = html;
    clipboard.text = text;
    return clipboard;
  }
  clipboard.text = await navigator.clipboard.readText();
  return clipboard;
}

async function readClipboardSchedule() {
  try {
    const items = await navigator.clipboard.read();
    for (const item of items) {
      if (item.types.includes("text/html")) {
        pasteInput.value = await (await item.getType("text/html")).text();
        importHint.textContent = "已读取剪贴板 HTML 课表，可以点击识别并导入。";
        return;
      }
      if (item.types.includes("text/plain")) {
        pasteInput.value = await (await item.getType("text/plain")).text();
        importHint.textContent = "已读取剪贴板文本课表，可以点击识别并导入。";
        return;
      }
    }
  } catch {
    try {
      pasteInput.value = await navigator.clipboard.readText();
      importHint.textContent = "已读取剪贴板文本课表，可以点击识别并导入。";
    } catch {
      alert("浏览器没有授予剪贴板权限，请手动粘贴教务系统课表内容。");
    }
  }
}

function importRecognizedSchedule(event) {
  event.preventDefault();
  const source = pasteInput.value.trim();
  if (!source) {
    alert("请先粘贴或读取教务系统课表内容。");
    return;
  }

  const imported = recognizeSchedule(source);
  if (imported.length === 0) {
    alert("暂时没有识别到课程。请尽量复制包含周几、节次/时间、周次、教师、地点的课表区域。");
    return;
  }

  courses = [...courses, ...imported];
  persistCourses();
  importDialog.close();
  renderSchedule();
  alert(`已识别并导入 ${imported.length} 条课程规则。切换周次即可查看每周差异。`);
}

function recognizeSchedule(source) {
  const normalizedSource = String(source || "").trim();
  if (!normalizedSource) return [];
  if (/<table[\s>]/i.test(normalizedSource)) {
    const htmlCourses = parseHtmlSchedule(normalizedSource);
    if (htmlCourses.length > 0) return dedupeCourses(htmlCourses);
    const doc = new DOMParser().parseFromString(normalizedSource, "text/html");
    return dedupeCourses(parseTextSchedule(doc.body.innerText || doc.body.textContent || ""));
  }
  return dedupeCourses(parseTextSchedule(normalizedSource));
}

function parseHtmlSchedule(source) {
  const doc = new DOMParser().parseFromString(source, "text/html");
  const tables = [...doc.querySelectorAll("table")];
  const candidates = tables
    .map((table) => ({ table, score: scoreScheduleTable(table) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);
  for (const { table } of candidates.slice(0, 3)) {
    const courses = parseTable(table);
    if (courses.length > 0) return courses;
  }
  return [];
}

function scoreScheduleTable(table) {
  const firstRows = [...table.rows].slice(0, 8);
  const headerText = firstRows.map((row) => row.textContent || "").join(" ");
  const dayCount = days.filter((day) => headerText.includes(day.replace("周", "星期")) || headerText.includes(day)).length;
  if (dayCount < 5) return 0;
  const id = `${table.id} ${table.className}`.toLowerCase();
  const blockCount = table.querySelectorAll(".timetable_con, [class*=timetable_con], .kbcontent").length;
  return dayCount * 100 + blockCount * 20 + (/kbgrid|timetable|kbcx/.test(id) ? 500 : 0);
}

function parseTable(table) {
  const hbueCourses = parseHbueScheduleTable(table);
  if (hbueCourses.length > 0) return hbueCourses;

  const rows = expandHtmlTable(table);
  if (rows.length === 0) return [];

  const dayColumns = detectDayColumns(rows);
  const coursesFromGrid = [];
  rows.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      const day = dayColumns[columnIndex];
      if (!day || !looksLikeCourse(cell)) return;
      const time = detectTimeForRow(rows, rowIndex, row) || detectTimeFromText(cell);
      coursesFromGrid.push(...courseBlocksToCourses(cell, { day, ...time }));
    });
  });

  if (coursesFromGrid.length > 0) return coursesFromGrid;
  return parseRowsAsRecords(rows);
}

function parseHbueScheduleTable(table) {
  const cellRows = expandHtmlCellTable(table);
  if (cellRows.length === 0) return [];
  const textRows = cellRows.map((row) => row.map((cell) => cleanText(cell?.textContent || "")));
  const dayColumns = detectDayColumns(textRows);
  if (Object.keys(dayColumns).length < 5) return [];

  const seenCells = new Set();
  const courses = [];
  cellRows.forEach((row) => {
    row.forEach((cell, columnIndex) => {
      const day = dayColumns[columnIndex];
      if (!cell || !day || seenCells.has(cell)) return;
      seenCells.add(cell);
      courses.push(...parseHbueCourseCell(cell, day));
    });
  });
  return courses;
}

function expandHtmlCellTable(table) {
  const rows = [];
  const occupied = [];
  [...table.rows].forEach((sourceRow, rowIndex) => {
    rows[rowIndex] ||= [];
    occupied[rowIndex] ||= [];
    let columnIndex = 0;
    [...sourceRow.cells].forEach((cell) => {
      while (occupied[rowIndex][columnIndex]) columnIndex += 1;
      const rowSpan = Math.max(1, Number(cell.rowSpan) || 1);
      const columnSpan = Math.max(1, Number(cell.colSpan) || 1);
      for (let rowOffset = 0; rowOffset < rowSpan; rowOffset += 1) {
        const targetRow = rowIndex + rowOffset;
        rows[targetRow] ||= [];
        occupied[targetRow] ||= [];
        for (let columnOffset = 0; columnOffset < columnSpan; columnOffset += 1) {
          const targetColumn = columnIndex + columnOffset;
          rows[targetRow][targetColumn] = cell;
          occupied[targetRow][targetColumn] = true;
        }
      }
      columnIndex += columnSpan;
    });
  });
  const width = Math.max(0, ...rows.map((row) => row.length));
  return rows.map((row) => Array.from({ length: width }, (_, index) => row[index] || null));
}

function parseHbueCourseCell(cell, day) {
  const structuredBlocks = getDirectCourseBlocks(cell);
  if (structuredBlocks.length > 0) {
    return structuredBlocks.map((block) => parseHbueStructuredBlock(block, day)).filter(Boolean);
  }
  const lines = getHbueCellLines(cell);
  return lines.map((scheduleLine, index) => {
    if (!/\d{1,2}\s*[-至到~—]\s*\d{1,2}\s*节/.test(scheduleLine) || !/\d{1,2}\s*[-至到~—]\s*\d{1,2}\s*周/.test(scheduleLine)) return null;
    const name = cleanHbueField(lines[index - 1] || "").replace(/[★☆]+$/g, "").trim();
    const location = cleanHbueField(lines[index + 1] || "");
    const teacher = cleanHbueField(lines[index + 2] || "");
    const sectionTime = detectSectionTime(scheduleLine);
    const weeks = normalizeWeeks(extractWeeks(scheduleLine));
    if (!name || !sectionTime?.startTime || !sectionTime?.endTime || !weeks) return null;
    return {
      id: crypto.randomUUID(),
      name,
      teacher,
      location,
      day,
      startTime: sectionTime.startTime,
      endTime: sectionTime.endTime,
      weeks,
      content: "",
      color: pickCourseColor(name),
    };
  }).filter(Boolean);
}

function getDirectCourseBlocks(cell) {
  const blocks = [...cell.querySelectorAll(".timetable_con, [class*=timetable_con], .kbcontent")];
  return blocks.filter((block) => !blocks.some((other) => other !== block && other.contains(block)));
}

function parseHbueStructuredBlock(block, day) {
  const lines = getHbueCellLines(block);
  const titledFields = [...block.querySelectorAll("[title]")];
  const name = cleanCourseName(
    cleanHbueField(block.querySelector(".title, [class*=title]")?.textContent || "") ||
    getTitledField(titledFields, ["课程名称", "课程"]) ||
    lines[0] || "",
  );
  const scheduleLine = getTitledField(titledFields, ["周次", "节次", "上课时间"]) ||
    lines.find((line) => /\d{1,2}\s*[-至到~—]\s*\d{1,2}\s*节/.test(line) && /周/.test(line)) || "";
  const scheduleIndex = lines.indexOf(scheduleLine);
  const location = getTitledField(titledFields, ["上课地点", "教室", "地点"]) || cleanHbueField(lines[scheduleIndex + 1] || "");
  const teacher = getTitledField(titledFields, ["教师", "老师"]) || cleanHbueField(lines[scheduleIndex + 2] || "");
  const sectionTime = detectSectionTime(scheduleLine);
  const weeks = normalizeWeeks(extractWeeks(scheduleLine));
  if (!name || !sectionTime?.startTime || !sectionTime?.endTime || !weeks) return null;
  return {
    id: crypto.randomUUID(), name, teacher, location, day,
    startTime: sectionTime.startTime, endTime: sectionTime.endTime, weeks,
    content: "", color: pickCourseColor(name),
  };
}

function getTitledField(nodes, keywords) {
  const node = nodes.find((item) => keywords.some((keyword) => String(item.title || "").includes(keyword)));
  if (!node) return "";
  const ownText = cleanHbueField(node.textContent || "");
  if (ownText) return ownText;
  return cleanHbueField(node.parentElement?.textContent || "");
}

function cleanCourseName(value) {
  return cleanHbueField(value).replace(/[★☆]+$/g, "").trim();
}

function getHbueCellLines(cell) {
  const clone = cell.cloneNode(true);
  clone.querySelectorAll("br").forEach((element) => element.replaceWith(document.createTextNode("\n")));
  clone.querySelectorAll("div, p, li, a").forEach((element) => element.append(document.createTextNode("\n")));
  return String(clone.textContent || "")
    .split(/\r?\n/)
    .map(cleanHbueField)
    .filter((line) => line && !/^[★☆◆●■]+$/.test(line));
}

function cleanHbueField(value) {
  return cleanText(value)
    .replace(/^[\uE000-\uF8FF\s]+/g, "")
    .replace(/^[◷⌚⏱📍👤🏠]+\s*/u, "")
    .trim();
}

function expandHtmlTable(table) {
  const rows = [];
  const occupied = [];
  [...table.rows].forEach((sourceRow, rowIndex) => {
    rows[rowIndex] ||= [];
    occupied[rowIndex] ||= [];
    let columnIndex = 0;
    [...sourceRow.cells].forEach((cell) => {
      while (occupied[rowIndex][columnIndex]) columnIndex += 1;
      const text = cleanText(cell.innerText || cell.textContent);
      const rowSpan = Math.max(1, Number(cell.rowSpan) || 1);
      const columnSpan = Math.max(1, Number(cell.colSpan) || 1);
      for (let rowOffset = 0; rowOffset < rowSpan; rowOffset += 1) {
        const targetRow = rowIndex + rowOffset;
        rows[targetRow] ||= [];
        occupied[targetRow] ||= [];
        for (let columnOffset = 0; columnOffset < columnSpan; columnOffset += 1) {
          const targetColumn = columnIndex + columnOffset;
          rows[targetRow][targetColumn] = text;
          occupied[targetRow][targetColumn] = true;
        }
      }
      columnIndex += columnSpan;
    });
  });
  const width = Math.max(0, ...rows.map((row) => row.length));
  return rows.map((row) => Array.from({ length: width }, (_, index) => row[index] || ""));
}

function detectDayColumns(rows) {
  const columns = {};
  rows.slice(0, 8).forEach((row) => {
    row.forEach((cell, index) => {
      const day = parseDayHeader(cell);
      if (day) columns[index] = day;
    });
  });
  return columns;
}

function parseDayHeader(value) {
  const text = String(value).trim();
  if (!/(?:周|星期|礼拜)[一二三四五六日天1-7]/.test(text) && !/^[一二三四五六日天]$/.test(text)) return null;
  return parseDay(text);
}

function detectTimeForRow(rows, rowIndex, row) {
  const nearby = [row[0], row[1], rows[rowIndex - 1]?.[0], rows[rowIndex - 1]?.[1]].filter(Boolean).join(" ");
  return detectTimeFromText(nearby) || detectSectionTime(nearby);
}

function parseRowsAsRecords(rows) {
  const headers = rows[0].map(normalizeHeader);
  return rows.slice(1).map((row) => rowToCourse(headers, row)).filter(Boolean);
}

function parseTextSchedule(source) {
  const doc = stripHtml(source);
  const lines = doc.split(/\r?\n/).map(cleanText).filter(Boolean);
  const tabRows = lines.filter((line) => line.includes("\t")).map((line) => line.split("\t").map(cleanText));
  const tableRecords = tabRows.length > 1 ? parseTextGrid(tabRows) : [];
  const paragraphRecords = lines.flatMap((line) => courseBlocksToCourses(line, detectContextFromLine(line)));
  return [...tableRecords, ...paragraphRecords];
}

function parseTextGrid(rows) {
  const dayColumns = detectDayColumns(rows);
  const courses = [];
  rows.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      const day = dayColumns[columnIndex];
      if (!day || !looksLikeCourse(cell)) return;
      const time = detectTimeForRow(rows, rowIndex, row) || detectTimeFromText(cell) || detectSectionTime(cell);
      courses.push(...courseBlocksToCourses(cell, { day, ...time }));
    });
  });
  return courses.length ? courses : parseRowsAsRecords(rows);
}

function courseBlocksToCourses(text, context = {}) {
  const normalized = cleanText(text);
  if (!looksLikeCourse(normalized)) return [];

  const blocks = splitCourseBlocks(normalized);
  return blocks.map((block) => parseCourseBlock(block, context)).filter(Boolean);
}

function splitCourseBlocks(text) {
  return text
    .split(/(?=\S+?(?:第?\d+[-至到~]\d+周|\d+[-至到~]\d+周|单周|双周))/)
    .map(cleanText)
    .filter((part) => part.length >= 4);
}

function parseCourseBlock(block, context = {}) {
  const day = context.day || parseDay(block);
  const time = detectTimeFromText(block) || context;
  const sectionTime = detectSectionTime(block) || context;
  const weeks = normalizeWeeks(extractWeeks(block));
  const startTime = time.startTime || sectionTime.startTime;
  const endTime = time.endTime || sectionTime.endTime;
  const name = extractName(block);

  if (!name || !day || !weeks || !startTime || !endTime) return null;

  return {
    id: crypto.randomUUID(),
    name,
    teacher: extractTeacher(block),
    location: extractLocation(block),
    day,
    startTime,
    endTime,
    weeks,
    content: extractContent(block),
    color: pickCourseColor(name),
  };
}

function detectContextFromLine(line) {
  return {
    day: parseDay(line),
    ...(detectTimeFromText(line) || detectSectionTime(line) || {}),
  };
}

function rowToCourse(headers, row) {
  const data = Object.fromEntries(headers.map((header, index) => [header, row[index]?.trim() || ""]));
  const name = data.name || data.course;
  const day = parseDay(data.day || data.weekday || data.time);
  const detected = detectTimeFromText(`${data.start || ""} ${data.end || ""} ${data.time || ""}`) || detectSectionTime(data.time || "");
  const weeks = normalizeWeeks(data.weeks || data.week || data.range || extractWeeks(Object.values(data).join(" ")));

  if (!name || !day || !detected?.startTime || !detected?.endTime || !weeks) return null;
  return {
    id: crypto.randomUUID(),
    name,
    teacher: data.teacher || data.instructor || extractTeacher(Object.values(data).join(" ")),
    location: data.location || data.room || extractLocation(Object.values(data).join(" ")),
    day,
    startTime: detected.startTime,
    endTime: detected.endTime,
    weeks,
    content: data.content || data.topic || "",
    color: pickCourseColor(name),
  };
}

function normalizeHeader(header) {
  const text = header.toLowerCase().replace(/\s+/g, "");
  const map = {
    课程名称: "name",
    课程: "name",
    老师: "teacher",
    教师: "teacher",
    任课老师: "teacher",
    地点: "location",
    教室: "location",
    上课地点: "location",
    星期: "day",
    周几: "day",
    时间: "time",
    上课时间: "time",
    开始时间: "start",
    结束时间: "end",
    下课时间: "end",
    周次: "weeks",
    适用周次: "weeks",
    内容: "content",
    课程内容: "content",
  };
  return map[text] || text;
}

function parseDay(value) {
  const text = String(value).trim();
  const exact = days.findIndex((day) => text.includes(day) || text.includes(day.replace("周", "星期")));
  if (exact >= 0) return exact + 1;
  const cnMap = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 日: 7, 天: 7 };
  const cnMatch = text.match(/[周星期]([一二三四五六日天])/);
  if (cnMatch) return cnMap[cnMatch[1]];
  const numberMatch = text.match(/(?:周|星期)?([1-7])/);
  return numberMatch ? Number(numberMatch[1]) : null;
}

function detectTimeFromText(value) {
  const text = String(value);
  const range = text.match(/(\d{1,2})[:：](\d{1,2})\s*[-至到~—]\s*(\d{1,2})[:：](\d{1,2})/);
  if (range) {
    return {
      startTime: `${range[1].padStart(2, "0")}:${range[2].padStart(2, "0")}`,
      endTime: `${range[3].padStart(2, "0")}:${range[4].padStart(2, "0")}`,
    };
  }

  const times = [...text.matchAll(/(\d{1,2})[:：](\d{1,2})/g)].map((match) => `${match[1].padStart(2, "0")}:${match[2].padStart(2, "0")}`);
  if (times.length >= 2) return { startTime: times[0], endTime: times[1] };
  return null;
}

function detectSectionTime(value) {
  const text = String(value);
  const match = text.match(/第?\s*(\d{1,2})\s*[-至到~]\s*(\d{1,2})\s*节/) || text.match(/第?\s*(\d{1,2})\s*节/);
  if (!match) return null;
  const startSection = Number(match[1]);
  const endSection = Number(match[2] || match[1]);
  const sectionTimes = Object.fromEntries(defaultSectionTimes.map((range, index) => [index + 1, range]));
  return {
    startTime: sectionTimes[startSection]?.[0],
    endTime: sectionTimes[endSection]?.[1],
  };
}

function extractWeeks(value) {
  const text = String(value);
  const matches = [...text.matchAll(/(?:第)?(\d{1,2})\s*[-至到~—]\s*(\d{1,2})\s*(?:周|周次)\s*(?:\((单|双)\)|（(单|双)）|\[(单|双)\]|【(单|双)】|\s*(单|双)周)?|(?:第)?(\d{1,2})\s*周/g)];
  if (matches.length === 0) return "";
  return matches.map((match) => {
    if (match[8]) return match[8];
    const parity = match[3] || match[4] || match[5] || match[6] || match[7] || "";
    return `${match[1]}-${match[2]}${parity ? parity : ""}`;
  }).join(",");
}

function normalizeWeeks(value) {
  const text = String(value).replace(/第|周/g, "").replace(/至|到|~/g, "-").replace(/，/g, ",").trim();
  if (!text) return "";
  return text.split(",").flatMap((part) => expandWeekPart(part.trim())).join(",");
}

function expandWeekPart(part) {
  if (!part) return [];
  const parity = part.includes("单") ? "odd" : part.includes("双") ? "even" : "";
  const cleaned = part.replace(/[单双]/g, "");
  const range = cleaned.match(/(\d{1,2})-(\d{1,2})/);
  if (!range) return [cleaned.replace(/[^0-9]/g, "")].filter(Boolean);
  const start = Number(range[1]);
  const end = Number(range[2]);
  if (!parity) return [`${start}-${end}`];
  const weeks = [];
  for (let week = start; week <= end; week += 1) {
    if ((parity === "odd" && week % 2 === 1) || (parity === "even" && week % 2 === 0)) weeks.push(String(week));
  }
  return weeks;
}

function isCourseInWeek(weeks, currentWeek) {
  return String(weeks)
    .split(",")
    .some((part) => {
      const clean = part.trim();
      if (!clean) return false;
      if (clean.includes("-")) {
        const [start, end] = clean.split("-").map(Number);
        return currentWeek >= start && currentWeek <= end;
      }
      return Number(clean) === currentWeek;
    });
}

function formatWeeks(weeks) {
  const parts = String(weeks).split(",").map((part) => part.trim()).filter(Boolean);
  const numbers = parts.flatMap((part) => {
    if (!part.includes("-")) return /^\d+$/.test(part) ? [Number(part)] : [];
    const [start, end] = part.split("-").map(Number);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }).filter(Number.isFinite).sort((a, b) => a - b);
  const unique = [...new Set(numbers)];
  if (unique.length >= 2) {
    const allOdd = unique.every((week) => week % 2 === 1);
    const allEven = unique.every((week) => week % 2 === 0);
    const consecutiveParity = unique.every((week, index) => index === 0 || week - unique[index - 1] === 2);
    if (consecutiveParity && (allOdd || allEven)) {
      return `第 ${unique[0]}-${unique.at(-1)} 周 · ${allOdd ? "单周" : "双周"}`;
    }
  }
  if (unique.length === 1) return `第 ${unique[0]} 周 · ${unique[0] % 2 === 1 ? "单周" : "双周"}`;
  return `第 ${weeks} 周 · 单双周`;
}

function extractName(block) {
  const cleaned = block
    .replace(/\d{1,2}[:：]\d{1,2}\s*[-至到~—]\s*\d{1,2}[:：]\d{1,2}/g, " ")
    .replace(/第?\d{1,2}\s*[-至到~]\s*\d{1,2}\s*节/g, " ")
    .replace(/(?:第)?\d{1,2}\s*[-至到~]\s*\d{1,2}\s*周(?:\([单双]\)|（[单双]）|[单双]周)?/g, " ")
    .replace(/(?:教师|老师|任课教师|地点|教室|上课地点)[:：]?[^\s]+/g, " ")
    .replace(/周[一二三四五六日天]/g, " ");
  const first = cleanText(cleaned).split(/[\s,，;；]/).find((part) => part.length >= 2);
  return first || "";
}

function extractTeacher(block) {
  return matchFirst(block, /(?:教师|老师|任课教师)[:：]?\s*([^\s,，;；]+)/) || "";
}

function extractLocation(block) {
  return matchFirst(block, /(?:地点|教室|上课地点)[:：]?\s*([^\s,，;；]+)/) || matchFirst(block, /([一二三四五六七八九十A-Za-z0-9-]*?(?:教|楼|馆|室|厅|机房|实验室)\s*[A-Za-z0-9-]*)/) || "";
}

function extractContent(block) {
  const content = matchFirst(block, /(?:内容|主题|备注)[:：]?\s*(.+)$/);
  return content ? cleanText(content) : "";
}

function matchFirst(text, regex) {
  const match = String(text).match(regex);
  return match ? cleanText(match[1]) : "";
}

function looksLikeCourse(text) {
  return /\d{1,2}\s*[-至到~]\s*\d{1,2}\s*周|\d{1,2}[:：]\d{1,2}|第?\d{1,2}\s*[-至到~]?\s*\d{0,2}\s*节|教师|老师|地点|教室/.test(text);
}

function stripHtml(source) {
  if (!source.includes("<")) return source;
  const doc = new DOMParser().parseFromString(source, "text/html");
  return doc.body.textContent || source;
}

function cleanText(value) {
  return String(value).replace(/\u00a0/g, " ").replace(/[\t ]+/g, " ").replace(/\s*\n\s*/g, " ").trim();
}

function dedupeCourses(items) {
  const seen = new Set();
  return items.filter((course) => {
    const key = getCourseDedupeKey(course);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getCourseDedupeKey(course) {
  return [course.name, course.day, course.startTime, course.endTime, course.weeks, course.location, course.teacher].join("|");
}

function loadCourses() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return defaultCourses;
  try {
    return JSON.parse(saved);
  } catch {
    return defaultCourses;
  }
}

function persistCourses() {
  getActiveTerm().courses = courses;
  persistTermStore();
}

function loadTermStore() {
  try {
    const savedStore = JSON.parse(localStorage.getItem(termsStorageKey) || "null");
    if (savedStore?.terms?.length && savedStore.activeTermId) return savedStore;
  } catch {
    localStorage.removeItem(termsStorageKey);
  }

  const legacyCourses = loadCourses();
  const legacyStartDate = localStorage.getItem(termStartDateKey) || "";
  const id = crypto.randomUUID();
  const store = {
    activeTermId: id,
    terms: [{ id, name: "当前学期", startDate: legacyStartDate, currentWeek: 1, courses: legacyCourses }],
  };
  localStorage.setItem(termsStorageKey, JSON.stringify(store));
  return store;
}

function getActiveTerm() {
  return termStore.terms.find((term) => term.id === termStore.activeTermId) || termStore.terms[0];
}

function persistTermStore() {
  localStorage.setItem(termsStorageKey, JSON.stringify(termStore));
}

function renderTermOptions() {
  termMenuList.innerHTML = "";
  activeTermName.textContent = getActiveTerm().name;
  termStore.terms.forEach((term) => {
    const row = document.createElement("div");
    row.className = "term-menu-item";
    row.setAttribute("role", "option");
    row.setAttribute("aria-selected", String(term.id === termStore.activeTermId));
    const selectButton = document.createElement("button");
    selectButton.type = "button";
    selectButton.className = "term-option-button";
    selectButton.textContent = term.name;
    selectButton.addEventListener("click", () => switchTerm(term.id));
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "term-option-delete";
    deleteButton.textContent = "×";
    deleteButton.title = `删除 ${term.name}`;
    deleteButton.setAttribute("aria-label", `删除 ${term.name}`);
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteTerm(term.id);
    });
    row.append(selectButton, deleteButton);
    termMenuList.append(row);
  });
}

function toggleTermMenu() {
  const willOpen = termMenuList.hidden;
  termMenuList.hidden = !willOpen;
  termMenuTrigger.setAttribute("aria-expanded", String(willOpen));
}

function closeTermMenu() {
  termMenuList.hidden = true;
  termMenuTrigger.setAttribute("aria-expanded", "false");
}

function switchTerm(termId) {
  getActiveTerm().courses = courses;
  getActiveTerm().currentWeek = Number(weekInput.value || 1);
  termStore.activeTermId = termId;
  const activeTerm = getActiveTerm();
  courses = activeTerm.courses;
  weekInput.value = activeTerm.currentWeek || 1;
  termStartDateInput.value = activeTerm.startDate || "";
  if (!termStartDateInput.value) restoreTermStartDate();
  jumpDateInput.value = termStartDateInput.value;
  persistTermStore();
  renderTermOptions();
  closeTermMenu();
  renderSchedule();
}

function createTerm() {
  const suggestedName = `${new Date().getFullYear()}-${new Date().getFullYear() + 1} 学期`;
  const name = prompt("请输入新学期名称", suggestedName)?.trim();
  if (!name) return;
  const id = crypto.randomUUID();
  termStore.terms.push({ id, name, startDate: "", currentWeek: 1, courses: [] });
  termStore.activeTermId = id;
  courses = [];
  renderTermOptions();
  weekInput.value = 1;
  termStartDateInput.value = "";
  restoreTermStartDate();
  jumpDateInput.value = termStartDateInput.value;
  persistTermStore();
  renderSchedule();
}

function deleteTerm(termId) {
  if (termStore.terms.length <= 1) {
    alert("至少需要保留一个学期。");
    return;
  }

  const termToDelete = termStore.terms.find((term) => term.id === termId);
  if (!termToDelete) return;
  const courseCount = termToDelete.courses.length;
  const courseDetail = courseCount > 0 ? `，其中有 ${courseCount} 条课程` : "";
  if (!confirm(`确定删除“${termToDelete.name}”吗${courseDetail}？此操作无法撤销。`)) return;

  const deletingActiveTerm = termId === termStore.activeTermId;
  termStore.terms = termStore.terms.filter((term) => term.id !== termId);
  if (deletingActiveTerm) {
    const nextTerm = termStore.terms[0];
    termStore.activeTermId = nextTerm.id;
    courses = nextTerm.courses;
    weekInput.value = nextTerm.currentWeek || 1;
    termStartDateInput.value = nextTerm.startDate || "";
    if (!termStartDateInput.value) restoreTermStartDate();
    jumpDateInput.value = termStartDateInput.value;
  }
  persistTermStore();
  renderTermOptions();
  closeTermMenu();
  renderSchedule();
}

function saveSystemSettings() {
  localStorage.setItem(
    systemKey,
    JSON.stringify({
      url: document.querySelector("#systemUrl").value.trim(),
      term: document.querySelector("#term").value.trim(),
    }),
  );
  alert("已保存系统信息。当前版本通过复制教务系统课表进行识别导入，后续可按学校接口继续扩展自动登录抓取。 ");
}

function restoreSystemSettings() {
  const saved = localStorage.getItem(systemKey);
  if (!saved) return;
  try {
    const settings = JSON.parse(saved);
    document.querySelector("#systemUrl").value = settings.url || "";
  } catch {
    localStorage.removeItem(systemKey);
  }
}

function loadSampleSchedule() {
  pasteInput.value = [
    "周一 第1-2节 高等数学 第1-8周 教师:张老师 地点:一教302 内容:函数与极限",
    "周一 第1-2节 高等数学 第9-16周 教师:张老师 地点:二教401 内容:微分应用",
    "周三 10:10-11:50 大学英语 1-16周 教师:李老师 教室:三教204",
    "周五 第5-7节 程序设计实验 第2-15周(双) 教师:王老师 地点:机房B506 内容:实验课",
  ].join("\n");
  importHint.textContent = "示例包含同一课程不同周次地点变化，以及双周课程。";
}

function pickCourseColor(seed) {
  const colors = ["#3a7bd5", "#2fbf9b", "#f16f5c", "#f0a83b", "#8665d8", "#1f9bb4"];
  const index = [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
}

function toMinutes(time) {
  const [hour, minute] = String(time).split(":").map(Number);
  return hour * 60 + minute;
}

function setValue(id, value) {
  document.querySelector(`#${id}`).value = value ?? "";
}

function getValue(id) {
  return document.querySelector(`#${id}`).value.trim();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
  }[char]));
}
