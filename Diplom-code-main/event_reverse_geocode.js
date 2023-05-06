ymaps.ready(init);

function init() {
    var myPlacemark,
        myMap = new ymaps.Map('map', {
            center: [61.24942013169517,73.40993995227039],
            zoom: 14
        }, {
            searchControlProvider: 'yandex#search'
        });

    // Слушаем клик на карте.
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');
        console.log(coords);
        // Если метка уже создана – просто передвигаем ее.
        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        }
        // Если нет – создаем.
        else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
        }
        getAddress(coords);
        
    });

    // Создание метки.
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    }

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);

            myPlacemark.properties
                .set({
                    // Формируем строку с данными об объекте.
                    iconCaption: [
                        // Название населенного пункта или вышестоящее административно-территориальное образование.
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // В качестве контента балуна задаем строку с адресом объекта.
                    balloonContent: firstGeoObject.getAddressLine()
                });
        });
    }
    fetch(`https://search-maps.yandex.ru/v1/?apikey=b774c439-0479-418c-b490-5eceae361a0f&text=%D0%BA%D0%B0%D1%84%D0%B5%20%D1%81%D1%83%D1%80%D0%B3%D1%83%D1%82&ll=${coords[0]},${coords[1]}&spn=0.552069,0.400552&lang=ru`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log('кафе',data);
    localStorage.setItem("Cafe",data.features.length)
  });
fetch('https://search-maps.yandex.ru/v1/?apikey=b774c439-0479-418c-b490-5eceae361a0f&text=%D0%B3%D0%B8%D0%BF%D0%B5%D1%80%D0%BC%D0%B0%D1%80%D0%BA%D0%B5%D1%82%20%D0%A1%D1%83%D1%80%D0%B3%D1%83%D1%82&lang=ru')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log('гипермаркет',data);
    localStorage.setItem("Giper",data.features.length)
  });
fetch('https://search-maps.yandex.ru/v1/?apikey=b774c439-0479-418c-b490-5eceae361a0f&text=%20%D0%9E%D1%80%D0%B3%D0%B0%D0%BD%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F%20%D0%A1%D1%83%D1%80%D0%B3%D1%83%D1%82&lang=ru')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log('организации',data);
    localStorage.setItem("Orga",data.features.length)
  });
}