// Заданная точка
const startPoint = { coords };

// Список объектов с их координатами
const objects = getObjects();

// Расстояние между точками
function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }
  
  // Вычисление расстояний между каждым объектом и заданной точкой
  for (let i = 0; i < objects.length; i++) {
    const object = objects[i];
    const dist = distance(startPoint.x, startPoint.y, object.x, object.y);
    console.log(`Расстояние от ${startPoint.x},${startPoint.y} до ${object.name} (${object.x},${object.y}): ${dist} м`);
  }