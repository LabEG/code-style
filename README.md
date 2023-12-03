![David](https://img.shields.io/david/LabEG/code-style.svg)
![David](https://img.shields.io/david/dev/LabEG/code-style.svg)
![GitHub](https://img.shields.io/github/license/LabEG/code-style.svg)


# CodeStyle
В этом репозитории я собираю файлы стилей для облегчения синхронизации между проектами.

## Подключение
Для подключение необходимо установить пакет командой:
```Bash
npm i -D @labeg/code-style
```

Далее в вашь файл eslint config необходимо добавить следующую строчку:
```Javascript
module.exports = {
    extends: ["@labeg/code-style"],
    rules:{
        // override here
    }
};
```

## Рекомендации
### Не заканчивать строку ничем
Строка всегда должна заканчиваться знаком конца строки или оператором, например ; или +. Делается это для того что бы глядя всего на одну строку знать есть ли у команды продолжение на следующей строке или нет. Тем самым для понимания надо прочитать всего одну строчку вместо двух, что экономит время. А отсутствие ; в конце команды может привести к ошибкам исполнения.

```Typescript
/**
 *  Оператор в конце строки
 */

// Плохо. Глядя на первую строчку не понятно это конец команды или надо искать продолжение
let sample = sample.sample.sample
                 + sample.sample.sample;

// Хорошо. Глядя на первую строчку видно что команда не заканчивается и стоит искать продолжение на следующей
let sample = sample.sample.sample +
                 sample.sample.sample;

/**
 * Знак конца строки
 */

// Плохо. Выведет 2,2 хотя ожидается 0,2
var a = 1, b = 0
if(a>b) a=b
-b > 0 ? b=1 : b=2;
alert([a,b])

// Плохо, выдаст ошибку исполнения
var i,s
s="here is a string"
i=0
/[a-z]/g.exec(s)

```

### Фигурный скобки в if
Даже если после блока if идет всего 1 команда, фигурные скобки все равно ставить обязательно.
Во первых, вы сэкономите время себе же в будующем когда понадобиться срочно дополнить условие.
Во вторых, очень часто люди не замечают что строка относится к условию if и при рефакторинге или удалении строки забывают про if, из-за чего if начинает влиять на другую строчку кода.

```Typescript
// Плохо
if (n > 10) alert("Плохо");

// Плохо
if (n > 10)
    alert("Плохо");

// Хорошо
if (n > 10) {
    alert("Хорошо");
}
```

### Используйте двойные кавычки
Изначально в более взрослых языках используются " для написания строк, в JS для более простого ескейпа было принято писать '. Так было проще для JS разработчиков. Но теперь существуют шаблонные строки которые справляются с этой задаче много лучше. К тому же коллегам с бекенда будет проще понимать ваш код в случае необходимости.

```Typescript
const message = "булочек";
const count = 5;

// Плохо
const data = 'Отправляю "бабушке" ' + count * 5 + ' ' + message + '.';

// Хорошо
const data = `Отправляю "бабушке" ${count * 5} ${message}.`;
```

### Длина строки 120 символов и отступ 4 пробела
У всех разработчиков разные мониторы, у кого то большие, у кого то маленькие, а кто то вообще через консоль работает. Поэтому оптимальным размером строки является 120 символов. А использование 4 проблема для отступа является оптимальным решением для определения уровня вложености. Некоторые предпочитают использовать 2 пробела для того что бы на одну строку больше влазило, но это является плохой практикой, т.к. увеличивает нагрузку на глаза при определении уровня вложености. Вместо того что бы впихивать на одну строчку больше кода, лучше использовать более удачное форматирование, например писать более простые функции и использовать "функциональный" стиль для цепочек методов объекта.

Для вдохновления предлагаю взглянуть на [ядро Linux](https://github.com/torvalds/linux/blob/master/kernel/acct.c). Посмотрите как просто написано такой огромный и сложный продукт, а длина строки всего 80 символов.

```Typescript
export class Tabs extends Base {
    // ...
    private onTabClick(tab: Tab): void {

        if (tab.active) {

            if (!this._slotElement
                    .assignedNodes()
                    .some((node: Node) => node instanceof Tab && node.active === true)) {

                const offset = tab.offsetLeft - tab.parentElement!.offsetLeft;
                const width = tab.offsetWidth;
                this._lineElement.style.marginLeft = `${offset + width / 2}px`;
                this._lineElement.style.width = `0`;

            }
        }
    }
}
```