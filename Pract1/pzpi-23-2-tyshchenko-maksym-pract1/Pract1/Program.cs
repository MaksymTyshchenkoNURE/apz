using System;
using System.Text;

namespace StrategyPatternDemo
{
    // 1. Загальний інтерфейс Стратегії
    public interface IAttackStrategy
    {
        void Attack(string target);
    }

    // 2. Конкретна стратегія 1: Ближній бій
    public class SwordAttack : IAttackStrategy
    {
        public void Attack(string target)
        {
            Console.WriteLine($"[Ближній бій] Персонаж завдає рубаючого удару мечем по {target}! (Фізична шкода)");
        }
    }

    // 2. Конкретна стратегія 2: Дальній бій
    public class BowAttack : IAttackStrategy
    {
        public void Attack(string target)
        {
            Console.WriteLine($"[Дальній бій] Персонаж випускає стрілу з лука у {target}! (Дистанційна шкода)");
        }
    }

    // 2. Конкретна стратегія 3: Магія
    public class MagicAttack : IAttackStrategy
    {
        public void Attack(string target)
        {
            Console.WriteLine($"[Магія] Персонаж кастує вогняну кулю в {target}! (Магічна шкода по площі)");
        }
    }

    // 3. Клас Контексту
    public class Hero
    {
        private IAttackStrategy _attackStrategy;
        public string Name { get; private set; }

        // Конструктор дозволяє встановити ім'я та початкову стратегію
        public Hero(string name, IAttackStrategy initialStrategy)
        {
            Name = name;
            _attackStrategy = initialStrategy;
            Console.WriteLine($"\nСтворено героя '{Name}'. Початкова зброя екіпірована.");
        }

        // Метод для динамічної зміни стратегії під час виконання (Runtime)
        public void SetAttackStrategy(IAttackStrategy newStrategy)
        {
            _attackStrategy = newStrategy;
            Console.WriteLine($"\n-> {Name} змінює тип зброї/атаки.");
        }

        // Делегування виконання алгоритму об'єкту стратегії
        public void PerformAttack(string target)
        {
            Console.Write($"{Name} готується до атаки... ");
            _attackStrategy.Attack(target);
        }
    }

    // 4. Клієнтський код
    class Program
    {
        static void Main(string[] args)
        {
            // Налаштування для коректного відображення кирилиці в консолі
            Console.OutputEncoding = Encoding.UTF8;

            // Ініціалізація Контексту з конкретною стратегією
            Hero witcher = new Hero("Відьмак", new SwordAttack());
            string currentEnemy = "Гуль";

            // Виконання алгоритму
            witcher.PerformAttack(currentEnemy);

            // Зміна умов: ворог далеко. Динамічна зміна стратегії.
            currentEnemy = "Грифон у небі";
            witcher.SetAttackStrategy(new BowAttack());
            witcher.PerformAttack(currentEnemy);

            // Зміна умов: натовп ворогів. Знову змінюємо стратегію.
            currentEnemy = "Зграя вовків";
            witcher.SetAttackStrategy(new MagicAttack());
            witcher.PerformAttack(currentEnemy);

            // Пауза перед закриттям консолі
            Console.WriteLine("\nНатисніть будь-яку клавішу для виходу...");
            Console.ReadKey();
        }
    }
}