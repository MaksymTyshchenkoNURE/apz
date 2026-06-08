import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface User {
  id: number;
  username: string;
  role: string;
}

export const AdminPanel: React.FC = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([
    { id: 1, username: 'admin_maksym', role: 'Admin' },
    { id: 2, username: 'manager_olena', role: 'Manager' },
    { id: 3, username: 'worker_ivan', role: 'Worker' }
  ]);
  const [newUsername, setNewUsername] = useState('');
  const [newRole, setNewRole] = useState('Worker');
  const [message, setMessage] = useState('');

  // CRUD: Додавання користувача [cite: 146]
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername) return;
    const newUser: User = {
      id: Date.now(),
      username: newUsername,
      role: newRole
    };
    setUsers([...users, newUser]);
    setNewUsername('');
  };

  // CRUD: Видалення користувача
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user: User) => user.id !== id));
  };

  // Експорт конфігурації у JSON файл
  const exportToJSON = () => {
    const configData = { systemVersion: "1.0", activeRoles: ["Admin", "Manager", "Worker"], exportDate: new Date() };
    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `warehouse_config_${Date.now()}.json`;
    link.click();
  };

  // Експорт бази товарів в емульований формат текстової БД / CSV [cite: 63, 163]
  const exportToCSV = () => {
    const csvContent = "id|product_name|zone|quantity\n1|Кабель оптичний|Storage A|45\n2|RFID Мітки|Reception|8";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `products_db_${Date.now()}.txt`; // Збереження згідно формату txt/csv [cite: 63, 163]
    link.click();
  };

  // Імпорт файлу та його первинна валідація
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      // Примітивна валідація структури файлу на клієнті перед відправкою на сервер
      if (content.includes('id') && (content.includes('|') || content.includes(','))) {
        setMessage(t('successImport'));
      } else {
        setMessage(t('errorImport'));
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ padding: '20px', display: 'flex', gap: '40px' }}>
      {/* Секція управління користувачами */}
      <div style={{ flex: 1 }}>
        <h3>{t('userManagement')}</h3>
        <form onSubmit={handleAddUser} style={{ marginBottom: '15px' }}>
          <input 
            type="text" 
            placeholder={t('username')} 
            value={newUsername} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewUsername(e.target.value)} 
          />
          <select value={newRole} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewRole(e.target.value)} style={{ margin: '0 10px' }}>
            <option value="Worker">Worker</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit">{t('addWorker')}</button>
        </form>

        <ul style={{ paddingLeft: '0', listStyleType: 'none' }}>
          {users.map(user => (
            <li key={user.id} style={{ padding: '8px 0', borderBottom: '1px solid #ddd' }}>
              {user.username} - <strong>{user.role}</strong>
              <button onClick={() => handleDeleteUser(user.id)} style={{ marginLeft: '15px', color: 'red' }}>
                {t('delete')}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Секція роботи з даними та бекапами */}
      <div style={{ flex: 1, borderLeft: '1px solid #ccc', paddingLeft: '40px' }}>
        <h3>{t('backupTools')}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '250px' }}>
          <button onClick={exportToJSON}>{t('exportJson')}</button>
          <button onClick={exportToCSV}>{t('exportCsv')}</button>
          
          <label style={{ marginTop: '15px', fontWeight: 'bold' }}>{t('importData')}:</label>
          <input type="file" accept=".json,.txt,.csv" onChange={handleFileUpload} />
          
          {message && (() => {
            const success = message === t('successImport');
            return <p style={{ color: success ? 'green' : 'blue', marginTop: '10px' }}>{message}</p>;
          })()}
        </div>
      </div>
    </div>
  );
};