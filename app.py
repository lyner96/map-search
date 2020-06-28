from flask import Flask, render_template
import geocoder
import json

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    return render_template('index.html')

@app.route("/getaddr/<string:query>")
def results(query):
    s = geocoder.osm(query)
    g = s.osm
    j = json.dumps(g)
    return j

if __name__ == '__main__':
    app.run(host='', port=5000, debug=True)