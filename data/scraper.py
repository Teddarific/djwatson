import os
import spotipy
import spotipy.util as util
from spotipy.oauth2 import SpotifyClientCredentials
import json
import xlwt
from xlwt import Workbook

from dotenv import load_dotenv
load_dotenv()

FEATURES = ["key", "mode", "time_signature", "acousticness", "danceability",
            "energy", "instrumentalness", "liveness", "loudness", "speechiness",
            "valence", "tempo"]

def main():
    sp = auth()

    positiveTracks = scrape(sp, "positive.txt")
    negativeTracks = scrape(sp, "negative.txt")
    positiveComparisons = analyzeTracks(sp, positiveTracks, 1)
    negativeComparisons = analyzeTracks(sp, negativeTracks, 0)

    writeComparisons(positiveComparisons, negativeComparisons)

def auth():
    CLIENT_ID = os.getenv("SPOTIPY_CLIENT_ID")
    CLIENT_ID_SECRET = os.getenv("SPOTIPY_CLIENT_SECRET")

    client_credentials_manager = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_ID_SECRET)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
    return sp

def parseURI(uri):
    stripped = uri.strip("\n").split(":")
    type = "album"
    if len(stripped) > 3:
        type = "playlist"

    return [type, stripped[len(stripped) - 1], stripped[2]]

def scrape(sp, file):
    f = open(file, "r")

    tracks = []
    curAlbums = []

    for uri in f:
        [type, id, user] = parseURI(uri)

        if type == "album":
            curAlbums.append(id)
            if len(curAlbums) == 20:
                res = sp.albums(curAlbums)
                for resAlbum in res["albums"]:
                    temp = []
                    for track in resAlbum["tracks"]["items"]:
                        temp.append(track["id"])
                    tracks.append(temp)
                curAlbums = []
        elif type == "playlist":
            res = sp.user_playlist(user, playlist_id=id)
            temp = []
            for track in res["tracks"]["items"]:
                temp.append(track["track"]["id"])
            tracks.append(temp)

    if len(curAlbums) > 0:
        res = sp.albums(curAlbums)
        for resAlbum in res["albums"]:
            temp = []
            for track in resAlbum["tracks"]["items"]:
                temp.append(track["id"])
            tracks.append(temp)
    return tracks

# def scrapePlaylists(sp):

def cleanFeatures(audioObj):
    new = {}
    for f in FEATURES:
        new[f] = audioObj[f]

    return new

def analyzeTracks(sp, allTracks, label):
    comparisons = []
    for trackSet in allTracks:
        ft = sp.audio_features(trackSet)
        for i in range(0, len(ft) - 1):
            a = cleanFeatures(ft[i])
            b = cleanFeatures(ft[i+1])
            comparisons.append((a, b, label))

    return comparisons

def writeComparisons(positive, negative):
    wb = Workbook()
    ts = wb.add_sheet("Training")

    i = 0
    for comp in positive:
        ts.write(i, 0, comp[2])
        j = 1
        for feature in FEATURES:
            ts.write(i, j, comp[0][feature])
            ts.write(i, j+1, comp[1][feature])
            j += 2
        i += 1

    for comp in negative:
        ts.write(i, 0, comp[2])
        j = 1
        for feature in FEATURES:
            ts.write(i, j, comp[0][feature])
            ts.write(i, j+1, comp[1][feature])
            j += 2
        i += 1

    wb.save("training.xls")

if __name__ == "__main__":
    main()
