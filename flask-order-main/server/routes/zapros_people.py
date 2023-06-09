from flask import Blueprint, jsonify, request
from coord_repository import CoordsRepository


coordsRepository = CoordsRepository()

coords_bp = Blueprint('coords', __name__)

@coords_bp.route("/coord", methods=["POST"])
def route_coords():
    coords=request.get_json()
 
   
    coords = coordsRepository.Coord(coords)
    print(coords)
    response = jsonify(coords)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
