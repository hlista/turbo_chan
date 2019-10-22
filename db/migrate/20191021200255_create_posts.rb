class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.belongs_to :board, null: false, foreign_key: true
      t.belongs_to :bthread, foreign_key: true
      t.text :content
      t.string :img_url
      t.integer :post_num, null: false
      t.timestamps
    end
    add_index :posts, [:board_id, :post_num], :unique => true
  end
end
