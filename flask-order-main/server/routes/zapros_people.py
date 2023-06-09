from flask import Blueprint, jsonify, request
from coord_repository import CoordsRepository


coordsRepository = CoordsRepository()

coords_bp = Blueprint('coords', __name__)

@coords_bp.route("/coord", methods=["POST"])
def route_coords():
    coordinates=request.get_json()
 
   
    nearest_number = coordsRepository.Coord(coordinates)
    print(nearest_number)
    print(coordinates)
    response = jsonify(coordinates,nearest_number)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
