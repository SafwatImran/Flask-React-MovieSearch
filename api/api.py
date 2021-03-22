from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps
import requests, json
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secretkey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
CORS(app)

db = SQLAlchemy(app)

def token_required (f):
    @wraps(f)
    def decorated (*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'Token is missing!'})
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms='HS256')
            current_user = User.query.filter_by(id=data['id']).first()
        except:
            return jsonify({'message': 'Token is invalid'})
        return f(current_user, *args, **kwargs)
    return decorated

class User(db.Model):
    id = db.Column (db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    password = db.Column(db.String(80))


@app.route('/register', methods=['POST'])
def register ():
    data = request.get_json()
    name, password = data.get('name'), data.get('password')
    if User.query.filter_by(name=name).first():
        return make_response(jsonify({'message':'Username already exists!'}),409)
    hashed_password = generate_password_hash(password, method = 'sha256')
    new_user = User(name=name, password = hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return make_response(jsonify({'message': 'New user created'}),200)

# @app.route('/login')
# def login ():
#     auth = request.authorization
#     if not auth or not auth.username or not auth.password:
#         return make_response("Could not verify", 401, {'WWW-Authenticate': 'Basic realm = "Login required!"'})
#     user = User.query.filter_by(name = auth.username).first()
#     if not user: 
#         return make_response("Could not verify", 401, {'WWW-Authenticate': 'Basic realm = "Login required!"'})
#     if check_password_hash(user.password, auth.password):
#         token = jwt.encode({'id':user.id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=60)}, app.config['SECRET_KEY'], algorithm='HS256')
#         return jsonify({'token': token.decode('UTF-8')})
#     return make_response("Could not verify", 401, {'WWW-Authenticate': 'Basic realm = "Login required!"'})

@app.route('/login', methods=['POST'])
def login ():
    data = request.get_json()
    name, password = data.get('name'), data.get('password')
    if name is None or password is None:
        return make_response(jsonify({
            "error": "name and password are mandatory fields"
        }), 400)

    user = User.query.filter_by(name=name).first()
    if not user or not check_password_hash(user.password, password):
        return make_response(jsonify({
            "error": "Wrong username or password"
        }), 403)

    token = jwt.encode(
        {
            'id': user.id,
            'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=60)
        },
        app.config['SECRET_KEY'],
        algorithm='HS256'
    )

    return make_response(jsonify({
        "token": token
    }), 200)

@app.route('/search', methods=['POST'])
@token_required
def search(current_user):
    url = "http://www.omdbapi.com/"
    movie = request.get_json()
    payload = {"s": movie['movie'], "apikey": "c66fa948", "type":"movie"}
    r = requests.get(url, params=payload)
    return r.json()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)