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

b = Board.create(name: "Television", abrv: "tv")
b.tags.create(name: "Fake News")
b.tags.create(name: "Problematic")
b.tags.create(name: "Report")
b.tags.create(name: "Funny")
b.tags.create(name: "Big True")
b.tags.create(name: "Offensive")
b.tags.create(name: "tl;dr")
b.tags.create(name: "Degenerate")