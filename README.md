# Animara

Animara is an anime streaming website.

The main functionality of Animara is to search and watch anime. Users can filter anime by genre, format, status, and other parameters.
Also, users can see similar and related anime to some specific title (Related anime are usually sequels or prequels, similar anime are determined by the same genres in two anime). There are also pages for anime movies and series (users can filter and sort them too).

The most difficult part of the website is definitely the player. I created my own comfortable player UI.

I have also planned to add comments, but maybe later.

This website uses SSG, I didn't implement SSR and its features (like authorization) because it requires to use paid variant of vercel hosting or some other hosting. (With the default variant of vercel hosting SSR is kinda slow on the first request)

To create this website I used Anify API. Throughout API I downloaded many anime (including genres, episodes and so on) in my own database to make it more customizable.

Initially, I thought to host the website somewhere, but Anify API is not the best to use in production (it sometimes works and sometimes doesn't). Through, I could download their repository and make my own server, but I don't want to host it.

I don't think this project was hard, but it was interesting to make it (maybe because I could listen to anime openings while making it).
