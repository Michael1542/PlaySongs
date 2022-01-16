from flask import Flask, request
from flask_cors import CORS
from pytube import YouTube
import flask
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

# build flask web application
# page home : enter urls, will be added to a list
# functionality to also delete urls
# then on the play page, will fetch the youtube songs and then create the playlist
#
# http://localhost:5000/add/?url=https://www.youtube.com/watch?v=xqf2DJgucsU


@app.route('/')
def index():
    return "text"

@app.route('/add/', methods=['GET'])
def new_song():

    url = request.args.get('url')
    youtube = YouTube(url)
    audio = youtube.streams.filter(only_audio=True).all()
    audio[0].download("./front-end/public/songs", youtube.title+".mp3")
    
    response = flask.jsonify({"title":youtube.title})
    return response

@app.route('/list/')
def get_list():    
    response = flask.jsonify({"title":os.listdir("./front-end/public/songs")})
    return response


@app.route('/delete/', methods=['GET'])
def delete_song():
    title = request.args.get('title')
    try:
        os.remove("./front-end/public/songs/"+title)
        response = "deleted"
        return response
    except FileNotFoundError:
        response = "not found"
        return response