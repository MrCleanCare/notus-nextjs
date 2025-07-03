#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

// إعدادات عامة
const BACKUP_DIR = 'backup_clean_arch';
const EXCLUDE = ['node_modules', BACKUP_DIR, '.git'];

// دالة لنسخ الملفات والمجلدات بشكل متوافق مع جميع الأنظمة
function copyRecursiveSync(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(child => {
      copyRecursiveSync(path.join(src, child), path.join(dest, child));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// دالة لعمل نسخة احتياطية
function createBackup() {
  const date = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(BACKUP_DIR, `backup-${date}`);
  fs.mkdirSync(backupPath, { recursive: true });
  console.log(`\n[✔] تم إنشاء مجلد النسخ الاحتياطي: ${backupPath}`);
  // نسخ الملفات والمجلدات باستثناء المستثناة
  fs.readdirSync('.').forEach(item => {
    if (!EXCLUDE.includes(item)) {
      const src = path.join('.', item);
      const dest = path.join(backupPath, item);
      copyRecursiveSync(src, dest);
    }
  });
  return backupPath;
}

// دالة تحليل المشروع (مبسطة كبداية)
function analyzeProject() {
  console.log('\n[تحليل المشروع]');
  // تحليل style
  const hasTailwind = fs.existsSync('tailwind.config.js');
  const hasPostCSS = fs.existsSync('postcss.config.js');
  // تحليل SEO
  const hasRobots = fs.existsSync('public/robots.txt');
  const hasSitemap = fs.existsSync('public/sitemap.xml');
  // تحليل المكتبات
  const pkg = JSON.parse(fs.readFileSync('package.json'));
  const deps = Object.keys(pkg.dependencies || {});
  // تحليل الهيكل
  const hasComponents = fs.existsSync('components');
  const hasPages = fs.existsSync('pages');
  console.log(`- Tailwind: ${hasTailwind ? '✔' : '✗'}`);
  console.log(`- PostCSS: ${hasPostCSS ? '✔' : '✗'}`);
  console.log(`- Robots.txt: ${hasRobots ? '✔' : '✗'}`);
  console.log(`- Sitemap.xml: ${hasSitemap ? '✔' : '✗'}`);
  console.log(`- مكتبات: ${deps.join(', ')}`);
  console.log(`- مجلد components: ${hasComponents ? '✔' : '✗'}`);
  console.log(`- مجلد pages: ${hasPages ? '✔' : '✗'}`);
}

// عرض المنيو التفاعلي
function showMenu() {
  console.log(`\n----------------------------\nالقائمة الرئيسية (Main Menu)\n----------------------------\n`);
  console.log(`1- النسخ الاحتياطي / الاستعادة (Backup / Restore)\n2- إعدادات المستخدم (User Settings)\n3- إنشاء تصميم جديد (Create New Design)\n4- أداة الإصلاح الذكي (Fixing Tool)\n5- تحسين الترجمة + RTL (Translation + RTL Enhancement)\n6- تنظيف المشروع (Project Cleanup)\n7- تحسين النظام System Check (System Check)\n8- تحسين الأداء + SEO (Performance + SEO)\n9- تنظيف الهيكل + Clean Code (Clean Architecture)\n10- دعم Google Business Profile (GBP Support)\n11- Final Touch (Final Review)\n12- عمليات Git (Git Operations)\n`);
  console.log('----------------------------');
  console.log('اكتب رقم المهمة للتنفيذ (مثال: 3) أو "خروج" للخروج.');
}

// تنفيذ مهمة حسب الرقم
async function handleTask(num) {
  switch (num) {
    case '3':
      await createNewDesign();
      break;
    default:
      console.log('لم يتم تنفيذ هذه المهمة بعد.');
  }
}

// تنفيذ مهمة 3: إنشاء تصميم جديد
async function createNewDesign() {
  console.log('\n[3] إنشاء تصميم جديد');
  // تحقق من السلامة
  console.log('- التحقق من سلامة المشروع...');
  // حفظ نسخة احتياطية
  const backupPath = createBackup();
  // معالجة أخطاء التصميم تلقائيًا (placeholder)
  console.log('- معالجة أخطاء التصميم (تجريبي)...');
  // لا يتم تنفيذ أي تعديل فعلي بدون إذن المستخدم
  console.log('لن يتم تنفيذ أي تعديل إلا بأمر صريح منك.');
}

// Main
(async function main() {
  console.log('\n[مساعد إدارة وتحسين مشاريع Tailwind/Next.js]');
  // سؤال المستخدم: هل تريد إنشاء نسخة احتياطية الآن؟
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('هل تريد إنشاء نسخة احتياطية الآن؟ (y/n): ', async (backupAnswer) => {
    if (backupAnswer.trim().toLowerCase() === 'y' || backupAnswer.trim() === 'نعم') {
      try {
        createBackup();
      } catch (e) {
        console.log('حدث خطأ أثناء النسخ الاحتياطي:', e.message);
      }
    } else {
      console.log('تم تخطي النسخ الاحتياطي بناءً على طلبك.');
    }
    // 2. تحليل المشروع
    analyzeProject();
    // 3. عرض المنيو
    showMenu();
    // 4. انتظار إدخال المستخدم
    rl.question('> ', async (answer) => {
      if (answer.toLowerCase().includes('خروج')) {
        rl.close();
        return;
      }
      await handleTask(answer.trim());
      rl.close();
    });
  });
})(); 