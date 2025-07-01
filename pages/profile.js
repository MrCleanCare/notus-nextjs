import React, { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config';
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { useAuth } from '../utils/AuthContext';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}

export default function Profile() {
  const { t } = useTranslation('common');
  const { user, userName, userAvatar, role, loading } = useAuth();
  const router = useRouter();
  const [isRTL, setIsRTL] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(userName || '');
  const [newAvatar, setNewAvatar] = useState(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsRTL(document.documentElement.dir === 'rtl');
    }
  }, []);
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/login');
    }
  }, [user, loading]);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    let avatar_url = userAvatar;
    if (newAvatar) {
      // Upload avatar to Supabase Storage (avatars bucket)
      const fileExt = newAvatar.name.split('.').pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage.from('avatars').upload(fileName, newAvatar, { upsert: true });
      if (uploadError) {
        setError(t('avatar_upload_error', 'خطأ في رفع الصورة'));
        setSaving(false);
        return;
      }
      avatar_url = supabase.storage.from('avatars').getPublicUrl(fileName).data.publicUrl;
    }
    const { error: updateError } = await supabase.auth.updateUser({
      data: { name: newName, avatar_url },
    });
    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess(t('profile_updated', 'تم تحديث الملف الشخصي بنجاح'));
      setEditMode(false);
    }
    setSaving(false);
  }

  if (loading || !user) {
    return <div className="flex items-center justify-center min-h-screen">{t('loading', 'جاري التحميل...')}</div>;
  }

  return (
    <div style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Segoe UI, sans-serif', direction: isRTL ? 'rtl' : 'ltr' }} className="bg-gradient-to-br from-teal-50 to-blueGray-100 dark:from-blueGray-900 dark:to-blueGray-800 min-h-screen transition-all duration-300">
      <Navbar transparent />
      {/* About Company Section */}
      <section className="relative pt-24 flex items-center min-h-[60vh] bg-gradient-to-br from-blue-100 to-blue-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 px-4 text-center md:text-start">
            <h1 className="font-extrabold text-4xl md:text-5xl text-blue-900 mb-4 leading-tight">
              {t('about_company', 'عن عالم النظافة')}
            </h1>
            <p className="text-lg md:text-xl text-blueGray-600 mb-6">
              {t('about_company_desc', 'شركة رائدة في تقديم خدمات التنظيف المتكاملة في جدة، نتميز بالجودة، الأمانة، والابتكار في كل ما نقدمه.')}
            </p>
          </div>
          <div className="w-full md:w-1/2 px-4 mt-12 md:mt-0 flex justify-center">
            <img
              className={`w-full max-w-xs rounded-lg shadow-lg ${isRTL ? 'scale-x-[-1]' : ''}`}
              style={isRTL ? {transform: 'scaleX(-1)'} : {}}
              src="/img/landing.jpg"
              alt="about company"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">{t('our_team', 'فريقنا')}</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-blue-50 rounded-lg shadow p-8 w-72 text-center flex flex-col items-center">
              <img src="/img/team-1-800x800.jpg" alt="team1" className="w-24 h-24 rounded-full mb-4" />
              <h4 className="font-semibold text-lg mb-2">{t('team_leader', 'أ. محمد الغامدي')}</h4>
              <p className="text-blueGray-600">{t('team_leader_role', 'المدير التنفيذي')}</p>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-8 w-72 text-center flex flex-col items-center">
              <img src="/img/team-2-800x800.jpg" alt="team2" className="w-24 h-24 rounded-full mb-4" />
              <h4 className="font-semibold text-lg mb-2">{t('team_supervisor', 'م. سارة العتيبي')}</h4>
              <p className="text-blueGray-600">{t('team_supervisor_role', 'مشرفة الجودة')}</p>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-8 w-72 text-center flex flex-col items-center">
              <img src="/img/team-3-800x800.jpg" alt="team3" className="w-24 h-24 rounded-full mb-4" />
              <h4 className="font-semibold text-lg mb-2">{t('team_support', 'أ. أحمد الزهراني')}</h4>
              <p className="text-blueGray-600">{t('team_support_role', 'دعم العملاء')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto flex flex-col md:flex-row gap-12 items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full md:w-1/3 text-center">
            <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-heart"></i></span>
            <h4 className="font-bold text-xl mb-2">{t('our_values', 'قيمنا')}</h4>
            <p className="text-blueGray-600">{t('values_text', 'الالتزام، الأمانة، الجودة، الابتكار، رضا العميل.')}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 w-full md:w-1/3 text-center">
            <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-bullseye"></i></span>
            <h4 className="font-bold text-xl mb-2">{t('our_mission', 'رسالتنا')}</h4>
            <p className="text-blueGray-600">{t('mission_text', 'تقديم خدمات تنظيف بمعايير عالمية تلبي تطلعات عملائنا وتفوق توقعاتهم.')}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 w-full md:w-1/3 text-center">
            <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-eye"></i></span>
            <h4 className="font-bold text-xl mb-2">{t('our_vision', 'رؤيتنا')}</h4>
            <p className="text-blueGray-600">{t('vision_text', 'أن نكون الخيار الأول في خدمات التنظيف بجدة من خلال الجودة والابتكار.')}</p>
          </div>
        </div>
      </section>

      {/* Company Achievements Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">{t('achievements', 'إنجازاتنا')}</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-blue-50 rounded-lg shadow p-8 w-72 text-center flex flex-col items-center">
              <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-users"></i></span>
              <h4 className="font-semibold text-lg mb-2">{t('clients_served', 'أكثر من 500 عميل سعيد')}</h4>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-8 w-72 text-center flex flex-col items-center">
              <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-star"></i></span>
              <h4 className="font-semibold text-lg mb-2">{t('years_experience', '10 سنوات خبرة')}</h4>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-8 w-72 text-center flex flex-col items-center">
              <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-medal"></i></span>
              <h4 className="font-semibold text-lg mb-2">{t('awards', 'جوائز وشهادات جودة')}</h4>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8 text-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-900">{t('profile', 'الملف الشخصي')}</h1>
        <div className="flex flex-col items-center mb-4">
          {userAvatar ? (
            <img src={userAvatar} alt="avatar" className="w-24 h-24 rounded-full mb-2" />
          ) : (
            <i className="fas fa-user-circle text-6xl text-blueGray-300 mb-2"></i>
          )}
          <div className="font-bold text-lg">{userName || user.email}</div>
          <div className="text-blueGray-500 text-sm">{user.email}</div>
          <div className="mt-2 text-xs bg-blue-100 text-blue-700 rounded px-2 py-1 inline-block">{role === 'admin' ? t('admin', 'أدمن') : t('user', 'مستخدم')}</div>
        </div>
        {success && <div className="text-green-600 mb-2">{success}</div>}
        {error && <div className="text-red-600 mb-2">{error}</div>}
        {editMode ? (
          <form className="mt-4" onSubmit={handleSave}>
            <input type="text" className="border px-3 py-2 rounded mb-2 w-full" value={newName} onChange={e => setNewName(e.target.value)} placeholder={t('edit_name', 'تعديل الاسم')} />
            <input type="file" className="mb-2 w-full" accept="image/*" onChange={e => setNewAvatar(e.target.files[0])} />
            <div className="flex gap-2 justify-center">
              <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded" disabled={saving}>{saving ? t('saving', 'جاري الحفظ...') : t('save', 'حفظ')}</button>
              <button type="button" className="bg-gray-300 text-gray-800 px-4 py-2 rounded" onClick={() => setEditMode(false)}>{t('cancel', 'إلغاء')}</button>
            </div>
          </form>
        ) : (
          <button className="bg-blue-700 text-white px-4 py-2 rounded mt-4" onClick={() => setEditMode(true)}>{t('edit_profile', 'تعديل الملف الشخصي')}</button>
        )}
      </div>
      <Footer />
    </div>
  );
}
