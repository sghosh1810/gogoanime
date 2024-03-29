const axios = require('axios');
const cloudscraper = require('cloudscraper');
const cheerio = require('cheerio');
const url = require('./urls');

const ongoingSeries = async () => {
  const res = await axios.get(`${url.BASE_URL}`);
  const body = await res.data;
  const $ = cheerio.load(body);
  const promises = [];

  Array.from({length: 30}, (v, k) => {
    $('div.main_body div.series nav.menu_series ul li')
      .eq(k + 1)
      .each((index, element) => {
        const $element = $(element);
        const id = $element.find('a').attr('href');
        const title = $element.find('a').text();
        promises.push(
          animeContentHandler(id).then(extra => ({
            title: title ? title : null,
            img: extra[0] ? extra[0].img : null,
            synopsis: extra[0] ? extra[0].synopsis : null,
            genres: extra[0] ? extra[0].genres : null,
            released: extra[0] ? extra[0].released : null,
            status: extra[0] ? extra[0].status : null,
            otherName: extra[0] ? extra[0].otherName : null,
            totalEpisodes: extra[0] ? extra[0].totalEpisodes : null,
            episodes: extra[0] ? extra[0].episodes : null,
            slug: extra[0] ? getSlugFromId(extra[0].slug) : null
          }))
        );
      });
  });
  return await Promise.all(promises);
};

const search = async query => {
  const res = await axios.get(`${url.BASE_URL}/search.html?keyword=${query}`);
  const body = await res.data;
  const $ = cheerio.load(body);
  const promises = [];

  $('div.main_body div.last_episodes ul.items li').each((index, element) => {
    const $element = $(element);
    const id = $element.find('a').attr('href');
    const title = $element
      .find('a')
      .text()
      .trim();
    promises.push(
      animeContentHandler(id).then(extra => ({
        title: title ? title : null,
        img: extra[0] ? extra[0].img : null,
        synopsis: extra[0] ? extra[0].synopsis : null,
        genres: extra[0] ? extra[0].genres : null,
        released: extra[0] ? extra[0].released : null,
        status: extra[0] ? extra[0].status : null,
        otherName: extra[0] ? extra[0].otherName : null,
        totalEpisodes: extra[0] ? extra[0].totalEpisodes : null,
        episodes: extra[0] ? extra[0].episodes : null,
        slug: extra[0] ? getSlugFromId(extra[0].slug) : null
      }))
    );
  });
  return await Promise.all(promises);
};

const genres = async (genre, page) => {
  const res = await axios.get(`${url.BASE_URL}/genre/${genre}?page=${page}`);
  const body = await res.data;
  const $ = cheerio.load(body);
  const promises = [];

  $('div.main_body div.last_episodes ul.items li').each((index, element) => {
    const $element = $(element);
    const id = $element.find('a').attr('href');
    const title = $element
      .find('a')
      .text()
      .trim();
    promises.push(
      animeContentHandler(id).then(extra => ({
        title: title ? title : null,
        img: extra[0] ? extra[0].img : null,
        synopsis: extra[0] ? extra[0].synopsis : null,
        genres: extra[0] ? extra[0].genres : null,
        released: extra[0] ? extra[0].released : null,
        status: extra[0] ? extra[0].status : null,
        otherName: extra[0] ? extra[0].otherName : null,
        totalEpisodes: extra[0] ? extra[0].totalEpisodes : null,
        episodes: extra[0] ? extra[0].episodes : null,
        slug: extra[0] ? getSlugFromId(extra[0].slug) : null
      }))
    );
  });
  return await Promise.all(promises);
};

const alphabetList = async (letter, page) => {
  const res = await axios.get(
    `${url.BASE_URL}/anime-list-${letter}?page=${page}`
  );
  const body = await res.data;
  const $ = cheerio.load(body);
  const promises = [];

  $('div.main_body div.anime_list_body ul.listing li').each(
    (index, element) => {
      const $element = $(element);
      const id = $element.find('a').attr('href');
      const title = $element
        .find('a')
        .text()
        .trim();
      promises.push(
        animeContentHandler(id).then(extra => ({
          title: title ? title : null,
          img: extra[0] ? extra[0].img : null,
          synopsis: extra[0] ? extra[0].synopsis : null,
          genres: extra[0] ? extra[0].genres : null,
          released: extra[0] ? extra[0].released : null,
          status: extra[0] ? extra[0].status : null,
          otherName: extra[0] ? extra[0].otherName : null,
          totalEpisodes: extra[0] ? extra[0].totalEpisodes : null,
          episodes: extra[0] ? extra[0].episodes : null,
          slug: extra[0] ? getSlugFromId(extra[0].slug) : null
        }))
      );
    }
  );
  return await Promise.all(promises);
};

const newSeasons = async page => {
  const res = await axios.get(`${url.BASE_URL}/new-season.html?page=${page}`);
  const body = await res.data;
  const $ = cheerio.load(body);
  const promises = [];

  $('div.main_body div.last_episodes ul.items li').each((index, element) => {
    const $element = $(element);
    const id = $element.find('div.img a').attr('href');
    const title = $element
      .find('a')
      .text()
      .trim();
    promises.push(
      animeContentHandler(id).then(extra => ({
        title: title ? title : null,
        img: extra[0] ? extra[0].img : null,
        synopsis: extra[0] ? extra[0].synopsis : null,
        genres: extra[0] ? extra[0].genres : null,
        released: extra[0] ? extra[0].released : null,
        status: extra[0] ? extra[0].status : null,
        otherName: extra[0] ? extra[0].otherName : null,
        totalEpisodes: extra[0] ? extra[0].totalEpisodes : null,
        episodes: extra[0] ? extra[0].episodes : null,
        slug: extra[0] ? getSlugFromId(extra[0].slug) : null
      }))
    );
  });
  return await Promise.all(promises);
};

const movies = async page => {
  const res = await axios.get(`${url.BASE_URL}/anime-movies.html?page=${page}`);
  const body = await res.data;
  const $ = cheerio.load(body);
  const promises = [];

  $('div.main_body div.last_episodes ul.items li').each((index, element) => {
    const $element = $(element);
    const id = $element.find('div.img a').attr('href');
    const title = $element
      .find('a')
      .text()
      .trim();
    promises.push(
      animeContentHandler(id).then(extra => ({
        title: title ? title : null,
        img: extra[0] ? extra[0].img : null,
        synopsis: extra[0] ? extra[0].synopsis : null,
        genres: extra[0] ? extra[0].genres : null,
        released: extra[0] ? extra[0].released : null,
        status: extra[0] ? extra[0].status : null,
        otherName: extra[0] ? extra[0].otherName : null,
        totalEpisodes: extra[0] ? extra[0].totalEpisodes : null,
        episodes: extra[0] ? extra[0].episodes : null,
        slug: extra[0] ? getSlugFromId(extra[0].slug) : null
      }))
    );
  });
  return await Promise.all(promises);
};

const popular = async page => {
  const res = await axios.get(`${url.BASE_URL}/popular.html?page=${page}`);
  const body = await res.data;
  const $ = cheerio.load(body);
  const promises = [];

  for (const element of $('div.last_episodes ul.items li')) {
    const $element = $(element);
    const id = $element.find('div.img a').attr('href');
    const title = $element
      .find('a')
      .text()
      .trim();
    const extra = await animeContentHandler(id);
    promises.push({
      title: title ? title : null,
      img: extra[0] ? extra[0].img : null,
      synopsis: extra[0] ? extra[0].synopsis : null,
      genres: extra[0] ? extra[0].genres : null,
      released: extra[0] ? extra[0].released : null,
      status: extra[0] ? extra[0].status : null,
      otherName: extra[0] ? extra[0].otherName : null,
      totalEpisodes: extra[0] ? extra[0].totalEpisodes : null,
      episodes: extra[0] ? extra[0].episodes : null,
      slug: extra[0] ? getSlugFromId(extra[0].slug) : null,
      episodes: extra[0] ? extra[0].episodes : [],
      hasZeroEpisode: extra[0] ? extra[0].hasZeroEpisode : false
    });
  }
  return await Promise.all(promises);
};

const getAnimeContentById = async gogoId => {
  const id = `/category/${gogoId}`;
  const promises = [];
  promises.push(
    animeContentHandler(id).then(extra => ({
      title: 'Test title',
      img: extra[0] ? extra[0].img : null,
      synopsis: extra[0] ? extra[0].synopsis : null,
      genres: extra[0] ? extra[0].genres : null,
      released: extra[0] ? extra[0].released : null,
      status: extra[0] ? extra[0].status : null,
      otherName: extra[0] ? extra[0].otherName : null,
      totalEpisodes: extra[0] ? extra[0].totalEpisodes : null,
      slug: extra[0] ? getSlugFromId(extra[0].slug) : null,
      title: extra[0] ? extra[0].title : null,
      episodeSlug: extra[0] ? extra[0].episodeSlug : null,
      episodes: extra[0] ? extra[0].episodes : [],
      hasZeroEpisode: extra[0] ? extra[0].hasZeroEpisode : false
    }))
  );
  return await Promise.all(promises);
};

const recentlyAddedSeries = async () => {
  const res = await axios.get(`${url.BASE_URL}`);
  const body = await res.data;
  const $ = cheerio.load(body);
  const promises = [];

  $('div.last_episodes.loaddub ul.items li').each((index, element) => {
    const $element = $(element);
    const id = $element.find('p.name a').attr('href');
    const title = $element.find('p.name a').text();
    const episode = parseInt(
      $element
        .find('p.episode')
        .text()
        .match(/\d+/g),
      10
    );
    promises.push(
      animeEpisodeHandler(id).then(extra => ({
        title: title || null,
        img: extra[0].img || null,
        synopsis: extra[0].synopsis || null,
        genres: extra[0].genres || null,
        category: extra[0].category || null,
        episode: episode || null,
        totalEpisodes: extra[0].totalEpisodes || null,
        released: extra[0].released || null,
        status: extra[0].status || null,
        otherName: extra[0].otherName || null,
        servers: extra[0].servers || null,
        slug: getSlugFromId(extra[0].slug) || null,
        episodeSlug: extra[0] ? extra[0].episodeSlug : null,
        episodes: extra[0] ? extra[0].episodes : [],
        hasZeroEpisode: extra[0] ? extra[0].hasZeroEpisode : false
      }))
    );
  });
  return await Promise.all(promises);
};

const recentReleaseEpisodes = async (page, type = 1) => {
  const res = await axios.get(
    `${url.GOGO_AJAX_URL}ajax/page-recent-release.html?page=${page}&type=${type}`
  );
  const body = await res.data;
  const $ = cheerio.load(body);
  const promises = [];

  $('div.last_episodes.loaddub ul.items li').each((index, element) => {
    const $element = $(element);
    const id = $element.find('p.name a').attr('href');
    const title = $element.find('p.name a').text();
    const episode = parseInt(
      $element
        .find('p.episode')
        .text()
        .match(/\d+/g),
      10
    );
    promises.push(
      animeEpisodeHandler(id).then(extra => ({
        title: title || null,
        img: extra[0].img || null,
        synopsis: extra[0].synopsis || null,
        genres: extra[0].genres || null,
        category: extra[0].category || null,
        episode: episode || null,
        totalEpisodes: extra[0].totalEpisodes || null,
        released: extra[0].released || null,
        status: extra[0].status || null,
        otherName: extra[0].otherName || null,
        servers: extra[0].servers || null,
        slug: getSlugFromId(extra[0].slug) || null,
        episodeSlug: extra[0] ? extra[0].episodeSlug : null,
        episodes: extra[0] ? extra[0].episodes : [],
        hasZeroEpisode: extra[0] ? extra[0].hasZeroEpisode : false
      }))
    );
  });
  return await Promise.all(promises);
};

const animeEpisodeHandler = async id => {
  const res = await axios.get(`${url.BASE_URL}/${id}`, {
    headers: {
      'user-agent':
        'Mozilla/5.0 (X11; Linux aarch64; rv:78.0) Gecko/20100101 Firefox/78.0',
      'accept-language': 'en-US,en;q=0.5'
    }
  });
  const body = await res.data;
  const $ = cheerio.load(body);
  const promises = [];

  $('div#wrapper_bg').each((index, element) => {
    const $element = $(element);
    const animeId = $element
      .find('div.anime_video_body div.anime_video_body_cate div.anime-info a')
      .attr('href');
    const category = $element
      .find('div.anime_video_body div.anime_video_body_cate a')
      .attr('href')
      .split('/')[2]
      .trim();

    const servers = [];
    $element.find('div.anime_muti_link ul li').each((j, el) => {
      const $el = $(el);
      const name = $el
        .find('a')
        .text()
        .substring(
          0,
          $el
            .find('a')
            .text()
            .lastIndexOf('C')
        )
        .trim();
      let iframe = $el.find('a').attr('data-video');
      if (iframe.startsWith('//')) {
        iframe = $el
          .find('a')
          .attr('data-video')
          .slice(2);
      }
      servers.push({
        name: name,
        iframe: iframe
      });
    });
    promises.push(
      animeContentHandler(animeId).then(extra => ({
        img: extra[0] ? extra[0].img : null,
        synopsis: extra[0] ? extra[0].synopsis : null,
        genres: extra[0] ? extra[0].genres : null,
        category: category ? category : null,
        released: extra[0] ? extra[0].released : null,
        status: extra[0] ? extra[0].status : null,
        otherName: extra[0] ? extra[0].otherName : null,
        totalEpisodes: extra[0] ? extra[0].totalEpisodes : null,
        servers: servers ? servers : null,
        slug: extra[0] ? getSlugFromId(extra[0].slug) : null,
        episodeSlug: extra[0] ? extra[0].episodeSlug : null,
        episodes: extra[0] ? extra[0].episodes : [],
        hasZeroEpisode: extra[0] ? extra[0].hasZeroEpisode : false
      }))
    );
  });
  return await Promise.all(promises);
};

const animeContentHandler = async id => {
  const res = await axios.get(`${url.BASE_URL}${id}`);
  const body = await res.data;
  const $ = cheerio.load(body);
  const promises = [];
  let check_zero_episode = false;
  const {episodeSlug, episodeList} = await getEpisodeSlugBySlugId(id, $);
  try {
    const check_zero_episode_axios = await axios.get(
      `${url.BASE_URL}${id.split('/')[2]}`
    );
    const check_zero_episode_body = await check_zero_episode_axios.data;
    const check_zero_episode_cheerio = cheerio.load(check_zero_episode_body);
    if (check_zero_episode_cheerio('.entry-title').text() != '404') {
      check_zero_episode = true;
    }
  } catch {
    // do nothing
  }
  $('div#wrapper_bg').each((index, element) => {
    const $element = $(element);
    const img = $element.find('div.anime_info_body_bg img').attr('src');
    const synopsis = $element
      .find('div.anime_info_body_bg p.type')
      .eq(1)
      .text();
    const genres = [];

    $element
      .find('div.anime_info_body_bg p.type')
      .eq(2)
      .find('a')
      .each((j, el) => {
        const $el = $(el);
        const genre = $el.attr('href').split('/')[4];
        genres.push(genre);
      });
    const released = parseInt(
      $element
        .find('div.anime_info_body_bg p.type')
        .eq(3)
        .text()
        .match(/\d+/g),
      10
    );
    const status = $element
      .find('div.anime_info_body_bg p.type')
      .eq(4)
      .text()
      .replace('Status:', '')
      .trim();
    const otherName = $element
      .find('div.anime_info_body_bg p.type')
      .eq(5)
      .text()
      .replace('Other name:', '')
      .trim();
    const liTotal = $('div.anime_video_body ul#episode_page li').length;
    var totalEpisodes = parseInt(
      $('div.anime_video_body ul#episode_page li')
        .eq(liTotal - 1)
        .find('a')
        .text()
        .split('-')[1],
      10
    );
    if (!totalEpisodes) {
      totalEpisodes = parseInt(
        $('div.anime_video_body ul#episode_page li')
          .eq(liTotal - 1)
          .find('a')
          .text(),
        10
      );
    }
    const title = $element.find('div.anime_info_body_bg h1').text();
    promises.push({
      img: img,
      synopsis: synopsis,
      genres: genres,
      released: released,
      status: status,
      otherName: otherName,
      totalEpisodes: totalEpisodes,
      episodes: episodeList,
      slug: id,
      title: title,
      episodeSlug: episodeSlug,
      hasZeroEpisode: check_zero_episode
    });
  });
  return await Promise.all(promises);
};

const decodeVidstreamingIframeURL = async url => {
  const _url = `https://${url}`;
  let realUrl = '';
  if (_url.includes('streaming')) {
    realUrl = _url.replace(/streaming/g, 'check').trim();
    if (realUrl.includes('vidcheck.io')) {
      realUrl = _url.replace(/vidcheck.io/g, 'vidstreaming.io').trim();
    }
  }
  if (_url.includes('load')) {
    realUrl = _url.replace(/load/g, 'check').trim();
  }
  if (_url.includes('server')) {
    realUrl = _url.replace(/server/g, 'check').trim();
  }

  const data = await cloudscraper(realUrl);
  const match = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const _URLs = String(data)
    .match(match)
    .filter(url => url.includes('.mp4') || url.includes('m3u8'));

  const URLs = [];
  Array.from({length: _URLs.length}, (v, k) => {
    const option = k + 1;
    let url = _URLs[k];
    if (!url.includes('https://')) {
      url = `https://${url}`;
    }
    URLs.push({
      option: option || null,
      url: url || null
    });
  });

  return Promise.all(URLs);
};

const getSlugFromId = id => {
  if (id[0] == '/') {
    id = id.substring(1);
  }
  return id.replace('category/', '');
};
const getEpisodeSlugBySlugId = async (slug, $) => {
  var ep_start = 0;
  var ep_end = $('#episode_page a.active').attr('ep_end');
  var id = $('input#movie_id').val();
  var default_ep = $('input#default_ep').val();
  var alias = $('input#alias_anime').val();

  const res = await axios.get(
    `${url.GOGO_AJAX_URL}ajax/load-list-episode?ep_start=${ep_start}&ep_end=${ep_end}&id=${id}&default_ep=${default_ep}&alias=${alias}`
  );
  const body = await res.data;
  const $$ = cheerio.load(body);
  return {
    episodeSlug:
      $$('#episode_related li:first-child a')
        ?.attr('href')
        ?.trim()
        ?.split('-episode-')[0]
        ?.split('/')[1] ?? slug,
    episodeList: $$('#episode_related li')
      .map(function() {
        var episodeNumber = $$(this)
          .find('.name')
          .text()
          .split(' ')[1]
          .trim();
        var episodeId = $$(this)
          .find('a')
          ?.attr('href')
          ?.trim()
          ?.split('/')[1];
        return {[episodeNumber]: episodeId};
      })
      .get()
      .reduce(function(acc, obj) {
        return Object.assign(acc, obj);
      }, {})
  };
};

module.exports = {
  animeEpisodeHandler,
  recentReleaseEpisodes,
  recentlyAddedSeries,
  ongoingSeries,
  alphabetList,
  newSeasons,
  movies,
  popular,
  search,
  genres,
  decodeVidstreamingIframeURL,
  getAnimeContentById
};
