import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatRegionalDate, sortTextByLocale } from './localization';

interface Product {
  id: string;
  name: string;
  zone: string;
  quantity: number;
  lastUpdated: Date;
}

// Початкові мок-дані складу з фіксованими зонами [cite: 49, 135]
const initialProducts: Product[] = [
  { id: '1', name: 'Кабель оптичний', zone: 'Storage A', quantity: 45, lastUpdated: new Date() },
  { id: '2', name: 'RFID Мітки утилітарні', zone: 'Reception', quantity: 8, lastUpdated: new Date() }, // Менше 10 -> Тріггер AUTO_ORDER 
  { id: '3', name: 'Контролер ІоТ v2', zone: 'Shipping', quantity: 12, lastUpdated: new Date() },
  { id: '4', name: 'Антена сканера', zone: 'Storage B', quantity: 5, lastUpdated: new Date() },
];

export const Dashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const toggleSort = () => {
    const sorted = [...products].sort((a, b) => {
      return sortAsc 
        ? sortTextByLocale(a.name, b.name, i18n.language)
        : sortTextByLocale(b.name, a.name, i18n.language);
    });
    setProducts(sorted);
    setSortAsc(!sortAsc);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{t('dashboard')}</h2>
      <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th onClick={toggleSort} style={{ cursor: 'pointer' }}>
              {t('productName')} {sortAsc ? '▲' : '▼'}
            </th>
            <th>{t('zone')}</th>
            <th>{t('quantity')}</th>
            <th>{t('lastUpdated')}</th>
            <th>{t('status')}</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => {
            const isCritical = product.quantity < 10; // Бізнес-логіка критичного залишку 
            return (
              <tr key={product.id} style={{ backgroundColor: isCritical ? '#ffe6e6' : 'transparent' }}>
                <td><strong>{product.name}</strong></td>
                <td>{product.zone}</td>
                <td>{product.quantity}</td>
                <td>{formatRegionalDate(product.lastUpdated, i18n.language)}</td>
                <td style={{ color: isCritical ? 'red' : 'green', fontWeight: 'bold' }}>
                  {isCritical ? t('criticalAlert') : t('normal')}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};