import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n'; // Ініціалізація i18n
import { Dashboard } from './Dashboard';
import { AdminPanel } from './AdminPanel';

type Role = 'Manager' | 'Admin';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentRole, setCurrentRole] = useState<Role>('Manager');
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'admin'>('dashboard');

  // Функція зміни мови
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Додатково можна змінювати напрям тексту, якщо мова потребує RTL
    document.documentElement.dir = 'ltr'; 
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '0', padding: '0' }}>
      {/* Верхня навігаційна панель */}
      <header style={{ backgroundColor: '#2c3e50', color: 'white', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{t('title')}</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Перемикач мов */}
          <div>
            <button onClick={() => changeLanguage('uk')} style={{ marginRight: '5px', fontWeight: i18n.language === 'uk' ? 'bold' : 'normal' }}>UK</button>
            <button onClick={() => changeLanguage('en')} style={{ fontWeight: i18n.language === 'en' ? 'bold' : 'normal' }}>EN</button>
          </div>

          {/* Імітація зміни ролі користувача */}
          <div>
            <label style={{ marginRight: '8px' }}>{t('role')}:</label>
            <select 
                value={currentRole} 
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const role = e.target.value as Role;
                  setCurrentRole(role);
                  if (role === 'Manager') setCurrentTab('dashboard'); // Менеджер не має доступу до адмінки
                }}
              style={{ padding: '4px' }}
            >
              <option value="Manager">{t('manager')}</option>
              <option value="Admin">{t('admin')}</option>
            </select>
          </div>
        </div>
      </header>

      {/* Перемикач вкладок відповідно до ролі (RBAC) */}
      <nav style={{ backgroundColor: '#ecf0f1', padding: '10px 20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setCurrentTab('dashboard')}
          style={{ padding: '8px 16px', backgroundColor: currentTab === 'dashboard' ? '#3498db' : '#fff', color: currentTab === 'dashboard' ? '#fff' : '#000' }}
        >
          {t('dashboard')}
        </button>
        
        {/* Вкладка адміністрування видима тільки для ролі Admin */}
        {currentRole === 'Admin' && (
          <button 
            onClick={() => setCurrentTab('admin')}
            style={{ padding: '8px 16px', backgroundColor: currentTab === 'admin' ? '#3498db' : '#fff', color: currentTab === 'admin' ? '#fff' : '#000' }}
          >
            {t('adminPanel')}
          </button>
        )}
      </nav>

      {/* Основний контент сторінки */}
      <main>
        {currentTab === 'dashboard' ? <Dashboard /> : <AdminPanel />}
      </main>
    </div>
  );
};

export default App;