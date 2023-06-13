from flask import Blueprint, render_template
# from coord_repository inport 

mainpg = Blueprint('mainpg', __name__)

@mainpg.route("/")
def route_test():
    return render_template("./Mainpage.html")
@mainpg.route("/Geocoder.html")
def route_test2():
    return render_template("./Geocoder.html")
@mainpg.route("/results.html")
def route_test3():
    return render_template("./results.html")
@mainpg.route("/comments.html")
def route_test4():
    return render_template("./comments.html")
@mainpg.route("/comment_form.html")
def route_test5():
    return render_template("./comment_form.html")
@mainpg.route("/Mainpage.html")
def route_test6():
    return render_template("./Mainpage.html")
