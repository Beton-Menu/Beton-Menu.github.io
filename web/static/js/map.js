//document.addEventListener('DOMContentLoaded', function() {
//    if (document.getElementById('map')) {
//        ymaps.ready(init);
//
//        function init() {
//            // Координаты заведения (ул. Новоторжская, 12Б, С1, Тверь)
//            const coordinates = [56.8595, 35.9119];
//
//            const map = new ymaps.Map('map', {
//                center: coordinates,
//                zoom: 17,
//                controls: ['zoomControl']
//            });
//
//            const placemark = new ymaps.Placemark(coordinates, {
//                hintContent: 'BETON',
//                balloonContent: 'ул. Новоторжская, 12Б, С1<br>Часы работы: 12:00 - 23:00'
//            }, {
//                iconLayout: 'default#image',
//                iconImageHref: 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png',
//                iconImageSize: [40, 40],
//                iconImageOffset: [-20, -40]
//            });
//
//            map.geoObjects.add(placemark);
//            map.behaviors.disable('scrollZoom');
//        }
//    }
//});
