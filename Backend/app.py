from flask import Flask
from flask import jsonify
from flask import request
from BackendPy import PrepJson
from BackendPy import model

app = Flask(__name__)
endpoint = '/api/v1'


@app.route(endpoint + '/user', methods=['GET', 'POST'])
def get_forecast():
    content = request.get_json()
    print("content", content)
    try:
        data = PrepJson.prep_json(content)
        a = model.get_forecast(data)
        return jsonify(a),200
    except Exception:
        return ('Something went wrong processing the request'),400


# Start app
if __name__ == '__main__':
    app.run()