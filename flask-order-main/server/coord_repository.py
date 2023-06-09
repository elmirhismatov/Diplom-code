import sqlite3


class CoordsRepository:

    def get_connect(self):
        return sqlite3.connect("./number_of_peoples.sqlite")

    def Coord(self, coords):
        try:
            connect = self.get_connect()
            cursor = connect.cursor()
            # В запросе где ковычки правильно сделать запрос SQL для сравнивания
            cursor.execute(
                # """SELECT * FROM `list` WHERE number = ?""", (coords,))
               """SELECT * FROM `list` """, )
            list = cursor.fetchall()
            print(f"coords {coords}")
            print(f"list {list}")
            return list
        except Exception as error_list:
            print(f"error_list {error_list}")
        finally:
            connect.close()
