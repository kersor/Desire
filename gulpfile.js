// Подключение npm-модулей
// src - выполняет чтение исходных файлов
// dest - выполняет запись итоговых файлов
// watch - запускает необходимые задачи при изменениях в файлах
// parallel - объединяет задачи для выполнения в параллельном режиме
// series - объединяет задачи для выполнения в последовательном режиме;
const {src, dest, watch, parallel, series} = require('gulp');
const concat = require('gulp-concat');
const scss  = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create(); // Бл*ть, ну вот так вот нах*й
const uglify = require('gulp-uglify-es').default; // Бл*ть, ну вот так вот нах*й
const autoPrefixer = require('gulp-autoprefixer');
const imageMin = require('gulp-imagemin');
const del = require('del');

// Функция, которая конвертирует scss в css
function styles(){
    return src('app/scss/style.scss')
    // Pipr - это канал, который связывает поток для чтения и поток для записи 
    // и позволяет сразу считать из потока чтения в поток записи
    // Без пробелов
    .pipe(scss({outputStyle: 'compressed'}))
    // Файл теперь style.min
    .pipe(concat('style.min.css'))
    .pipe(autoPrefixer({
        // задается для определения глубины версий от текущей. В нашем случае, префиксы будут раздаваться старым браузерам последних 10-ти версий.
        overrideBrowserslist: ['last 10 version'],
        grid: true,
    }))
    // Читает все получившееся
    .pipe(dest('app/css'))
    // Транслирует в браузер
    .pipe(browserSync.stream())
}

// Функция, для обновления браузера P.s. чел сам хз
// Cоздание сервера
function browsersync(){
    browserSync.init({
        server: {
            baseDir: 'app/',
        }
    })
}

// Функция, для сжимания скриптов
function scripts(){
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.min.js',
        'node_modules/mixitup/dist/mixitup.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
        'app/js/main.js',
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function images(){
    return src('app/images/**/*')
    .pipe(imageMin([
        // Оптимизация для Gif, Jpeg, Png, Svg. P.s. по*бать
        imageMin.gifsicle({interlaced: true}),
        imageMin.mozjpeg({quality: 75, progressive: true}),
        imageMin.optipng({optimizationLevel: 5}),
        imageMin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('dist/images'))
}


function cleanDist(){
    return del('dist')
}

// Перекидывание данных в dist
function build(){
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html',
    ], {base: 'app'})
    .pipe(dest('dist'))
}


// Функция, которая обновляет файлы
function watching(){
    // Обновление файла scss при написании в css
    watch(['app/scss/**/*.scss'], styles);
    // Обновление браузера при изменение html фала(ов)
    watch(['app/*.html']).on('change', browserSync.reload);
    // Специально сделано так, есл написать app/js/main.min.js (как надо по сути)
    // То терминал начнет еб*ться на лево и на право как будто скибидар...
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
}

// Чтобы функции работали
exports.scssInCss = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images

exports.build = series(cleanDist, images, build)

// Параллельный запуск Обновление брауреа, и файлов
// P.s. нужен по причине, что терминал не может выполнять >1 задачи
exports.default = parallel(styles, scripts, browsersync, watching);