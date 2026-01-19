from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Hello World from the Blogging API!"})

if __name__ == '__main__':
    app.run(port=3000, debug=True)