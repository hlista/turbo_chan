# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_10_21_200619) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "board_tags", force: :cascade do |t|
    t.bigint "tag_id", null: false
    t.bigint "board_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["board_id"], name: "index_board_tags_on_board_id"
    t.index ["tag_id"], name: "index_board_tags_on_tag_id"
  end

  create_table "boards", force: :cascade do |t|
    t.string "name", null: false
    t.string "abrv", null: false
    t.integer "post_count", default: 1, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["abrv"], name: "index_boards_on_abrv", unique: true
  end

  create_table "bthreads", force: :cascade do |t|
    t.bigint "board_id", null: false
    t.integer "post_num", null: false
    t.string "subject"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["board_id"], name: "index_bthreads_on_board_id"
  end

  create_table "post_tags", force: :cascade do |t|
    t.bigint "tag_id", null: false
    t.bigint "post_id", null: false
    t.integer "count"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["post_id"], name: "index_post_tags_on_post_id"
    t.index ["tag_id"], name: "index_post_tags_on_tag_id"
  end

  create_table "posts", force: :cascade do |t|
    t.bigint "board_id", null: false
    t.bigint "bthread_id"
    t.text "content"
    t.string "img_url"
    t.integer "post_num", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["board_id", "post_num"], name: "index_posts_on_board_id_and_post_num", unique: true
    t.index ["board_id"], name: "index_posts_on_board_id"
    t.index ["bthread_id"], name: "index_posts_on_bthread_id"
  end

  create_table "replies", force: :cascade do |t|
    t.bigint "parent_id", null: false
    t.bigint "child_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["child_id"], name: "index_replies_on_child_id"
    t.index ["parent_id"], name: "index_replies_on_parent_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "board_tags", "boards"
  add_foreign_key "board_tags", "tags"
  add_foreign_key "bthreads", "boards"
  add_foreign_key "post_tags", "posts"
  add_foreign_key "post_tags", "tags"
  add_foreign_key "posts", "boards"
  add_foreign_key "posts", "bthreads"
end
