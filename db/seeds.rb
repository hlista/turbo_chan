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
adv = Board.create(name: "Advice", abrv: "adv")
fit = Board.create(name: "Fitness", abrv: "fit")
mu = Board.create(name: "Music", abrv: "mu")
news = Board.create(name: "Current News", abrv: "news")
sci = Board.create(name: "Science & Math", abrv: "sci")
rel = Board.create(name: "Religion", abrv: "rel")
x = Board.create(name: "Paranormal", abrv: "x")
Tag.create(name: "Report")
Tag.create(name: "Problematic")
Tag.create(name: "Fake News")
Tag.create(name: "Big True")
Tag.create(name: "Funny")
Tag.create(name: "tl;dr")
Tag.create(name: "Degenerate")
Tag.create(name: "RRREEEEE")
Tag.create(name: "cope")

Board.all.map { |b| Tag.all.map {|t| BoardTag.create({board: b, tag: t})}}