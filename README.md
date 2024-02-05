# Animara

Animara is an anime streaming website.

Main functionality of Animara is to search and watch anime. Users can filter anime by genre, format, status, and other parameters.
Also, users can see similar and related anime to some specific title (Related anime are usually sequels or prequels, similar anime are determined by the same genres in two anime). There are also pages for anime movies and series (users can filter and sort them too).

The most difficult part of the website is definitely the player. I created my own comfortable player UI.

I have also planned to add comments, but maybe later.

This website uses SSG, I didn't implement SSR and its features (like authorization) because it requires to use paid variant of vercel hosting or some other hosting. (With the default variant of vercel hosting SSR is kinda slow on the first request)

To create this website I used Anify API. Throughout API I downloaded many anime (including genres, episodes and so on) in my own database to make it more customizable.

Initially, I thought to host the website somewhere, but Anify API is not the best to use in production (it sometimes works and sometimes doesn't). Through, I could download their repository and make my own server, but I don't want to host it.

I also didn't use <Image/> NextJs tag because thought I would host it (There is a limit of 1000 images per month for free hosting)

I don't think this project was hard, but it was interesting to make it (maybe because I could listen to anime openings while making it).

Some screenshots (there are other pages too, but they are similar, usually in the form of a grid of collections/anime):

![Home page](https://github.com/GeorgeShvab/Animara/assets/62070431/b5724234-06e0-4165-a3d7-6ff08f335f05)

![Also home page](https://github.com/GeorgeShvab/Animara/assets/62070431/da014758-38d6-45d9-a75f-dd574b8bef34)

![Home page too](https://github.com/GeorgeShvab/Animara/assets/62070431/9a5dbfe8-a938-401d-9929-69762752812e)

![Watch page](https://github.com/GeorgeShvab/Animara/assets/62070431/3718a055-0d03-4a7d-a6c2-8cd6f0591fc3)

![Wathc page, player](https://github.com/GeorgeShvab/Animara/assets/62070431/bf791cb4-7f2d-44b2-b717-6348e387e64f)

![Search page](https://github.com/GeorgeShvab/Animara/assets/62070431/307f96e4-5bbc-41c4-8e3d-e3767d9135dc)






