import sqlite3
import math

class CoordsRepository:

    def get_connect(self):
        return sqlite3.connect("./number_of_peoples.sqlite")

    def Coord(self, coordinates):
        try:
            connect = self.get_connect()
            cursor = connect.cursor()
           
            cursor.execute(
                # """SELECT * FROM `list` WHERE number = ?""", (coords,))        
               """SELECT * FROM `list`  """,coordinates )
           
            list = cursor.fetchall()
            print(f"coordinates {coordinates}")

            (ind, nearest_number) = find_nearest_point(list,coordinates)
            print(f"list {list[ind]}")
            
            # print(f"list {list}")
            return list
        except Exception as error_list:
            print(f"error_list {error_list}")
        finally:
            connect.close()
        return nearest_number
    
def find_nearest_point(list, coordinates):
    min_dist = math.inf
    number =-1
    ind =0
    for elem in list:
        el_coords=elem[2][:-1] 
        el_coords=el_coords[1:] 
        list_el_coords = el_coords.split(', ')
        el_coords = []
        for a in list_el_coords:
            el_coords.append(float(a))
        cur_dist = haversine_distance(el_coords[1],el_coords[0],
                                        coordinates['coords'][1],coordinates['coords'][0]
                                            )
        if cur_dist<min_dist:
            min_dist = cur_dist
            number = elem[1]
        ind = ind +1
    return ind, number


def haversine_distance(lat1, lon1, lat2, lon2):
        # Константа радиуса Земли в километрах
        R = 6371
        # Преобразование градусов в радианы
        lat1 = math.radians(lat1)
        lon1 = math.radians(lon1)
        lat2 = math.radians(lat2)
        lon2 = math.radians(lon2)
        # Вычисление разности широт и долгот
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        # Вычисление гаверсинуса центрального угла
        a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
        c = 2 * math.asin(math.sqrt(a))
        # Вычисление расстояния по дуге сферы
        d = R * c
        return d