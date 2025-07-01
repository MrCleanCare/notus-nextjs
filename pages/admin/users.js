import Admin from '../../layouts/Admin';
// import FooterAdmin from '../../components/Footers/FooterAdmin';
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/AuthContext';
import { useRouter } from 'next/router';
import { supabase } from '../../utils/supabaseClient';
import { useTranslation } from 'react-i18next';

export default function AdminUsers() {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const { t } = useTranslation('common');
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState('');
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    if (!loading && user && role === 'admin') {
      fetchUsers();
    }
  }, [user, loading, role]);

  async function fetchUsers() {
    setFetching(true);
    setError('');
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, name, avatar_url, role, created_at, is_active')
      .order('created_at', { ascending: false });
    if (error) setError(error.message);
    else setUsers(data);
    setFetching(false);
  }

  async function handleRoleToggle(userId, currentRole) {
    setUpdating(userId + 'role');
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId);
    if (error) setError(error.message);
    else await fetchUsers();
    setUpdating('');
  }

  async function handleEdit(userId, field, value) {
    setUpdating(userId + field);
    const { error } = await supabase
      .from('profiles')
      .update({ [field]: value })
      .eq('id', userId);
    if (error) setError(error.message);
    else await fetchUsers();
    setUpdating('');
  }

  async function handleDelete(userId) {
    setUpdating('delete' + userId);
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);
    if (error) setError(error.message);
    else await fetchUsers();
    setUpdating('');
    setConfirmDelete(null);
  }

  // Placeholder admin actions
  function handleImpersonate(userId) {
    alert(t('impersonate_not_implemented', 'ميزة الدخول كمستخدم غير مفعلة بعد.'));
  }
  function handleResetPassword(userId) {
    alert(t('reset_password_not_implemented', 'ميزة إعادة تعيين كلمة المرور غير مفعلة بعد.'));
  }
  function handleToggleActive(userId, isActive) {
    alert(t('toggle_active_not_implemented', 'ميزة تفعيل/تعطيل المستخدم غير مفعلة بعد.'));
  }
  function handleViewLog(userId) {
    alert(t('view_log_not_implemented', 'ميزة سجل النشاط غير مفعلة بعد.'));
  }

  const filteredUsers = users.filter(u =>
    (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading || !user || role !== 'admin') {
    return <div className="flex items-center justify-center min-h-screen">{t('loading', 'جاري التحميل...')}</div>;
  }
  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-600">{error}</div>;
  }
  return (
    <Admin>
      <div className="flex flex-col min-h-screen bg-blueGray-100">
        <div className="flex-grow flex flex-col items-center justify-start pt-8 pb-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl w-full border border-blue-100 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
              <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight flex items-center gap-2">
                <i className="fa-solid fa-users-gear text-blue-500"></i>
                {t('user_management', 'إدارة المستخدمين')}
              </h1>
              <div className="relative w-full md:w-1/2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="fa fa-search text-blue-400 text-lg"></i>
                </span>
                <input
                  type="text"
                  className="pl-10 pr-3 py-3 border border-blue-200 rounded-xl w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-blue-300 shadow-sm text-lg"
                  placeholder={t('search_user', 'ابحث بالاسم أو البريد الإلكتروني')}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-600 text-base font-semibold">
                {t('total_users', 'إجمالي المستخدمين')}: {users.length}
              </span>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-blue-100 bg-blueGray-50">
              <table className="min-w-full table-auto text-blueGray-700">
                <thead>
                  <tr className="bg-blueGray-100 text-blueGray-700 text-lg font-bold">
                    <th className="px-4 py-4 text-center">{t('avatar', 'الصورة')}</th>
                    <th className="px-4 py-4">{t('name', 'الاسم')}</th>
                    <th className="px-4 py-4">{t('email', 'البريد الإلكتروني')}</th>
                    <th className="px-4 py-4">{t('role', 'الدور')}</th>
                    <th className="px-4 py-4">{t('created_at', 'تاريخ الإنشاء')}</th>
                    <th className="px-4 py-4 text-center">{t('actions', 'إجراءات')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center text-blueGray-400 py-8 text-lg">{t('no_users', 'لا يوجد مستخدمون لعرضهم.')}</td>
                    </tr>
                  )}
                  {filteredUsers.map(u => (
                    <tr key={u.id} className="border-t border-blue-100 hover:bg-blue-50 transition">
                      <td className="px-4 py-4 text-center">
                        {u.avatar_url ? (
                          <img src={u.avatar_url} alt="avatar" className="w-14 h-14 rounded-full mx-auto border-2 border-blue-200 shadow-md" />
                        ) : (
                          <i className="fas fa-user-circle text-5xl text-blueGray-300"></i>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          className="border-b border-blue-200 focus:border-blue-500 outline-none bg-transparent w-full text-blue-900 font-semibold text-lg"
                          value={u.name || ''}
                          onChange={e => handleEdit(u.id, 'name', e.target.value)}
                          disabled={updating === u.id + 'name'}
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          className="border-b border-blue-200 focus:border-blue-500 outline-none bg-transparent w-full text-blue-900 text-lg"
                          value={u.email || ''}
                          onChange={e => handleEdit(u.id, 'email', e.target.value)}
                          disabled={updating === u.id + 'email'}
                        />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className={`relative inline-flex items-center h-8 rounded-full w-16 transition-colors duration-200 focus:outline-none ${u.role === 'admin' ? 'bg-blue-600' : 'bg-gray-300'}`}
                            onClick={() => handleRoleToggle(u.id, u.role)}
                            disabled={updating === u.id + 'role'}
                            aria-label={t('toggle_role', 'تبديل الدور')}
                          >
                            <span
                              className={`inline-block w-8 h-8 transform bg-white rounded-full shadow-md transition-transform duration-200 ${u.role === 'admin' ? 'translate-x-8' : 'translate-x-0'}`}
                            />
                            <span className={`absolute left-1/2 -translate-x-1/2 top-full mt-1 text-xs font-bold ${u.role === 'admin' ? 'text-blue-700' : 'text-gray-600'}`}
                            >
                              {u.role === 'admin' ? (
                                <span className="flex items-center gap-1"><i className="fa-solid fa-crown text-yellow-400"></i>{t('admin', 'أدمن')}</span>
                              ) : (
                                <span className="flex items-center gap-1"><i className="fa-solid fa-user text-blue-400"></i>{t('user', 'مستخدم')}</span>
                              )}
                            </span>
                          </button>
                          <span className="ml-2 text-xs text-blueGray-400">{t('toggle_role_help', 'تبديل بين أدمن ومستخدم')}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-xs text-blueGray-500">
                        {u.created_at ? new Date(u.created_at).toLocaleString() : '-'}
                      </td>
                      <td className="px-4 py-4 text-center relative">
                        <div className="flex flex-row gap-4 justify-center items-center">
                          <button
                            className="rounded-full bg-green-50 hover:bg-green-100 text-green-600 p-2 transition relative group shadow-sm"
                            onClick={() => handleImpersonate(u.id)}
                            aria-label={t('impersonate', 'الدخول كمستخدم')}
                          >
                            <i className="fa-solid fa-user-secret fa-lg"></i>
                            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 bg-green-600 text-white text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap hidden group-hover:block">
                              {t('impersonate', 'الدخول كمستخدم')}
                            </span>
                          </button>
                          <button
                            className="rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 p-2 transition relative group shadow-sm"
                            onClick={() => handleResetPassword(u.id)}
                            aria-label={t('reset_password', 'إعادة تعيين كلمة المرور')}
                          >
                            <i className="fa-solid fa-key fa-lg"></i>
                            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 bg-blue-600 text-white text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap hidden group-hover:block">
                              {t('reset_password', 'إعادة تعيين كلمة المرور')}
                            </span>
                          </button>
                          <button
                            className="rounded-full bg-yellow-50 hover:bg-yellow-100 text-yellow-600 p-2 transition relative group shadow-sm"
                            onClick={() => handleToggleActive(u.id, u.is_active)}
                            aria-label={t('toggle_active', 'تفعيل/تعطيل المستخدم')}
                          >
                            <i className="fa-solid fa-user-slash fa-lg"></i>
                            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 bg-yellow-600 text-white text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap hidden group-hover:block">
                              {t('toggle_active', 'تفعيل/تعطيل المستخدم')}
                            </span>
                          </button>
                          <button
                            className="rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 p-2 transition relative group shadow-sm"
                            onClick={() => handleViewLog(u.id)}
                            aria-label={t('view_log', 'سجل النشاط')}
                          >
                            <i className="fa-solid fa-clipboard-list fa-lg"></i>
                            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 bg-indigo-600 text-white text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap hidden group-hover:block">
                              {t('view_log', 'سجل النشاط')}
                            </span>
                          </button>
                          <button
                            className="rounded-full bg-red-50 hover:bg-red-100 text-red-600 p-2 transition relative group shadow-sm"
                            onClick={() => setConfirmDelete(u.id)}
                            disabled={updating === 'delete' + u.id}
                            aria-label={t('delete', 'حذف')}
                          >
                            <i className="fa-solid fa-trash fa-lg"></i>
                            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 bg-red-600 text-white text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap hidden group-hover:block">
                              {t('delete', 'حذف')}
                            </span>
                          </button>
                        </div>
                        {confirmDelete === u.id && (
                          <div className="absolute bg-white border border-blue-200 rounded shadow p-4 z-50 mt-2 left-1/2 -translate-x-1/2 min-w-[200px]">
                            <div className="mb-2 text-blue-900 font-bold">{t('confirm_delete', 'هل أنت متأكد من حذف هذا المستخدم؟')}</div>
                            <div className="flex gap-2 justify-center">
                              <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700" onClick={() => handleDelete(u.id)}>{t('delete', 'حذف')}</button>
                              <button className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400" onClick={() => setConfirmDelete(null)}>{t('cancel', 'إلغاء')}</button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Admin>
  );
} 