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
        // const coords = [55.7522, 37.6156]; // Широта и долгота центра поисковой области

 const category = 'кафе'; // Категория организаций для поиска (в данном случае - заведения питания)

// fetch(https://search-maps.yandex.ru/v1/?apikey=${apiKey}&text=${category}&ll=${coords[1]},${coords[0]}&spn=0.05,0.05&lang=ru&type=biz&results=500&radius=${radius})
//   .then(response => response.json())
//   .then(data => {
//     const features = data.features;
//     // Обработка полученных объектов
//   })
//   .catch(error => console.error(error));
        fetch(`https://search-maps.yandex.ru/v1/?apikey=b774c439-0479-418c-b490-5eceae361a0f&text=${category}&ll=${coords[1]},${coords[0]}&bbox=${coords[1]-0.0287},${coords[0]-0.1772}~${coords[1]+0.0287},${coords[0]+0.1772}&rspn=1&lang=ru`)
  .then((response) => {
    const filterData=response.json()
    
    console.log(filterData)
    return filterData;
  })
  .then((data) => {
    console.log('кафе',data);
    localStorage.setItem("Cafe",data.features.length)
  });
  fetch(`https://search-maps.yandex.ru/v1/?apikey=b774c439-0479-418c-b490-5eceae361a0f&text=%D0%B3%D0%B8%D0%BF%D0%B5%D1%80%D0%BC%D0%B0%D1%80%D0%BA%D0%B5%D1%82%20%D0%A1%D1%83%D1%80%D0%B3%D1%83%D1%82&ll=${coords[0]},${coords[1]}&bbox=${coords[1]-0.0287},${coords[0]-0.1772}~${coords[1]+0.0287},${coords[0]+0.1772}&rspn=1&lang=ru`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log('гипермаркет',data);
    localStorage.setItem("Giper",data.features.length)
  });
fetch(`https://search-maps.yandex.ru/v1/?apikey=b774c439-0479-418c-b490-5eceae361a0f&text=%20%D0%9E%D1%80%D0%B3%D0%B0%D0%BD%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F%20%D0%A1%D1%83%D1%80%D0%B3%D1%83%D1%82&ll=${coords[0]},${coords[1]}&bbox=${coords[1]-0.0287},${coords[0]-0.1772}~${coords[1]+0.0287},${coords[0]+0.1772}&rspn=1&lang=ru`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log('организации',data);
    localStorage.setItem("Orga",data.features.length)
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
    });

    
}