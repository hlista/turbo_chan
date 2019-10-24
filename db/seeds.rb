# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
PostTag.delete_all
BoardTag.delete_all
Tag.delete_all
Reply.delete_all
Post.delete_all
Bthread.delete_all
Board.delete_all

tv = Board.create(name: "Television", abrv: "tv")
v = Board.create(name: "Video Games", abrv: "v")
g = Board.create(name: "Technology", abrv: "g")
a = Board.create(name: "Anime & Manga", abrv: "a")
pp = Board.create(name: "Photography", abrv: "p")
lgbt = Board.create(name: "Lesbian, Gay, Bisexual, & Transgender", abrv: "lgbt")
adv = Board.create(name: "Advice", abrv: "adv")
fit = Board.create(name: "Fitness", abrv: "fit")
mu = Board.create(name: "Music", abrv: "mu")
news = Board.create(name: "Current News", abrv: "news")
sci = Board.create(name: "Science & Math", abrv: "sci")
x = Board.create(name: "Paranormal", abrv: "x")
Tags.create(name: "Fake News")
Tags.create(name: "Problematic")
Tags.create(name: "Report")
Tags.create(name: "Funny")
Tags.create(name: "Big True")
Tags.create(name: "Offensive")
Tags.create(name: "tl;dr")
Tags.create(name: "Degenerate")
Tags.create(name: "RRREEEEE")