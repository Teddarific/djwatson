import Spotify from 'node-spotify-api';
import brain from 'brain.js';

import NN_JSON from '../trainedNet.json';

/* eslint no-loop-func: 0 */

const features = ['key', 'mode', 'time_signature', 'acousticness', 'danceability',
  'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness',
  'valence', 'tempo'];

const attachNames = (sp, tracks, res) => {
  const reqEndpoint = `https://api.spotify.com/v1/tracks/?ids=${tracks.join(',')}`;
  sp.request(reqEndpoint)
    .then((data) => {
      const results = [];
      data.tracks.forEach((v) => {
        results.push({
          id: v.id,
          name: v.name,
          artist: v.artists[0].name,
        });
      });
      res.status(200).json(results);
    });
};

// const formatFeature = (audioFeature) => {
//   const clean = {};
//
//   features.forEach((f) => {
//     clean[f] = audioFeature[f];
//   });
// };

const vectorizeFeatures = (af1, af2) => {
  const featureName = 'FEATURE ';

  const vec = {};
  let count = 1;
  features.forEach((f) => {
    vec[featureName + count] = af1[f];
    count += 1;
    vec[featureName + count] = af2[f];
    count += 1;
  });

  return vec;
};

const orderCalculation = (tracks, audioFeatures) => {
  const net = new brain.NeuralNetwork();
  net.fromJSON(NN_JSON);
  const scores = {};

  // Greedy algorithm to find best pair
  let maxScore = -1;
  let maxPair = null;

  // Iterate through each pair
  // Generate the scores of each pair
  audioFeatures.forEach((af1, i) => {
    audioFeatures.forEach((af2, j) => {
      if (i === j) {
        return;
      }
      const vec = vectorizeFeatures(af1, af2);
      // console.log(vec);
      const score = net.run(vec).PAIR_WORKS;
      if (!(af1.id in scores)) {
        scores[af1.id] = {};
      }
      scores[af1.id][af2.id] = score;

      if (score > maxScore) {
        maxPair = [af1.id, af2.id];
        maxScore = score;
      }
    });
  });

  // Greedy algorithm. Find best pair for song down the list.
  const result = [];
  let tracksLeft = [...tracks];

  tracksLeft = tracksLeft.filter((value) => {
    return value !== maxPair[0] && value !== maxPair[1];
  });
  result.push(maxPair[0]);
  result.push(maxPair[1]);

  let matchWith = maxPair[1];
  matchWith = maxPair[1];
  while (tracksLeft.length > 0) {
    maxScore = -1;
    let maxID = null;
    tracksLeft.forEach((t) => {
      const s = scores[matchWith][t];
      if (s > maxScore) {
        maxScore = s;
        maxID = t;
      }
    });

    result.push(maxID);
    tracksLeft = tracksLeft.filter((value) => {
      return value !== maxID;
    });
    matchWith = maxID;
  }

  return result;
};

export const getSongs = (req, res) => {
  const { uri } = req.query;
  const id = uri.split(':')[4];

  const sp = new Spotify({
    id: process.env.SPOTIFY_CLIENT_ID,
    secret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  const reqEndpoint = `https://api.spotify.com/v1/playlists/${id}`;
  sp.request(reqEndpoint)
    .then((data) => {
      const ids = data.tracks.items.map((v) => { return v.track.id; });
      attachNames(sp, ids, res);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400);
    });
};

export const dj = (req, res) => {
  const { tracks } = req.body;

  const sp = new Spotify({
    id: process.env.SPOTIFY_CLIENT_ID,
    secret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  const reqEndpoint = `https://api.spotify.com/v1/audio-features/?ids=${tracks.join(',')}`;
  sp.request(reqEndpoint)
    .then((data) => {
      // Clean the data
      const results = orderCalculation(tracks, data.audio_features);
      attachNames(sp, results, res);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400);
    });
};
