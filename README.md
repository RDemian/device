"интерактивный Ipad / iphone" Проект на React hooks.</br>
https://focused-allen-c96390.netlify.app/ - деплой;</br>

Реализовано:

переключение между 4 устройствами в зависимости от ширины экрана;</br>
первоначально иконки загружаются из файла настроек "src\components\device\apps-data.json";</br>
иконки отображаются на нескольких экранах по 20 штук на каждом;</br>
иконки можно перетакивать в пределах экрана и между экранами, выносить на добавочный экран;</br>
для перетаскивания между экранами указатель с иконкой нужно подвести к границе экрана;</br>
порядок иконок после перетаскивания сохраняется в localStorage, отдельно для мобилки и планшета;</br>
в нижней части отображается меню с четырьмя произвольными иконками на размытом фоне</br>
при клике на иконки в меню, всплывает попап с этой иконкой</br>
отображается текущее время</br>

серверный рендеринг не реализовал</br>

Запуск проекта:

Установить зависимости: npm i</br>
Запусить проект: npm start или</br>
Собрать build командой npm run build</br>
Запустить командой serve -s build</br>

Структура проекта:

src/index.js - стартовый файл проекта;</br>
src/components - компоненты;</br>
src/assets - дополнительные файлы проекта;</br>

В проекте подключены дополнительные библиотеки:

"react-dnd" - для перетаскивания иконок;</br>
"react-slick" - для прокрутки экранов;</br>
