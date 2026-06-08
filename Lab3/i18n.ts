import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  uk: {
    translation: {
      title: "Розумний Склад — Панель Управління",
      role: "Роль",
      manager: "Менеджер",
      admin: "Адміністратор",
      logout: "Вихід",
      dashboard: "Панель залишків",
      adminPanel: "Адміністрування",
      productName: "Назва товару",
      zone: "Зона зберігання",
      quantity: "Кількість",
      lastUpdated: "Оновлено",
      status: "Статус",
      criticalAlert: "КРИТИЧНИЙ РІВЕНЬ (AUTO_ORDER)",
      normal: "Нормально",
      userManagement: "Управління користувачами",
      backupTools: "Резервне копіювання та дані",
      username: "Ім'я користувача",
      actions: "Дії",
      delete: "Видалити",
      addWorker: "Додати працівника",
      exportJson: "Експорт конфігурації (JSON)",
      exportCsv: "Експорт бази товарів (CSV)",
      importData: "Імпорт даних",
      successImport: "Дані успішно імпортовано та валідовано!",
      errorImport: "Помилка валідації файлу.",
    }
  },
  en: {
    translation: {
      title: "Smart Warehouse — Control Panel",
      role: "Role",
      manager: "Manager",
      admin: "Administrator",
      logout: "Logout",
      dashboard: "Dashboard",
      adminPanel: "Administration",
      productName: "Product Name",
      zone: "Storage Zone",
      quantity: "Quantity",
      lastUpdated: "Last Updated",
      status: "Status",
      criticalAlert: "CRITICAL LEVEL (AUTO_ORDER)",
      normal: "Normal",
      userManagement: "User Management",
      backupTools: "Backup & Data Tools",
      username: "Username",
      actions: "Actions",
      delete: "Delete",
      addWorker: "Add Worker",
      exportJson: "Export Config (JSON)",
      exportCsv: "Export Product DB (CSV)",
      importData: "Import Data",
      successImport: "Data successfully imported and validated!",
      errorImport: "File validation error.",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'uk', // Мова за замовчуванням
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;